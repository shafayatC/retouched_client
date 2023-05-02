import React, { useContext, useEffect } from 'react';
import { OrderContextManager, apiUrlContextManager, userContextManager } from '../../App';

const CheckAiProccess = ({ imageFile, callBackIsAiProccess }) => {

    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);
    const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager);

    const orderImageDetail = () => {

        console.log(imageFile)
        console.log("token:  "+ getToken )
        console.log("img id : " + imageFile.output_urls[0].order_image_detail_id)
        if (typeof imageFile !== 'undefined') {

            fetch(`${getApiBasicUrl}/order-image-service?order_image_detail_id=${imageFile.output_urls[0].order_image_detail_id}&subscription_plan_type_id=${getSubscriptionPlanId}&service_type_id=${getServiceTypeId}`, {
                headers: {
                    'Authorization': 'bearer ' + getToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.status_code == 200) {
                        callBackIsAiProccess(data.results.order_image_detail_list[0].is_ai_processed)
                    }
                })
        }

    }

    useEffect(() => {
        orderImageDetail()
    }, [imageFile])
    return (
        <>

        </>
    );
};

export default CheckAiProccess;