import React, { useContext, useEffect, useState } from 'react'
import free from '../images/free.png'
import enterprise from '../images/enterprise.png'
import { OrderContextManager, apiUrlContextManager, userContextManager } from '../../App';
import { Link } from 'react-router-dom';
import SignInForm from '../SignInForm/SignInForm';
import localforage from 'localforage';

const Pricing = () => {

    const [isModOpen, setIsModOpen] = useState(false);

    const openModal = () => {
        setIsModOpen(true);
    };

    const closeModal = () => {
        setIsModOpen(false);
    };


    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager);
    const [getSubscriptionPlan, setSubscriptionPlan] = useState([])
    const [showSignInForm, setShowSignInForm] = useState(false);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);


    const getSubscriptionFunc = () => {

        console.log(getToken)
        fetch(`http://103.197.204.22:8007/api/2023-02/user-order-subscription-plan-types?order_master_image_id=${getOrderMasterId}`, {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSubscriptionPlan(data)
            })
    }

    const SignInHandleOpen = () => {
        setShowSignInForm(true)
    };

    const SignInHandleClose = () => {
        setShowSignInForm(false);
    }

    const checkoutFunc = (sbId) => {

        console.log("getToken : " + getToken)
        console.log("getModelBaseUrl : " + getModelBaseUrl)
        console.log("getOrderMasterId " + getOrderMasterId + " sbId : " + sbId)
        // http://103.197.204.22:8008/v.03.13.23/checkout?order_master_image_id=3AD8432C-AE95-4A80-8FDD-0AEA825F8972&subscription_plan_type_id=5830BA07-B329-4724-8AF2-482B7056F52E
        fetch(`${getModelBaseUrl}checkout?order_master_image_id=${getOrderMasterId}&subscription_plan_type_id=${sbId}`, {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // data.status_code == 200 && window.open(data.results.checkout_url, "_blank");
                data.status_code == 200 && window.open(data.results.checkout_url, "_self");
            })
    }


    const choosPlan = async (sbId) => {
        try {
            const data = await localforage.getItem('userInfo');
            console.log(data)
            // This code runs once the value has been loaded
            // from the offline store.
            if (data !== null && Object.keys(data).length > 0) {
                checkoutFunc(sbId)
            } else {
                SignInHandleOpen()
            }
        } catch (err) {
            console.log(err);
            SignInHandleOpen()
        }
    }


    useEffect(() => {
        getSubscriptionFunc()
    }, [getOrderMasterId]);

    return (
        <>
            <div className='bg_1 h-[100vh]'>
                <div className='container mx-auto  pb-24 rounded-lg'>
                    <div className='pt-4 pb-16 '>
                        <h2 className='text-center text-4xl font-bold text-white'>Choose the Right Plan: Total Bill and Benefits</h2>
                    </div>
                    <div className='flex w-full justify-center '>
                        {typeof getSubscriptionPlan.results !== 'undefined' && getSubscriptionPlan.results.subscription_plan_type.map((data, index) => (
                            <div className='h-[320px] w-[260px] mt-5 border bg-white border-blue-400   pb-2'>

                                <h2 className='text-center pt-3 text-purple-400  text-xl font-semibold'>{data.title}</h2>

                                <h2 className='text-center  gap-3 pt-2 pb-4 text-3xl font-bold'>{data.netCharge}</h2>
                                <button onClick={() => choosPlan(data.id)} className='px-6 w-56 rounded-lg  py-2 border border-purple-500 hover:bg-purple-400 mt-2 bg-purple-500 text-white mb-6 font-semibold '>{data.description}</button>

                                {data.subscription_plan_type_description.map((data_2, index_2) => (
                                    <p className='text-start text-sm mt-1 px-5'><i class="fa-solid fa-check mr-3 text-purple-700"></i><span dangerouslySetInnerHTML={{ __html: data_2.description }} /></p>
                                ))}

                            </div>
                        ))}


                    </div>
                    {/* --------------------Login Modal Start------------------- */}
                    <>
                        {isModOpen && (
                            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-50 bg-gray-500">
                                <div className="flex  bg-white w-[450px] mx-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <div
                                        className="fixed inset-0 "
                                        aria-hidden="true"
                                        onClick={closeModal}
                                    >
                                        <div className="absolute inset-0 bg-gray-600 opacity-20"></div>

                                    </div>

                                    <div
                                        className="inline-block w-[480px] h-[180px] align-bottom border border-teal-700 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all "
                                        role="dialog"
                                        aria-modal="true"
                                        aria-labelledby="modal-headline"
                                    >
                                        <div className="bg-white  flex justify-center pt-5 pb-4 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">

                                                <div className="mt-3 mb-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                    <h3
                                                        className="text-lg leading-6 font-bold text-gray-900"

                                                    >
                                                        <i class="fa-solid text-yellow-500  fa-circle-exclamation"></i> Confirmation: <span className='text-sm font-medium'>Clear Redirecting to Payment Processing </span>
                                                    </h3>

                                                </div>
                                            </div>
                                        </div>
                                        <div className=" py-4 flex gap-4 justify-center ">


                                            <button
                                                onClick={closeModal}
                                                className="text-white w-20 bg-green-600  px-1 py-1 rounded-md">
                                                Okay
                                            </button>

                                            <button

                                                className="text-white w-20 bg-red-500  px-1 py-1 rounded-md"
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                    {/* -------------Login Modal End------------------- */}
                    <button onClick={openModal} className='px-4 mt-6 py-2 bg-white text-black rounded-lg'>
                        hello
                    </button>

                </div>
                <Link to='/'
                    className=" flex justify-center items-center w-10 h-10 border absolute top-10 right-10 bg-white border-green-600 rounded-full"

                >
                    <i className="fa-solid fa-xmark"></i>
                </Link>
            </div>
            {showSignInForm && <SignInForm onClose={SignInHandleClose} />}


        </>
    )
}

export default Pricing