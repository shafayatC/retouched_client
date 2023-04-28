
import React, { useContext, useEffect, useState } from "react";
import './style.css'
import { apiUrlContextManager, userContextManager } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

const LoginWithSocial = () => {

    const [getTwitter, setTwiiter] = useState(); 
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

    const location = useLocation();
    const { prevPath } = location.state ? location.state : '/';
    const navigation = useNavigate()


    const twitterSignIn = () => {

        fetch("http://103.197.204.22:8007/twitter-login").then(res => res.json())
            .then(data => {
                console.log(data); 
                setTwiiter(data)

                // if (data.status_code == 200) {
                // }
            }
            )
    }

    
    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">Or</p>
            </div>
            {/* <p className="mb-5 font-semibold">OR SIGN IN WITH</p> */}
            <div className="flex flex-col justify-center w-full  gap-5">
                <div className=" flex justify-center">

                    <button onClick={twitterSignIn} className="py-1 text-xs px-2 gap-5 center-line w-60  border border-gray-500  font-medium rounded-lg  hover:bg-green-400 hover:shadow-lg "><i class="fa-brands  text-xl fa-twitter"></i>
                        Sign in with Twitter
                    </button>
                </div>

                <div className=" flex justify-center">
                    <button className="py-1 text-xs px-2 gap-5 center-line w-60  border border-gray-500  font-medium rounded-lg  hover:bg-green-400 hover:shadow-lg "><i className="fa-brands text-xl  fa-facebook"></i>
                        Sign in with Facebook
                    </button>
                </div>
                <div className="flex justify-center">

                    <button className="py-1 text-xs px-2 gap-5 w-60 center-line border border-gray-500  font-medium rounded-lg  hover:bg-green-400 hover:shadow-lg "><i className="fa-brands  text-xl fa-google"></i>
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