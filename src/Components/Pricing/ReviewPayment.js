import React, { useContext, useEffect, useState } from 'react';
import { OrderContextManager, apiUrlContextManager, userContextManager } from '../../App';
import localforage from 'localforage';
import './pricing.css'
import { Link } from 'react-router-dom';

const ReviewPayment = () => {


    const [isModOpen, setIsModOpen] = useState(false);
    const [getSubscribId, setSubscribId] = useState("");
    const [getTotalPrice, setTotalPrice] = useState("");

    const openModal = (id) => {
        setIsModOpen(true);
        setSubscribId(id)
    };

    const closeModal = () => {
        setIsModOpen(false);
    };
    const okayButton = () => {
        checkoutFunc(getSubscribId)
        setSubscriptionPlanId(getSubscribId)
        closeModal()
    }



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

    const TotalAmount = (pr) => {
        setTotalPrice(pr)
    }

    const choosPlan = async (sbId, pr) => {
        try {
            const data = await localforage.getItem('userInfo');
            console.log(data)
            // This code runs once the value has been loaded
            // from the offline store.
            if (data !== null && Object.keys(data).length > 0) {
                setTotalPrice(pr)
                openModal(sbId)
            } else {
                SignInHandleOpen()
            }
        } catch (err) {
            console.log(err);
            SignInHandleOpen()
        }
        handleHideClick()
    }
    const [isVisible, setIsVisible] = useState(true);

    function handleHideClick() {
        setIsVisible(false);
    }

    function handleShowClick() {
        setIsVisible(true);
    }


    useEffect(() => {
        showSignInForm == false && getSubscriptionFunc();
    }, [getOrderMasterId, showSignInForm]);





    return (
        <>
            <div className='bg_1 h-[100vh]'>
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
                            className="absolute flex gap-4 left-[50%] rounded-lg top-[25%] w-[780px] h-[320px] bottom-0 border border-teal-700 bg-white  text-left overflow-hidden shadow-xl transform transition-all "
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                            style={{ transform: 'translateX(-50%)' }}
                        >
                            <div className="priceCircle ">
                                <h2 className='flex justify-center font-bold text-3xl'>Total</h2>
                                <h5 className='flex justify-center font-bold text-5xl'>{TotalAmount}</h5>
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
                                    <Link to="/">
                                        <button

                                            className="text-white w-20 bg-red-500  px-3 py-1 rounded-md"

                                        >
                                            Cancel
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewPayment;