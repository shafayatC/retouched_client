import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrlContextManager, userContextManager } from "../../App";
import localforage from "localforage";
import InitialDataLoad from "../InitialDataLoad/InitialDataLoad";


function SignInForm({ onClose, switchBool=true }) {

    const [isDiv1Visible, setIsDiv1Visible] = useState(true);
    const [isDiv2Visible, setIsDiv2Visible] = useState(false);
    const [isDiv3Visible, setIsDiv3Visible] = useState(false);

    const [getPassword, setPassword] = useState("");
    const [getMail, setMail] = useState("");
    const [getSignUpMail, setSignUpMail] = useState("");
    const [getResetMail, setResetMail] = useState("");
    const [getRemember, setRemember] = useState(false)
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

    const location = useLocation();
    const navigation = useNavigate()
   // const { prevPath } = location.state ? location.state : '/';

    const showToastMessage = (msg) => {
        toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    const showToastMessageWarning = (msg) => {
        toast.warning(msg, {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    const showToastMessageError = (msg) => {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    const singInFunc = async () => {

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (getMail.match(validRegex)) {

            const signInData = {
                email: getMail,
                password: getPassword,
            };

            try {
                fetch(getApiBasicUrl + "/system-sign-in",
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            'Authorization': 'bearer ' + getToken
                        },
                        body: JSON.stringify(signInData),
                    }
                ).then(res => res.json())
                    .then(data => {
                        if (data.status_code == 200) {
                            //console.log("data")
                            // console.log(data)
                            setUserInfo(data);
                            setToken(data.results.token)
                            showToastMessage(data.message)
                            localforage.setItem("userInfo", data);
                            const rememberInfo = {
                                'mail': getMail,
                                'pass': getPassword
                            }

                            if (getRemember) {
                                localforage.setItem('remember', rememberInfo)
                            } else {
                                localforage.removeItem('remember')
                            }
                            onClose()
                            //prevPath ? navigation(prevPath) : navigation('/')
                        } else {
                            showToastMessageWarning(data.message)
                        }
                    })

            } catch (error) {
                showToastMessageError(error);
            }
        } else {
            showToastMessageError("email format is not valide");
        }
    };

    const rememberFunc = () => {
        localforage.getItem("remember").then(data => {
            if (data !== null && Object.keys(data).length > 0) {
                setMail(data.mail)
                setPassword(data.pass)
                setRemember(true)
            }
        })
    }

    const singUpFunc = async () => {


        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (getSignUpMail.match(validRegex)) {
            const regMail = { "email": getSignUpMail }
            try {

                const rawResponse = await fetch(getApiBasicUrl + '/system-sign-up', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'bearer ' + getToken
                    },
                    body: JSON.stringify(regMail)
                });

                const res = await rawResponse.json();
                if
                    (res.status_code == 200) {
                    showToastMessage(res.message)
                    onClose()
                    //   navigate("/thank-you-note")
                }

                else {
                    showToastMessageWarning(res.message)
                }

            } catch (error) {
                console.log(error)
            }
        } else {
            showToastMessageError("email format is not valide")
        }
    }


    const resetPassFunc = async () => {


        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (getResetMail.match(validRegex)) {
            const regMail = { "email": getResetMail }
            try {

                const rawResponse = await fetch(getApiBasicUrl + '/reset-password-form', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'bearer ' + getToken,
                    },
                    body: JSON.stringify(regMail)
                });

                const res = await rawResponse.json();
                res.status_code == 200 ? showToastMessage(res.message) : showToastMessageWarning(res.message)

            } catch (error) {
                console.log(error)
            }
        } else {
            showToastMessageError("email format is not valide")
        }
    }

    const showDiv1 = () => {
        setIsDiv1Visible(true);
        setIsDiv2Visible(false);
        setIsDiv3Visible(false);
    };

    const showDiv2 = () => {
        setIsDiv1Visible(false);
        setIsDiv2Visible(true);
        setIsDiv3Visible(false);
    };
    const showDiv3 = () => {
        setIsDiv1Visible(false);
        setIsDiv2Visible(false);
        setIsDiv3Visible(true);
    };

    useEffect(() => {
        rememberFunc()
        switchBool ? showDiv1() : showDiv2();
    }, [switchBool])

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-50 bg-gray-900">

            <div className='bg-white w-[500px] rounded-lg relative'>

                <div className="flex absolute top-5 right-5 justify-end">
                    <button className="text-gray-600 rounded-full bg-white border-green-500 border h-7 w-7" onClick={onClose}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                {isDiv1Visible &&
                    <div className="px-6 mt-10 text-gray-800">
                        <div className="flex xl:justify-center  justify-center items-center flex-wrap h-full g-6">
                            <div className=" w-[300px]">
                                <div className="flex flex-row items-center justify-center lg:justify-start">
                                    <p className="text-xl mb-0 mr-4">Log in to Retouched.ai</p>
                                </div>

                                <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

                                <div className="mb-6">
                                    <input
                                        onChange={(e) => setMail(e.target.value)}
                                        value={getMail}
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput1"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={getPassword}
                                        type="password"
                                        className="form-control text-sm block w-full px-4 py-2  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <div className="form-group form-check">
                                        <input
                                            onChange={() => setRemember(!getRemember)}
                                            checked={getRemember}
                                            type="checkbox"
                                            className="form-check-input  appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-400 checked:border-green-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            id="exampleCheck2"
                                        />
                                        <label
                                            className="form-check-label text-xs inline-block text-gray-800"
                                            htmlFor="exampleCheck2"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <button onClick={showDiv3} className="text-red-600 text-xs">
                                        Lost password?
                                    </button>
                                </div>

                                <div className="text-center">
                                    <button
                                        onClick={singInFunc}
                                        className="w-full mb-5 py-2 bg-theme-shade  text-black border border-green-500  hover:bg-green-500 hover:text-white text-sm rounded shadow-md "
                                    >
                                        LOGIN WITH EMAIL
                                    </button>
                                    {/* <LoginWithSocial /> */}


                                    <p className="text-xs font-semibold mt-2 pt-1  mb-6">
                                        New to Retouched.ai?
                                        <button onClick={showDiv2}
                                            className="text-green-600 text-xs">
                                            Create an account

                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }


                {isDiv2Visible &&
                    <div className="px-6 mt-10 text-gray-800">
                        <div className="flex xl:justify-center  justify-center items-center flex-wrap h-full g-6">
                            <div className=" w-[300px]">
                                <div className="flex flex-row items-center justify-center lg:justify-start">
                                    <p className="text-xl mb-0 mr-4"> SignUp with Retouched.ai</p>
                                </div>

                                <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

                                <div className="mb-6">
                                    <input
                                        onChange={(e) => setSignUpMail(e.target.value)}
                                        value={getSignUpMail}
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput1"
                                        placeholder="Email address"
                                    />
                                </div>



                                <div className="text-center">
                                    <button
                                        onClick={singUpFunc}
                                        className="w-full mb-5 py-2 bg-theme-shade hover:bg-green-500 hover:text-white text-black border border-green-500 font-medium text-sm rounded shadow-md "
                                    >
                                        Sign Up WITH EMAIL
                                    </button>
                                    {/* <LoginWithSocial /> */}


                                    <p className="text-xs font-semibold mt-2 pt-1  mb-6">
                                        Already have an account?
                                        <button onClick={showDiv1}
                                            className="text-green-600 text-xs">
                                            Login here

                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {isDiv3Visible &&
                    <div className="px-6 mt-10 text-gray-800">
                        <div className="flex xl:justify-center  justify-center items-center flex-wrap h-full g-6">
                            <div className=" w-[300px]">
                                <div className="flex flex-row items-center justify-center lg:justify-start">
                                    <p className="text-xl mb-0 mr-4">Reset Password</p>
                                </div>

                                <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

                                <div className="mb-6">
                                    <input
                                        onChange={(e) => setResetMail(e.target.value)}
                                        type="email"
                                        className="form-control block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Email address"
                                    />
                                </div>

                                <div className="text-center">
                                    <button onClick={resetPassFunc} className="inline-block px-7 w-full mb-5 py-2 text-black border border-green-500 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-lime-400 hover:shadow-lg focus:bg-lime-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        RESET PASSWORD
                                    </button>


                                    <div className="text-right">
                                        <button onClick={showDiv1}
                                            className="text-green-700 text-sm ">
                                            Back to Login

                                        </button>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                }
            </div>

            <InitialDataLoad />

        </div>
    );
}

export default SignInForm;