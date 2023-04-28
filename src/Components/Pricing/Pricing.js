import React, { useContext, useEffect, useState } from 'react'
import free from '../images/free.png'
import enterprise from '../images/enterprise.png'
import { OrderContextManager, userContextManager } from '../../App';
import { Link } from 'react-router-dom';
import SignInForm from '../SignInForm/SignInForm';

const Pricing = () => {

    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager);
    const [getSubscriptionPlan, setSubscriptionPlan] = useState([])
    const [showSignInForm, setShowSignInForm] = useState(false);


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
        // setIsOpen(true);
        setShowSignInForm(true)
    };

    const SignInHandleClose = ()=>{
        setShowSignInForm(false);
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
                            <button className='px-6 w-56 rounded-lg  py-2 border border-purple-500 hover:bg-purple-400 mt-2 bg-purple-500 text-white mb-6 font-semibold '>{data.description}</button>

                            {data.subscription_plan_type_description.map((data_2, index_2) => (
                                <p className='text-start text-sm mt-1 px-5'><i class="fa-solid fa-check mr-3 text-purple-700"></i><span dangerouslySetInnerHTML={{ __html: data_2.description }} /></p>
                            ))}

                        </div>
                    ))}


                </div>

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