import React from 'react';
import { Link } from 'react-router-dom';

function SignInForm({ onClose }) {
    return (
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-900">
        //     <div className="bg-white rounded-lg shadow-lg p-8">
        //         <div className="flex justify-end">
        //             <button className="text-gray-600 hover:text-gray-700" onClick={onClose}>
        //                 X
        //             </button>
        //         </div>
        //         <h2 className="text-lg font-medium mb-4">Sign In</h2>
        //         <form>
        //             <div className="mb-4">
        //                 <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
        //                     Email
        //                 </label>
        //                 <input className="border-gray-400 border rounded-lg py-2 px-3 w-full" id="email" type="email" required />
        //             </div>
        //             <div className="mb-4">
        //                 <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
        //                     Password
        //                 </label>
        //                 <input className="border-gray-400 border rounded-lg py-2 px-3 w-full" id="password" type="password" required />
        //             </div>
        //             <button className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors" type="submit">
        //                 Sign In
        //             </button>
        //         </form>
        //     </div>
        // </div>

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-900">
            <div className='bg-white w-[500px] rounded-lg relative'>

                <div className="flex absolute top-10 right-10 justify-end">
                    <button className="text-gray-600 rounded-full bg-white border-green-500 border h-7 w-7" onClick={onClose}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="px-6 mt-10 text-gray-800">
                    <div className="flex xl:justify-center  justify-center items-center flex-wrap h-full g-6">
                        <div className=" w-[300px]">
                            <div className="flex flex-row items-center justify-center lg:justify-start">
                                <p className="text-xl mb-0 mr-4">Log in to Retouched.ai</p>
                            </div>

                            <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

                            <div className="mb-6">
                                <input
                                    // onChange={(e) => setMail(e.target.value)}
                                    // value={getMail}
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput1"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    // onChange={(e) => setPassword(e.target.value)}
                                    // value={getPassword}
                                    type="password"
                                    className="form-control text-sm block w-full px-4 py-2  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Password"
                                />
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <div className="form-group form-check">
                                    <input
                                        // onChange={() => setRemember(!getRemember)}
                                        // checked={getRemember}
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
                                <Link to="/resetpasswordform" className="text-red-600 text-xs">
                                    Lost password?
                                </Link>
                            </div>

                            <div className="text-center">
                                <button
                                    // onClick={singInFunc}
                                    className="w-full mb-5 py-2 bg-theme-shade text-black border border-green-500 font-medium text-sm rounded shadow-md "
                                >
                                    LOGIN WITH EMAIL
                                </button>
                                {/* <LoginWithSocial /> */}


                                <p className="text-xs font-semibold mt-2 pt-1  mb-6">
                                    New to Retouched.ai?
                                    <Link to="/sign-up">
                                        <a href="#" className="text-green-600 text-xs">
                                            Create an account
                                        </a>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SignInForm;