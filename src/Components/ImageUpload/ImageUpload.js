import p1 from "../images/1.jpg"
import p2 from "../images/2.jpg"
import p3 from "../images/3.jpg"
import CompareImage from "../CompareImage/CompareImage";
import { FileContextManager, OrderContextManager, apiUrlContextManager, menuContextManager, userContextManager } from "../../App";
import { useContext, useEffect, useState } from "react";
import Loading_2 from "../Loading/Loading_2";
import ServiceMenu from "../ServiceMenu/ServiceMenu";
import { Popover } from 'antd';
import { Radio } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import TotalBill from "../TotalBill/TotalBill";
import localforage from "localforage";
import './style.css'
import CostBreakDown from "../CostBreakDown/CostBreakDown";
import SignInForm from "../SignInForm/SignInForm";
import { matchSorter } from "match-sorter";
import CheckAiProccess from "./CheckAiProccess";

const ImageUpload = ({ dragFiles }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [getSuggest, setSuggest] = useState([]);
    const [getImgIndex, setImgIndex] = useState(0);
    const [showImage, setShowImage] = useState(false);
    const [getFirstImgView, setFirstImgView] = useState(true);
    const [getShowSrvMenu, setShowSrvMenu] = useState(false);
    const [getSwitchLoop, setSwitchLoop] = useState(false);
    //const [getProccessImgIndex, setProccessImgIndex] = useState(0)
    const [getCallbackAiBool, setCallbackAiBool] = useState(false);
    const [getFilterText, setFilterText] = useState("");
    const [getSuggestBool, setSuggestBool] = useState(false);

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

    const navigate = useNavigate();

    const viewImg = (img) => {
        console.log(img);
        setImgIndex(img);
        setShowImage(true);
    };

    const downloadContent = (
        <div>
            <Radio.Group defaultValue={1}>
                <Radio value={1}>JPG</Radio>
                <Radio value={2}>PNG</Radio>
                <Radio value={3}>PSD</Radio>


            </Radio.Group>
            <div className="flex justify-end text-xs">
                <button className="bg-green-600 text-white rounded-lg py-1 px-2 mt-2 font-semibold">Download</button>
            </div>
        </div>
    )
    // Modal start-------------------------------------------
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    const showSrvMenuFunc = () => {
        console.log(getShowSrvMenu)
        setShowSrvMenu(!getShowSrvMenu)
    }

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

    const hanleCloseFirstImg = () => {
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

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };


    const dragNdropFiles = (newFile) => {
        setActionStatus("");
        newOrderCreate(newFile);
    }

    const scrollToElement = (elemnt) => {
        document.getElementById(elemnt).scrollIntoView({ behavior: "smooth" });
    }
    const newOrderCreate = (newFile) => {

        const myOrdre = {
            menu_id: getMenuId,
            service_type_id: getServiceTypeId,
            subscription_plan_type_id: getSubscriptionPlanId
        };
        console.log("getToken : " + getToken)
        console.log("getSubscriptionPlanId : " + getSubscriptionPlanId)
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
                scrollToElement('upload')
                setAfterBeforeImg([])
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
                scrollToElement('upload')
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


    // const reviewPaymentFunc = async () => {
    //     // openModal()

    //     try {

    //       const data = await localforage.getItem('userInfo');
    //       // This code runs once the value has been loaded
    //       // from the offline store.
    //       if (data !== null && Object.keys(data).length > 0) {

    //         console.log(data)
    //         setUserInfo(data);
    //         setToken(data.results.token);

    //         const orderId = {
    //           "id": getOrderMasterId
    //         }

    //         console.log(getOrderMasterId)
    //         console.log(data.results.token)
    //         fetch(getApiBasicUrl + "/update-order-master-info-by-id", {
    //           method: "POST", // or 'PUT'
    //           headers: {
    //             "Content-Type": "application/json",
    //             'Authorization': 'bearer ' + data.results.token
    //           },
    //           body: JSON.stringify(orderId),
    //         })
    //           .then((res) => res.json())
    //           .then((data) => {
    //             console.log(data);
    //             if (data.status_code == 200) {
    //               navigate('/pricing')
    //             } else {
    //                 openModal();
    //             }
    //         }
    //           )

    //         } else {
    //             openModal()
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         openModal()
    //     }

    // }



    const filterFunc = (e) => {
        e.preventDefault();

        Promise.all(getAfterBeforeImg).then((data) => {
            // const imagePath = data.output_urls[0].compressed_raw_image_public_url.split('CompressedRaw'); 
            console.log(data);
            const suggestList = matchSorter(data, e.target.value, {
                keys: [(data) => data.output_urls[0].compressed_raw_image_public_url],
            });
            setSuggest(suggestList);
        });

        setFilterText(e.target.value);
        if (e.target.value.length > 0) {
            setActionStatus("filter");
            setSuggestBool(true);
            setCurrentPage(1);
        } else {
            setActionStatus("");
            setSuggestBool(false);
        }
    };
    const clearFilterText = () => {
        setFilterText("");
        setSuggestBool(false);
        setActionStatus("");
    };
    const filterBysuggest = (txt) => {
        setFilterText(txt);
        setSuggestBool(false);
        if (txt.length > -1) {
            setActionStatus("filter");
        } else {
            setActionStatus("");
        }
    };


    useEffect(() => {

        dragFiles.length > 0 && dragNdropFiles(dragFiles);

    }, [dragFiles])
    // }, [getAfterBeforeImg, dragFiles])

    return (
        <div id="upload" className="bg_1 border-b-2 border-white">
            <div className={getAfterBeforeImg.length > 0 ? 'min-h-screen container mx-auto relative pb-20' : 'container mx-auto relative'}>
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
                {/* {getTotalImage < 1 &&

                <div className="flex items-center h-screen w-full">

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
                </div>
            } */}


                <div className={`relative ${getAfterBeforeImg.length > 0 && ' pt-4'}`}>

                    {getTotalImage > getProccessImgIndex && <Loading_2 />}
                    {getAfterBeforeImg.length > 0 &&
                        <div className="flex items-center justify-center mt-1">
                            <i className="fa-solid fa-filter text-white mr-1"></i>
                            <p className="text-white mr-4">Filter</p>
                            <div className="relative w-[395px] z-40">
                                <input
                                    value={getFilterText}
                                    onChange={filterFunc}
                                    maxLength={200}
                                    type="text"
                                    className="block w-full appearance-none bg-white border border-gray-400 hover:border-gray-500 px-5 py-2 pr-10 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Filter File or Folder"
                                />

                                {getFilterText.length > 0 && (
                                    <button
                                        onClick={clearFilterText}
                                        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700  cursor-pointer"
                                    >
                                        <i className="fa-sharp fa-solid fa-xmark"></i>
                                    </button>
                                )}

                                <div id="matchsort" className="absolute bg-white z-40 left-[50%] min-w-full">
                                    {getSuggestBool == true &&
                                        getSuggest.map(
                                            (data, index) =>
                                                index < 2 && (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            filterBysuggest(data.output_urls[0].filter_image_file_path)
                                                        }
                                                        className="w-full text-left px-[10px] py-[7px] text-gray-900 border-gray-200 border-solid border-b-[1px]"
                                                    >
                                                        {data.output_urls[0].filter_image_file_path}
                                                    </button>
                                                )
                                        )}
                                </div>
                            </div>
                        </div>
                    }
                    {getAfterBeforeImg.length > 0 && actionStatus == "" &&
                        <div >

                            <div className={`grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10 pt-2 ml-2 mb-5 pr-3 ${getAfterBeforeImg.length > 0 && ' h-[400]'}`}>

                                {currentImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`relative  h-[250px]`}

                                    >
                                        <div
                                            className={`img-container w-full h-full   bg-no-repeat  cursor-pointer  ${getAfterBeforeImg.length === 1 ? "h-[400px] justify-center" : "img-bag"}`}
                                            onClick={() => viewImg((currentPage - 1) * itemsPerPage + index)}
                                        //   style={{
                                        //     backgroundImage: `url(${image.output_urls[0].compressed_raw_image_public_url})`,
                                        //   }}
                                        >
                                            <img className="w-full h-full img-bag rounded-lg" src={image.output_urls[0].compressed_raw_image_public_url} />
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

                    {getSuggest.length > 0 && actionStatus == "filter" && (

                        <div >

                            <div className={`grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10 pt-2 ml-2   pr-3 ${getSuggest.length > 0 && ' h-[400]'}`}>

                                {currentImages.map((image, index) => (

                                    <div
                                        key={index}
                                        className={`relative  h-[250px]`}

                                    >
                                        <div
                                            className={`img-container w-full h-full   bg-no-repeat  cursor-pointer  ${getSuggest.length === 1 ? "h-[400px] justify-center" : "img-bag"}`}
                                            onClick={() => viewImg((currentPage - 1) * itemsPerPage + index)}
                                        //   style={{
                                        //     backgroundImage: `url(${image.output_urls[0].compressed_raw_image_public_url})`,
                                        //   }}
                                        >
                                            <img className="w-full h-full img-bag rounded-lg" src={image.output_urls[0].compressed_raw_image_public_url} />
                                        </div>


                                        <div className="flex gap-1  ">
                                            {image.output_urls[0].is_ai_processed ?
                                                <p><i className="fa-solid text-green-400 absolute top-2 right-2 fa-circle-check"></i></p>
                                                :
                                                <p className="loader_2 absolute top-[40%] left-[45%]"></p>
                                            }
                                        </div>
                                    </div>
                                ))}

                            </div>


                        </div>
                    )}

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

                </div>
                {getTotalImage !== 0 && getTotalImage == getProccessImgIndex && getFirstImgView &&

                    <div className="flex items-center justify-center absolute top-0 left-0 bg_1 w-full h-full z-50">
                        <div
                            // style={{
                            //     // position: "absolute",
                            //     // top: -20,
                            //     left: -10,
                            //     right: 0,
                            //     bottom: 0,
                            //     zIndex: 99,
                            //     display: "flex",
                            //     justifyContent: "center",
                            //     // backgroundColor: "#ffff"
                            // }}
                            className="flex flex-col justify-center z-50 bg-white pb-3 mt-[-50px]"
                        >
                            {getShowSrvMenu ?
                                <div className="h-[500px] w-[700px] bg-white relative rounded-md z-50">
                                    <p className=" text-white px-2 py-1 rounded-lg absolute top-1 bg-teal-500 left-10  font-semibold">Beautify imagery with Ad-on Professional Services</p>
                                    <p className="bg-teal-500 text-white absolute top-1 right-0 mb-10 font-semibold py-1 px-4  rounded-l-3xl">Choose Your Services</p>
                                    <div className=" w-[400px] pt-20 pl-16 absolute ">
                                        <div className=" w-[300px ] relative">
                                            {getCallbackAiBool ?
                                                <CompareImage
                                                    topImage={getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url}
                                                    bottomImage={getAfterBeforeImg[getImgIndex].output_urls[0].default_compressed_output_public_url}
                                                /> :
                                                <img className="h-[300px] w-full" src={getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url} />
                                            }
                                            <p className="absolute top-0 right-0  bg-teal-500 text-white px-3 text-xs py-1  rounded-l-3xl z-10">{actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].order_image_detail_sequence_no : getAfterBeforeImg[getImgIndex].output_urls[0].order_image_detail_sequence_no}</p>
                                        </div>
                                        <div className="flex justify-between border px-10 p-2 rounded-lg border-teal-500 mt-4 ">

                                            <a href={getAfterBeforeImg[getImgIndex].output_urls[0].default_compressed_output_public_url} download className="cursor-pointer"><p><i class="fa-solid fa-download"></i></p>
                                                <p className="text-xs">Download</p>
                                            </a>

                                            <div onClick={showSrvMenuFunc} className="cursor-pointer"><p><i class="fa-solid fa-sliders"></i></p>
                                                <p className="text-xs">Adjust</p></div>
                                        </div>
                                    </div>

                                    {getAfterBeforeImg.length > 0 && <ServiceMenu callBackIsAiProccess={callBackIsAiProccess} imageFile={actionStatus == "filter" ? getSuggest[getImgIndex] : getAfterBeforeImg[getImgIndex]} />}
                                </div>

                                :

                                <div>
                                    <div className="h-[500px] w-[600px] bg-white relative rounded-md z-50">
                                        <p className="w-full text-white px-2 py-2  absolute top-0 bg-teal-500  font-semibold">Beautify imagery with Ad-on Professional Services</p>
                                        <div className=" h-[460px] w-[570px] pt-12 ml-4 absolute ">
                                            <div className="  relative">
                                                {getCallbackAiBool ?
                                                    <CompareImage
                                                        topImage={getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url}
                                                        bottomImage={getAfterBeforeImg[getImgIndex].output_urls[0].default_compressed_output_public_url}
                                                    /> :
                                                    <img className="h-[460px] w-[570px] " src={getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url} />
                                                }
                                                <p className="absolute top-0 right-0  bg-teal-500 text-white px-3 text-xs py-1  rounded-l-3xl z-10">{actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].order_image_detail_sequence_no : getAfterBeforeImg[getImgIndex].output_urls[0].order_image_detail_sequence_no}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-10">

                                        <div className="flex justify-between border px-10 p-2 rounded-lg border-teal-500 mt-4 ">

                                            <a href={getAfterBeforeImg[getImgIndex].output_urls[0].default_compressed_output_public_url} download className="cursor-pointer"><p><i class="fa-solid fa-download"></i></p>
                                                <p className="text-xs">Download</p>
                                            </a>

                                            <div onClick={showSrvMenuFunc} className="cursor-pointer">
                                                <p><i class="fa-solid fa-sliders"></i></p>
                                                <p className="text-xs">Adjust</p></div>
                                        </div>
                                    </div>
                                    {getAfterBeforeImg.length > 0 && <CheckAiProccess callBackIsAiProccess={callBackIsAiProccess} imageFile={actionStatus == "filter" ? getSuggest[getImgIndex] : getAfterBeforeImg[getImgIndex]} />}
                                </div>
                            }

                            <div className="absolute left-0 top-[50%] w-full" style={{ transform: 'translateY(-50%)' }}>
                                <button disabled={getImgIndex == 0} onClick={() => { setImgIndex(getImgIndex - 1) }} className="float-left ml-36 cursor-pointer text-white disabled:text-gray-500 ">
                                    <i className="fa-solid fa-circle-chevron-left text-4xl "></i>
                                    {/* <i className="fa-solid fa-circle-chevron-left"></i> */}
                                </button>
                                <button disabled={getImgIndex == getAfterBeforeImg.length - 1} onClick={() => { setImgIndex(getImgIndex + 1) }} className="float-right mr-36 cursor-pointer text-white  disabled:text-gray-500 ">
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

                    <div className="flex items-center justify-center absolute top-0 left-0 bg_1 w-full h-full z-50">
                        <div
                            // style={{
                            //     // position: "absolute",
                            //     // top: -20,
                            //     left: -10,
                            //     right: 0,
                            //     bottom: 0,
                            //     zIndex: 99,
                            //     display: "flex",
                            //     justifyContent: "center",
                            //     // backgroundColor: "#ffff"
                            // }}
                            className="flex flex-col justify-center z-50 bg-white pb-3 mt-[-50px]"
                        >
                            {getShowSrvMenu ?
                                <div className="h-[500px] w-[700px] bg-white relative rounded-md z-50">
                                    <p className=" text-white px-2 py-1 rounded-lg absolute top-1 bg-teal-500 left-10  font-semibold">Beautify imagery with Ad-on Professional Services</p>
                                    <p className="bg-teal-500 text-white absolute top-1 right-0 mb-10 font-semibold py-1 px-4  rounded-l-3xl">Choose Your Services</p>
                                    <div className=" w-[400px] pt-20 pl-16 absolute ">
                                        <div className="h-[300px] border border-theme-shade  relative">
                                            {getCallbackAiBool ?
                                                <CompareImage
                                                    topImage={getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url}
                                                    bottomImage={getAfterBeforeImg[getImgIndex].output_urls[0].default_compressed_output_public_url}
                                                /> :
                                                <img className="h-[300px] w-full" src={getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url} />
                                            }
                                            <p className="absolute top-0 right-0  bg-teal-500 text-white px-3 text-xs py-1  rounded-l-3xl z-10">{actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].order_image_detail_sequence_no : getAfterBeforeImg[getImgIndex].output_urls[0].order_image_detail_sequence_no}</p>
                                        </div>
                                        <div className="flex justify-between border px-10 p-2 rounded-lg border-teal-500 mt-4 ">


                                            <a href={getAfterBeforeImg[getImgIndex].output_urls[0].default_compressed_output_public_url} download className="cursor-pointer"><p><i class="fa-solid fa-download"></i></p>
                                                <p className="text-xs">Download</p>
                                            </a>

                                            <div onClick={showSrvMenuFunc} className="cursor-pointer"><p><i class="fa-solid fa-sliders"></i></p>
                                                <p className="text-xs">Adjust</p></div>
                                        </div>
                                    </div>



                                    {getAfterBeforeImg.length > 0 && <ServiceMenu callBackIsAiProccess={callBackIsAiProccess} imageFile={actionStatus == "filter" ? getSuggest[getImgIndex] : getAfterBeforeImg[getImgIndex]} />}
                                </div>

                                :

                                <div>
                                    <div className="h-[500px] w-[600px] bg-white relative rounded-md z-50">
                                        <p className="w-full text-white px-2 py-2  absolute top-0 bg-teal-500  font-semibold">Beautify imagery with Ad-on Professional Services</p>
                                        <div className=" w-full pt-12 px-4 absolute ">
                                            <div className="w-[570px] h-[460px] border border-theme-shade  relative">
                                                {getCallbackAiBool ?
                                                    <CompareImage
                                                        topImage={getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url}
                                                        bottomImage={getAfterBeforeImg[getImgIndex].output_urls[0].default_compressed_output_public_url}
                                                    /> :
                                                    <img className="h-[460px] w-[570px]" src={getAfterBeforeImg[getImgIndex].output_urls[0].compressed_raw_image_public_url} />
                                                }
                                                <p className="absolute top-0 right-0  bg-teal-500 text-white px-3 text-xs py-1  rounded-l-3xl z-10">{actionStatus == "filter" ? getSuggest[getImgIndex].output_urls[0].order_image_detail_sequence_no : getAfterBeforeImg[getImgIndex].output_urls[0].order_image_detail_sequence_no}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-10">

                                        <div className="flex justify-between w-[500px] border px-10 p-2 rounded-lg border-teal-500 mt-4 ">

                                            <a href={getAfterBeforeImg[getImgIndex].output_urls[0].default_compressed_output_public_url} download className="cursor-pointer"><p><i class="fa-solid fa-download"></i></p>
                                                <p className="text-xs">Download</p>
                                            </a>

                                            <div onClick={showSrvMenuFunc} className="cursor-pointer">
                                                <p><i class="fa-solid fa-sliders"></i></p>
                                                <p className="text-xs">Adjust</p></div>
                                        </div>
                                    </div>
                                    {getAfterBeforeImg.length > 0 && <CheckAiProccess callBackIsAiProccess={callBackIsAiProccess} imageFile={actionStatus == "filter" ? getSuggest[getImgIndex] : getAfterBeforeImg[getImgIndex]} />}
                                </div>
                            }

                            <div className="absolute left-0 top-[50%] w-full" style={{ transform: 'translateY(-50%)' }}>
                                <button disabled={getImgIndex == 0} onClick={() => { setImgIndex(getImgIndex - 1) }} className="float-left ml-36 cursor-pointer text-white disabled:text-gray-500 ">
                                    <i className="fa-solid fa-circle-chevron-left text-4xl "></i>
                                    {/* <i className="fa-solid fa-circle-chevron-left"></i> */}
                                </button>
                                <button disabled={getImgIndex == getAfterBeforeImg.length - 1} onClick={() => { setImgIndex(getImgIndex + 1) }} className="float-right mr-36 cursor-pointer text-white  disabled:text-gray-500 ">
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
                        {/* <button onClick={reviewPaymentFunc} className="flex justify-center items-center">
                            <button className="px-4 py-1 rounded-lg bg-white text-black">Review Payment</button>
                        </button> */}
                    </div>

                }
                {getAfterBeforeImg.length > 0 &&

                    <div className=" absolute   bottom-12 w-full ">

                        <div className="flex mb-4 justify-between w-full    ">
                            {/* Previous button */}
                            <div>
                                <button
                                    disabled={currentPage === 1}
                                    className="cursor-pointer text-white disabled:text-gray-500"
                                    onClick={previousPage}
                                >
                                    <i className="fa-solid text-2xl ml-5 fa-circle-chevron-left "></i>
                                </button></div>
                            {/* Next Button */}
                            <div>
                                <button
                                    disabled={currentPage === Math.ceil(actionStatus == "filter" ? getSuggest.length / itemsPerPage : getAfterBeforeImg.length / itemsPerPage)}
                                    className="cursor-pointer text-white disabled:text-gray-500"
                                    onClick={nextPage}
                                >
                                    <i className="fa-solid text-2xl mr-3 fa-circle-chevron-right "></i>
                                </button>
                            </div>
                        </div>

                        <div className="w-full bg-black border z-[999] border-white rounded-md py-1 absolute flex justify-between px-10 ">
                            <div className="flex justify-center items-center font-bold">
                                <button onClick={openModal} className="px-4 py-1 rounded-lg bg-white text-black" >Charge breakdown</button>
                            </div>
                            <div className="flex gap-20 font-bold">
                                <div className="text-white text-start text-sm">
                                    <p>Total Image(s) : {getAfterBeforeImg.length}</p>
                                    {getTotalImage == getProccessImgIndex && <p>Total Charge : <TotalBill actionSwitch={getSwitchLoop} /></p>}
                                </div>

                                <Link to="/pricing" className="flex justify-center items-center">
                                    <button className="px-4 py-1 rounded-lg bg-white text-black">Review Payment</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
                {/* CostBreakDown Modal Start---------------------------------------------------- */}
                <>
                    {isOpen && (
                        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-opacity-50 bg-gray-500">
                            <div className="flex  bg-white w-[400px] mx-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div
                                    className="fixed inset-0 "
                                    aria-hidden="true"
                                    onClick={closeModal}
                                >
                                    <div className="absolute inset-0 bg-gray-600 opacity-80"></div>

                                </div>

                                <div
                                    className=" w-[750px] h-[560px] absolute bottom-10 left-[50%] align-bottom border border-teal-700 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all "
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="modal-headline"
                                    style={{ transform: 'translateX(-50%)' }}
                                >
                                    <div className="bg-white  flex justify-center pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">

                                            <div className="mt-3 mb-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <CostBreakDown closeModal={closeModal} ></CostBreakDown>

                                            </div>
                                        </div>
                                    </div>
                                    <div className=" py-4 flex gap-4 justify-center ">

                                        <Link to="/log-in">
                                            <button className="text-white w-20 bg-green-400  px-1 py-1 rounded-md">
                                                Login
                                            </button>
                                        </Link>
                                        <button

                                            className="text-white w-20 bg-red-400  px-1 py-1 rounded-md"
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
                {/* CostBreakDown Modal end----------------------------------------- */}

            </div>
        </div >
    )
}

export default ImageUpload;