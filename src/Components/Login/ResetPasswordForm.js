import React, { useContext, useState } from "react";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrlContextManager, userContextManager } from "../../App";

const ResetPasswordForm = () => {

    const [getMail, setMail] = useState("");
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager); 

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
 

    const resetPassFunc = async () => {
  
  
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
      if (getMail.match(validRegex)) {
        const regMail = { "email": getMail }
        try {
  
          const rawResponse = await fetch(getApiBasicUrl+'/reset-password-form', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'bearer '+ getToken, 
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

  return (
    <div className="container mx-auto">
      <div>
        <section>
          <div className="px-6 mt-20 text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
              <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                  <div className="flex flex-row items-center justify-center lg:justify-start">
                    <p className="text-3xl mb-0 mr-4">Reset password</p>
                  </div>

                  <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

                  <div className="mb-6">
                    <input
                      onChange={(e) => setMail(e.target.value)}
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      placeholder="Email address"
                    />
                  </div>

                  <div className="text-center">
                    <button onClick={resetPassFunc} className="inline-block px-7 w-full mb-5 py-3 bg-green-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-900  hover:shadow-lg focus:bg-green-900  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                      RESET PASSWORD
                    </button>
                    <ToastContainer />

                    <div className="text-right">
                      <Link to="/log-in">
                        <a href="#!" className="text-green-700">
                          Back to Login
                        </a>
                      </Link>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
