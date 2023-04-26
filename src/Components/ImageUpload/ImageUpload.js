import p1 from "../images/1.jpg"
import p2 from "../images/2.jpg"
import p3 from "../images/3.jpg"
import CompareImage from "../CompareImage/CompareImage";
import { FileContextManager, OrderContextManager, apiUrlContextManager, menuContextManager, userContextManager } from "../../App";
import { useContext, useState } from "react";
import './style.css';
import Loading_2 from "../Loading/Loading_2";

const ImageUpload = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [getSuggest, setSuggest] = useState([]);
    const [getImgIndex, setImgIndex] = useState();
    const [showImage, setShowImage] = useState(false);

    const [
        getMainFile,
        setMainFile,
        fileInfo,
        setFileInfo,
        getAfterBeforeImg,
        setAfterBeforeImg,
        getLockMenuBool,
        setLockMenuBool,
        getImageData,
        setImageData,
        actionStatus,
        setActionStatus,
        getProccessImgIndex,
        setProccessImgIndex,
        getTotalImage,
        setTotalImage
    ] = useContext(FileContextManager);

    const [getMenuId, setMenuId, getMenu, setMenu, getDashboardMenu, setDashboardMenu] = useContext(menuContextManager)
    const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager);
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager);

    const itemsPerPage = 8;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // const currentImages = actionStatus == "filter" ? getSuggest.slice(indexOfFirstItem, indexOfLastItem) : fileInfo.length > getProccessImgIndex ? fileInfo.slice(indexOfFirstItem, indexOfLastItem) : getAfterBeforeImg.slice(indexOfFirstItem, indexOfLastItem) ;
    const currentImages = actionStatus == "filter" ? getSuggest.slice(indexOfFirstItem, indexOfLastItem) : getAfterBeforeImg.slice(indexOfFirstItem, indexOfLastItem);

    const viewImg = (img) => {
        console.log(img);
        setImgIndex(img);
        setShowImage(true);
    };

    const uploadFile = (e) => {
        const newFile = e.target.files;

        setMainFile(newFile);
        setActionStatus("");

        newOrderCreate(newFile);

    };

    const newOrderCreate = (newFile) => {

        const myOrdre = {
            menu_id: getMenuId,
            service_type_id: getServiceTypeId,
            subscription_plan_type_id: getSubscriptionPlanId
        };
        console.log(getToken)
        fetch(getApiBasicUrl + "/order-master-info", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + getToken
            },
            body: JSON.stringify(myOrdre),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                let order_id = data.results.order_master_info.order_id;
                setOrderMasterId(order_id)
                setTotalImage(0)
                setProccessImgIndex(0)

                let i = 0;
                for (const file of newFile) {
                    console.log(file)
                    console.log("file name : " + file.name)

                    if (file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/tiff") {
                        i++;
                        setTotalImage(i)
                        const filePath = file.webkitRelativePath.split("/");
                        filePath.pop();
                        console.log(filePath.join("/"))
                        const pathOfFile = filePath.join("/");
                        console.log("pathOfFile : " + pathOfFile)
                        let data = new FormData();
                        data.append("order_master_id", order_id);
                        data.append("service_type_id", getServiceTypeId);
                        data.append("file", file);
                        data.append("file_relative_path", pathOfFile);
                        data.append("subscription_plan_type_id", getSubscriptionPlanId);
                        dataTransfer(data);
                    }
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }


    const dataTransfer = async (formData) => {
        console.log("formData");
        try {
            // const response = await fetch(`http://103.197.204.22:8008/v.03.13.23/upload-for-ai-processing`,
            const response = await fetch(`${getModelBaseUrl}upload-for-ai-processing`,
                {
                    method: "POST",
                    body: formData
                }
            );
            const data = await response.json();
            console.log(data);
            console.log(typeof (3 + 1))

            setProccessImgIndex(getProccessImgIndex => getProccessImgIndex + 1);
            console.log(getProccessImgIndex)
            if (data.status_code == 200) {
                const found = getAfterBeforeImg.some(el => el.output_urls[0].compressed_raw_image_public_url === data.results.output_urls[0].compressed_raw_image_public_url);
                found == false && setAfterBeforeImg((getAfterBeforeImg) => [
                    ...getAfterBeforeImg,
                    data.results,
                ]);

            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div id="upload" className="container mx-auto my-20">

            <input
                onChange={uploadFile}
                type="file"
                id="filepicker"
                name="fileList"
                directory=""
                webkitdirectory=""
                accept="image/jpeg, image/png, image/tiff,.tif"
                className="hidden"
            />

            <input
                onChange={uploadFile}
                type="file"
                id="singleImagePick"
                name="imageFile"
                className="hidden"
                accept="image/jpeg, image/png, image/tiff,.tif"
                multiple
            />

            <div className="relative">

                {getTotalImage > getProccessImgIndex && <Loading_2 />}

                {getTotalImage !== getProccessImgIndex && getAfterBeforeImg.length > 0 && actionStatus == "" &&
                    <div >

                        <div className={`grid grid-cols-4 gap-4 pt-2 ml-2  pr-3`}>

                            {currentImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={
                                        getAfterBeforeImg.length === 1 ? "flex relative justify-center " : "relative"
                                    }

                                >
                                    <div
                                        className={`img-container w-full h-full  bg-no-repeat  cursor-pointer img-bag ${getAfterBeforeImg.length === 1 ? "h-[400px] justify-center" : "img-bag"}`}
                                        onClick={() => viewImg((currentPage - 1) * itemsPerPage + index)}
                                    //   style={{
                                    //     backgroundImage: `url(${image.output_urls[0].compressed_raw_image_public_url})`,
                                    //   }}
                                    >
                                        <img className="w-full h-full" src={image.output_urls[0].compressed_raw_image_public_url} />
                                    </div>


                                    {/* <div className="flex gap-1  ">
                                        {image.output_urls[0].is_ai_processed ?
                                            <p><i className="fa-solid text-green-400 absolute top-2 right-2 fa-circle-check"></i></p>
                                            :
                                            <p className="loader_2 absolute top-[40%] left-[45%]"></p>
                                        }
                                    </div> */}
                                </div>
                            ))}

                        </div>


                    </div>
                }

                {console.log(getAfterBeforeImg)}
                {getTotalImage !== 0 && getTotalImage == getProccessImgIndex &&
                    <div>

                        <div className="flex gap-16 justify-center">
                            <div className="flex items-center">
                                <img className="h-[300px] w-[300px] skew-y-3  opacity-50" src={p3} />
                            </div>
                            <div className="h-[500px] w-[500px]">

                                <CompareImage
                                    topImage={getAfterBeforeImg[0].output_urls[0].compressed_raw_image_public_url}
                                    bottomImage={getAfterBeforeImg[0].output_urls[0].default_compressed_output_public_url} />
                                {/* <CompareImage
                                topImage={"https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg"}
                                bottomImage={"https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg"} /> */}
                            </div>

                            <div className="flex items-center">
                                <img class="css_transform h-[300px] w-[300px] -skew-y-3" src={p2} />
                            </div>


                        </div>
                        <div className="">
                            <button className=" px-4 py-1 mt-4 bg-[#696C96] rounded-lg  text-white">Adjust Image</button>
                        </div>
                    </div>

                }

            </div>
        </div >
    )
}

export default ImageUpload;