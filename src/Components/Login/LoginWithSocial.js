import React, { useContext } from "react";
import './style.css'
import { FacebookAuthProvider, GoogleAuthProvider, getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { apiUrlContextManager, userContextManager } from "../../App";
import { auth } from "../../Fire";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginWithSocial = () => {

    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

    const location = useLocation();
    const { prevPath } = location.state ? location.state : '/';
    const navigation = useNavigate()

    const signInWithGoogle = async () => {

        const googleProvider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            const { isNewUser } = getAdditionalUserInfo(res);

            console.log(isNewUser + " " + typeof isNewUser); // new user true and older user false 

            const userInfo = {
                third_party_unique_key: user.uid,
                email: user.email,
            }

            fetch(getApiBasicUrl + "/third-party-sign-in",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'Authorization': 'bearer ' + getToken
                    },
                    body: JSON.stringify(userInfo),
                }
            ).then(res => res.json())
                .then(data => {
                    if (data.status_code == 200) {
                        //console.log("data")
                        setUserInfo(data);
                        setToken(data.results.token)
                        showToastMessage(data.message)
                        localStorage.setItem("userInfo", data);

                        prevPath ? navigation(prevPath) : navigation('/')
                    } else {
                        showToastMessageWarning(data.message)
                    }
                })

            console.log(userInfo)
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithFacebook = async () => {
        const facebookProvider = new FacebookAuthProvider();
        try {
            const res = await signInWithPopup(auth, facebookProvider);
            const user = res.user;
            const { isNewUser } = getAdditionalUserInfo(res);

            console.log(isNewUser + " " + typeof isNewUser); // new user true and older user false 


            const userInfo = {
                third_party_unique_key: user.uid,
                email: user.email,
            }

            fetch(getApiBasicUrl + "/third-party-sign-in",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'Authorization': 'bearer ' + getToken
                    },
                    body: JSON.stringify(userInfo),
                }
            ).then(res => res.json())
                .then(data => {
                    if (data.status_code == 200) {
                        //console.log("data")
                        setUserInfo(data);
                        setToken(data.results.token)
                        showToastMessage(data.message)
                        localStorage.setItem("userInfo", data);

                        prevPath ? navigation(prevPath) : navigation('/')
                    } else {
                        showToastMessageWarning(data.message)
                    }
                })

        } catch (err) {
            console.error(err);
        }
    }

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
    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">Or</p>
            </div>
            {/* <p className="mb-5 font-semibold">OR SIGN IN WITH</p> */}
            <div className="flex flex-col justify-center w-full  gap-5">
                <div className=" flex justify-center">
                    <button onClick={signInWithFacebook} className="py-1 text-xs px-2 gap-5 center-line w-60  border border-gray-500  font-medium rounded-lg  hover:bg-green-400 hover:shadow-lg "><i className="fa-brands text-xl  fa-facebook"></i>
                        Sign in with Facebook
                    </button>
                </div>
                <div className="flex justify-center">
                    <button onClick={signInWithGoogle} className="py-1 text-xs px-2 gap-5 w-60 center-line border border-gray-500  font-medium rounded-lg  hover:bg-green-400 hover:shadow-lg "><i className="fa-brands  text-xl fa-google"></i>
                        Sign in with Google
                    </button>
                </div>
                <div className="flex justify-center">
                    <button className="py-1 text-xs px-2 gap-5 w-60 center-line border border-gray-500  font-medium rounded-lg  hover:bg-green-400 hover:shadow-lg "><i className="fa-brands text-xl  fa-apple"></i>
                        Sign in with Apple
                    </button>
                </div>
            </div>
        </div>
    )

}

export default LoginWithSocial;