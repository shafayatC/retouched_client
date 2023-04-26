import p1 from "../images/1.jpg"
import p2 from "../images/2.jpg"
import p3 from "../images/3.jpg"
import CompareImage from "../CompareImage/CompareImage";
import { FileContextManager, OrderContextManager, apiUrlContextManager, menuContextManager, userContextManager } from "../../App";
import { useContext, useState } from "react";

import Loading_2 from "../Loading/Loading_2";
import ServiceMenu from "../ServiceMenu/ServiceMenu";

const ImageUpload = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [getSuggest, setSuggest] = useState([]);
    const [getImgIndex, setImgIndex] = useState(0);
    const [showImage, setShowImage] = useState(false);
    const [getFirstImgView, setFirstImgView] = useState(true); 

    const [getSwitchLoop, setSwitchLoop] = useState(false);
    //const [getProccessImgIndex, setProccessImgIndex] = useState(0)
    const [getCallbackAiBool, setCallbackAiBool] = useState(false);

    const [
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

    const handleClose = () => {
        setShowImage(false);
        switchLoopFunc()
    };

    const callBackIsAiProccess = (bl) => {
        setCallbackAiBool(bl)
    }

    const switchLoopFunc = () => {

        setSwitchLoop(!getSwitchLoop)
    }

    const hanleCloseFirstImg =()=>{
        setFirstImgView(false)
    }

    const deletImage = (dlImage) => {
        //console.log(dlImage);

        // const ImageIndex = getAfterBeforeImg.map((fl) => { return parseInt(fl.output_urls[0].order_image_detail_sequence_no) }).indexOf(fileInfo[getImgIndex].sequence_no);

        // console.log(getAfterBeforeImg[ImageIndex].output_urls[0].order_image_detail_id)

        const delateInfo = {
            "id": getAfterBeforeImg[dlImage].output_urls[0].order_image_detail_id,
            "is_deleted": true
        }

        fetch(getApiBasicUrl + "/update-order-image-detail", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + getToken
            },
            body: JSON.stringify(delateInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // setFileInfo(fileInfo.filter((f, index) => index !== dlImage));
                setAfterBeforeImg(getAfterBeforeImg.filter((f, index) => index !== dlImage))
                // setProccessImgIndex(getProccessImgIndex - 1)
                handleClose();
            })

        //setFileInfo(fileInfo.filter((f) => f.imageUrl !== dlImage));
    };

    const uploadFile = (e) => {
        const newFile = e.target.files;
        setActionStatus("");
        newOrderCreate(newFile);

    };

    const dragNdropFiles = (newFile) => {

        setActionStatus("");

        newOrderCreate(newFile);

    }


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
                setFirstImgView(true); 

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

    function dragOverHandler(e) {
        console.log("File(s) in drop zone");

        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
    }

    function dropHandler(ev) {
        console.log("File(s) dropped");

        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            let files = [];

            [...ev.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    files.push(file)
                    console.log(`… file[${i}].name = ${file.name}`);
                }
            });

            dragNdropFiles(files)
        }

    }

    return (
        <div id="upload" className="container mx-auto my-20 min-h-screen">

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

            <div
                onClick={() =>
                    document.querySelector("#singleImagePick").click()
                }
                onDrop={dropHandler}
                onDragOver={dragOverHandler}
                onDragEnter={e => console.log("")}
                onDragLeave={e => console.log("")}
                id='drop-zone'
                className="bg-[#A0A2B7] rounded-lg flex flex-col justify-center items-center w-[600px] h-96 mx-auto"
                >
              <p><i className="fa-solid text-7xl fa-download"></i></p>
                <p className="text-center text-lg mt-4 ">Choose a <span className="font-bold">File</span> or drag it here...</p>
            </div>

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
                {/* {getTotalImage !== 0 && getTotalImage == getProccessImgIndex &&
                    <div>
                        <div className="flex gap-16 justify-center">
                            <div className="h-[500px] w-[500px]">
                                <CompareImage
                                    topImage={getAfterBeforeImg[0].output_urls[0].compressed_raw_image_public_url}
                                    bottomImage={getAfterBeforeImg[0].output_urls[0].default_compressed_output_public_url} />
                            </div>
                        </div>
                        <div className="">
                            <button onClick={() => viewImg((currentPage - 1) * itemsPerPage)} className=" px-4 py-1 mt-4 bg-[#696C96] rounded-lg  text-white">Adjust Image</button>
                        </div>
                    </div>

                } */}

                {getTotalImage !== 0 && getTotalImage == getProccessImgIndex && getFirstImgView &&

                    <div>
                        <div
                            style={{
                                position: "absolute",
                                top: -20,
                                left: -10,
                                right: 0,
                                bottom: 0,
                                zIndex: 99,
                                display: "flex",
                                justifyContent: "center",
                                // backgroundColor: "#ffff"
                            }}
                        >
                            <div className="h-[550px] w-[800px] bg-white mt-5 relative rounded-md z-50">
                                <p className=" text-white px-2 py-1 rounded-lg absolute top-1 bg-teal-500 left-16  font-semibold">Beautify imagery with Ad-on Professional Services</p>
                                <p className="bg-teal-500 text-white absolute top-1 right-0 mb-10 font-semibold py-1 px-4  rounded-l-3xl">Choose Your Services</p>
                                <div className="  pt-20 pl-16 absolute ">
                                    <div className="w-[400px] h-[400px] border border-theme-shade  relative">
                                        {getCallbackAiBool ?
                                            <CompareImage
                                                topImage={ getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url}
                                                bottomImage={getAfterBeforeImg[getImgIndex].output_urls[0].default_compressed_output_public_url}
                                            /> :
                                            <img className="h-full" src={ getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url} />
                                        }
                                        <p className="absolute top-0 right-0  bg-teal-500 text-white px-3 text-xs py-1  rounded-l-3xl z-10">{actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].order_image_detail_sequence_no : getAfterBeforeImg[getImgIndex].output_urls[0].order_image_detail_sequence_no}</p>
                                    </div>
                                </div>

                                {getAfterBeforeImg.length > 0 && <ServiceMenu callBackIsAiProccess={callBackIsAiProccess} imageFile={actionStatus == "filter" ? getSuggest[getImgIndex] : getAfterBeforeImg[getImgIndex]} />}
                            </div>

                            <div className="absolute top-[50%] w-full" style={{ transform: 'translateY(-50%)' }}>
                                <button disabled={getImgIndex == 0} onClick={() => { setImgIndex(getImgIndex - 1) }} className="float-left ml-36 cursor-pointer text-white disabled:text-black ">
                                    <i className="fa-solid fa-circle-chevron-left text-4xl "></i>
                                    {/* <i className="fa-solid fa-circle-chevron-left"></i> */}
                                </button>
                                <button disabled={getImgIndex == getAfterBeforeImg.length - 1} onClick={() => { setImgIndex(getImgIndex + 1) }} className="float-right mr-36 cursor-pointer text-white  disabled:text-black ">
                                    <i className="fa-solid fa-circle-chevron-right text-4xl "></i>
                                    {/* <i className="fa-solid fa-circle-chevron-right"></i> */}
                                </button>
                            </div>
                            <div className="absolute right-4 top-4 flex gap-2">
                                <button
                                    onClick={() => deletImage(getImgIndex)}
                                    className="bg-white w-10 h-10 rounded-full border border-green-500"
                                >
                                    <i className="fa-regular fa-trash-can"></i>
                                </button>
                                <button
                                    onClick={hanleCloseFirstImg}
                                    className="bg-white w-10 h-10 border border-green-500 rounded-full"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                }
                {showImage &&
                    <div>
                        <div
                            style={{
                                position: "absolute",
                                top: -20,
                                left: -10,
                                right: 0,
                                bottom: 0,
                                zIndex: 99,
                                display: "flex",
                                justifyContent: "center",
                                // backgroundColor: "#ffff"
                            }}
                        >
                            <div className="h-[550px] w-[800px] bg-white mt-5 relative rounded-md z-50">

                                <p className=" text-white px-2 py-1 rounded-lg absolute top-1 bg-teal-500 left-16  font-semibold">Beautify imagery with Ad-on Professional Services</p>
                                <p className="bg-teal-500 text-white absolute top-1 right-0 mb-10 font-semibold py-1 px-4  rounded-l-3xl">Choose Your Services</p>
                                <div className="  pt-20 pl-16 absolute ">
                                    <div className="w-[400px] h-[400px] border border-theme-shade  relative">
                                        {getCallbackAiBool ?
                                            <CompareImage
                                                topImage={actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].compressed_raw_image_public_url : getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url}
                                                bottomImage={actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].default_compressed_output_public_url : getAfterBeforeImg[getImgIndex].output_urls[0].default_compressed_output_public_url}
                                            /> :
                                            <img className="h-full" src={actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].compressed_raw_image_public_url : getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url} />
                                        }
                                        <p className="absolute top-0 right-0  bg-teal-500 text-white px-3 text-xs py-1  rounded-l-3xl z-10">{actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].order_image_detail_sequence_no : getAfterBeforeImg[getImgIndex].output_urls[0].order_image_detail_sequence_no}</p>
                                    </div>
                                </div>

                                {getAfterBeforeImg.length > 0 && <ServiceMenu callBackIsAiProccess={callBackIsAiProccess} imageFile={actionStatus == "filter" ? getSuggest[getImgIndex] : getAfterBeforeImg[getImgIndex]} />}
                            </div>

                            <div className="absolute top-[50%] w-full" style={{ transform: 'translateY(-50%)' }}>
                                <button disabled={getImgIndex == 0} onClick={() => { setImgIndex(getImgIndex - 1) }} className="float-left ml-36 cursor-pointer text-white disabled:text-black ">
                                    <i className="fa-solid fa-circle-chevron-left text-4xl "></i>
                                    {/* <i className="fa-solid fa-circle-chevron-left"></i> */}
                                </button>
                                <button disabled={getImgIndex == getAfterBeforeImg.length - 1} onClick={() => { setImgIndex(getImgIndex + 1) }} className="float-right mr-36 cursor-pointer text-white  disabled:text-black ">
                                    <i className="fa-solid fa-circle-chevron-right text-4xl "></i>
                                    {/* <i className="fa-solid fa-circle-chevron-right"></i> */}
                                </button>
                            </div>
                            <div className="absolute right-4 top-4 flex gap-2">
                                <button
                                    onClick={() => deletImage(getImgIndex)}
                                    className="bg-white w-10 h-10 rounded-full border border-green-500"
                                >
                                    <i className="fa-regular fa-trash-can"></i>
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="bg-white w-10 h-10 border border-green-500 rounded-full"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                }



            </div>
        </div >
    )
}

export default ImageUpload;