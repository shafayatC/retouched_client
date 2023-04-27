import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrlContextManager, menuContextManager, OrderContextManager, userContextManager } from "../../App";
import logo2 from '../images/logo2.png'
// import Page2 from "../Page2/Page2";

const CostBreakDown = () => {

    // const HandleClose = () => {
    //     costCallBack(false);
    // };
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager);
    const [getMenuId, setMenuId, getMenu, setMenu, getDashboardMenu, setDashboardMenu] = useContext(menuContextManager)
    // const [getCostDetails, setCostDetails] = useState({})
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

    const constDetailFunc = () => {
        fetch(`${getApiBasicUrl}/cost-breakdown?order_master_image_id=${getOrderMasterId}`, {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCostDetails(data)
            })
    }
    useEffect(() => {
        getOrderMasterId.length > 0 && constDetailFunc()
    }, [getOrderMasterId]);


    return (

        <>
            <div className="container mx-auto ">
                <div className="bg-white absolute top-0 left-0 -ml-2 w-full h-full">
                    <div className="bg-white flex flex-col items-center mt-2">
                        <img className="h-6 w-32 " src={logo2} alt="" />
                        <p className="text-xl font-bold">CHARGE BREAKDOWN</p>
                    </div>
                    <div className="flex justify-center mx-auto mt-2 gap-36 border-black border py-1 w-[700px] ">
                        <div className="flex justify-between gap-5">
                            <div className="text-start"><p className="font-semibold text-sm">Date:</p>
                                <p className="font-semibold text-sm">Order No: </p>
                                <p className="font-semibold text-sm">Order Status: </p>
                                <p className="font-semibold text-sm">Total Image(s): </p>
                            </div>
                            {Object.keys(getCostDetails).length > 0 &&
                                typeof getCostDetails.results.order_master_charge_breakdown !== 'undefined' &&
                                getCostDetails.results.order_master_charge_breakdown.length > 0 &&
                                <div className="text-start">
                                    <p className=" text-sm">{getCostDetails.results.order_master_charge_breakdown[0].order_time}</p>
                                    <p className=" text-sm">{getCostDetails.results.order_master_charge_breakdown[0].order_no}</p>
                                    <p className=" text-sm">{getCostDetails.results.order_master_charge_breakdown[0].order_status}</p>
                                    <p className=" text-sm">{getCostDetails.results.order_master_charge_breakdown[0].order_no_of_images}</p>

                                </div>
                            }

                        </div>
                        <div className="flex justify-between gap-5">
                            <div className="text-start">
                                <p className="font-semibold text-sm">Service Type: </p>
                                <p className="font-semibold text-sm">Subscription: </p>
                                <p className="font-semibold text-sm">Payment Status: </p>
                            </div>
                            {Object.keys(getCostDetails).length > 0 &&
                                <div className="text-start">

                                    <p className=" text-sm">{getCostDetails.results.order_master_charge_breakdown[0].order_service_type}</p>
                                    <p className=" text-sm">{getCostDetails.results.order_master_charge_breakdown[0].order_subscription_plan_type}</p>
                                    <p className=" text-sm">{getCostDetails.results.order_master_charge_breakdown[0].order_payment_status}</p>
                                </div>
                            }
                        </div>
                    </div>

                    <div className=" w-[700px] mx-auto mt-2 ">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-0 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left text-sm font-light">
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                                <tr className="bg-gray-400">
                                                    <th scope="col" className="px-6 py-0">SL</th>
                                                    <th scope="col" className="px-6 py-0">Service</th>
                                                    <th scope="col" className="px-6 py-0">No.of Services</th>
                                                    <th scope="col" className="px-6 py-0">Charge/Service</th>
                                                    <th scope="col" className="px-6 py-0">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(getCostDetails).length > 0 && typeof getCostDetails.results.order_detail_charge_breakdown !== 'undefined' &&
                                                    getCostDetails.results.order_detail_charge_breakdown.map((data, index) => (


                                                        < tr className="border-b dark:border-neutral-500" >
                                                            <td className="whitespace-nowrap px-6 py-0 font-medium">{index + 1}</td>
                                                            <td className="whitespace-nowrap px-6 py-0">{data.name}</td>
                                                            <td className="whitespace-nowrap px-6 py-0">{data.no_of_services_in_images}</td>
                                                            <td className="whitespace-nowrap px-6 py-0">{data.charge_per_image}</td>
                                                            <td className="whitespace-nowrap px-6 py-0">{data.total}</td>
                                                        </tr>
                                                    ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end w-[700px]  mt-3 mx-auto gap-5">
                        <div className="text-start">
                            <p className="font-semibold text-sm">Net Charge: </p> <hr></hr>
                            <p className="font-semibold text-sm">Discount: </p><hr></hr>
                            <p className="font-semibold text-sm">Total Charge: </p><hr></hr>
                        </div>
                        {Object.keys(getCostDetails).length > 0 && typeof getCostDetails.results.order_master_charge_breakdown !== 'undefined' &&
                            <div className="mr-8">

                                <p className="font-semibold text-sm">{getCostDetails.results.order_master_charge_breakdown[0].total_charge}</p>
                                <p className="font-semibold text-sm">{getCostDetails.results.order_master_charge_breakdown[0].discount}</p>
                                <p className="font-semibold text-sm">{getCostDetails.results.order_master_charge_breakdown[0].net_charge}</p>
                            </div>
                        }
                    </div>

                    <div className="w-[700px] bg-white fixed bottom-0 left-[50%]" style={{ transform: 'translateX(-50%)' }} >
                        <hr className="mb-3"></hr>
                        <p className="text-xs text-center  mb-5"> <span className="font-bold">Address:</span> 2nd Floor, Navana DH Tower, Plot:06, Panthapath, Dhaka, Bangladesh   <span className="font-bold">Phone:</span> 02-55013583   <span className="font-bold">Email:</span> info@retouched.ai</p>
                    </div>
                    <Link to="/">
                        <button
                            className=" w-10 h-10 border border-green-600 rounded-full"
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 20,
                                backgroundColor: "white",
                                padding: "8px 15px",
                            }}
                        // onClick={HandleClose}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </Link>

                </div>

            </div >
        </>
    )
}
export default CostBreakDown;
