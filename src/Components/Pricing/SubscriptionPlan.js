import React, { useContext, useEffect, useState } from 'react'
import free from '../images/free.png'
import enterprise from '../images/enterprise.png'
import { OrderContextManager, apiUrlContextManager, userContextManager } from '../../App';
import { Link } from 'react-router-dom';
import SignInForm from '../SignInForm/SignInForm';
import localforage from 'localforage';
import './pricing.css'

const Pricing = () => {

    const [isModOpen, setIsModOpen] = useState(false);
    const [getSubscribId, setSubscribId] = useState("");
    const [getTotalPrice, setTotalPrice] = useState("");
    const [getSubscribtionValue, setSubscribtionValue] = useState("")

    const subscriptionPlanFunc = (value) => {
        console.log(value);
        setSubscribtionValue(value);
    }


    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager);
    const [getSubscriptionPlan, setSubscriptionPlan] = useState([])
    const [showSignInForm, setShowSignInForm] = useState(false);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

    const openModal = (id) => {
        console.log(id)
        // setIsModOpen(true);
        // setSubscribId(id)
        subscriptionPlanFunc(id)
        setSubscriptionPlanId(getSubscribId)

    };

    const closeModal = () => {
        setIsModOpen(false);
    };
    const okayButton = () => {
        // checkoutFunc(getSubscribId)
        setSubscriptionPlanId(getSubscribId)
        // closeModal()
    }

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
                setSubscriptionPlan(data);
                data.map(d => {
                    if (d.is_default == true) {
                        openModal(d.id)
                    }
                })
            })
    }

    const SignInHandleOpen = () => {
        setShowSignInForm(true)
    };

    const SignInHandleClose = () => {
        setShowSignInForm(false);
    }

    const updateOrderIdFunc = () => {
        const orderId = {
            "id": getOrderMasterId
        }

        fetch(getApiBasicUrl + "/update-order-master-info-by-id", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + getToken
            },
            body: JSON.stringify(orderId),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
    }

    const checkoutFunc = (sbId) => {

        console.log("getToken : " + getToken)
        console.log("getModelBaseUrl : " + getModelBaseUrl)
        console.log("getOrderMasterId " + getOrderMasterId + " sbId : " + sbId)
        updateOrderIdFunc();
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

    // sbId = subscribe id , pr = price 
    const choosPlan = async (sbId, pr) => {
        try {
            const data = await localforage.getItem('userInfo');
            console.log(data)
            // This code runs once the value has been loaded
            // from the offline store.
            if (data !== null && Object.keys(data).length > 0) {
                // setTotalPrice(pr)
                openModal(sbId)
            } else {
                SignInHandleOpen()
            }
        } catch (err) {
            console.log(err);
            SignInHandleOpen()
        }
    }


    useEffect(() => {
        showSignInForm == false && getSubscriptionFunc();
    }, [getOrderMasterId, showSignInForm]);

    return (
        <>

            <div className='flex flex-col w-full justify-center relative'>
                {typeof getSubscriptionPlan.results !== 'undefined' && getSubscriptionPlan.results.subscription_plan_type.map((data, index) => (
                    <div className='h-[125px] w-[260px]  border bg-white border-blue-400'>

                        <h2 className='text-center pt-1 text-purple-400  text-sm font-semibold'>{data.title}</h2>



                        <button disabled={getSubscribtionValue.length > 0 ? getSubscribtionValue == data.id : data.is_default} onClick={() => { choosPlan(data.id, data.netCharge) }} className='px-3 w-36 rounded-lg  py-1 border border-purple-500 disabled:bg-black hover:bg-purple-400 mt-1 bg-purple-500 text-white text-xs mb-1 font-semibold '>{data.description}</button>


                        {data.subscription_plan_type_description.map((data_2, index_2) => (
                            <p className='text-start text-xs ml-5 mt-1 px-5'><i class="fa-solid fa-check mr-3 text-purple-700"></i><span dangerouslySetInnerHTML={{ __html: data_2.description }} /></p>
                        ))}

                    </div>
                ))}
                {/* 
                        <>
                            {isModOpen && (
                                <div className="absolute w-full h-full inset-0 z-50 flex flex-col items-center justify-center ">
                                    <div className="flex  bg-white w-[450px] mx-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                        <div
                                            className="fixed inset-0 "
                                            aria-hidden="true"
                                            onClick={closeModal}
                                        >
                                            <div className="absolute "></div>

                                        </div>

                                        <div
                                            className="absolute flex gap-4 left-[50%] w-[780px] h-[320px] bottom-0 border border-teal-700 bg-white  text-left overflow-hidden shadow-xl transform transition-all "
                                            role="dialog"
                                            aria-modal="true"
                                            aria-labelledby="modal-headline"
                                            style={{ transform: 'translateX(-50%)' }}
                                        >
                                            <div className="priceCircle ">
                                                <h2 className='flex justify-center font-bold text-3xl'>Total</h2>
                                                <h5 className='flex justify-center font-bold text-5xl'>{getTotalPrice}</h5>
                                            </div>
                                            <div className='flex flex-col justify-center items-center'>
                                                <div className="bg-white  flex gap-6 justify-center items-center pt-5 pb-4 sm:p-6 sm:pb-4">
                                                    <div className="sm:flex sm:items-start">

                                                        <div className="mt-3 mb-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                            <h3
                                                                className="text-lg pt-6 pb-8 leading-6 font-bold text-gray-900"

                                                            >
                                                                <i class="fa-solid text-yellow-500  fa-circle-exclamation"></i> Confirmation: <span className='text-sm font-medium'>Redirecting to Payment Processing </span>
                                                            </h3>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" py-4 flex gap-8 justify-center ">
                                                    <button
                                                        onClick={okayButton}
                                                        className="text-white w-20 bg-green-600  px-3 py-1 rounded-md">
                                                        Okay
                                                    </button>

                                                    <button

                                                        className="text-white w-20 bg-red-500  px-3 py-1 rounded-md"
                                                        onClick={() => closeModal()}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </> */}
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
                                    className="inline-block w-[460px] h-[200px] align-bottom border border-teal-700 bg-white  text-left overflow-hidden shadow-xl transform transition-all "
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="modal-headline"
                                >
                                    <div className="bg-white  flex justify-center pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">

                                            <div className="mt-3 mb-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3
                                                    className="text-lg pt-6 pb-3 leading-6 font-bold text-gray-900"

                                                >
                                                    <i class="fa-solid text-yellow-500  fa-circle-exclamation"></i> Confirmation: <span className='text-sm font-medium'>Redirecting to Payment Processing </span>
                                                </h3>


                                            </div>
                                        </div>
                                    </div>
                                    <div className=" py-4 pb-3 flex gap-4 justify-center ">


                                        <button
                                            onClick={okayButton}
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





            </div>



            {showSignInForm && <SignInForm onClose={SignInHandleClose} />}


        </>
    )
}

export default Pricing


