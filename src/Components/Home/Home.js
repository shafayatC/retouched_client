
import { useState, useContext } from 'react';
import SignInForm from '../SignInForm/SignInForm';
import logo from '../images/logo.png'
import Navbar from './Navbar/Navbar';
import './style.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileContextManager, apiUrlContextManager, menuContextManager, userContextManager } from '../../App';
import PopupMessage from '../PopUp/PopupMessage';


const Home = ({ callBackFile }) => {

    const [isModOpen, setIsModOpen] = useState(false);
    const [getActionId, setActionId] = useState(""); 
    const [showSignInForm, setShowSignInForm] = useState(false);
    const [getSwitchForm, setSwitchForm] = useState(true);
    const [getSignUpMail, setSignUpMail] = useState("");
    const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager); 
    const [getMenuId, setMenuId, getMenu, setMenu] = useContext(menuContextManager)
    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
    const [getPopup, setPopup] = useState(false); 
    const [getPopMsg, setPopMsg] = useState("");
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

    const openModal = (id) => {
        document.getElementById(id).value = null; 
      if(getAfterBeforeImg.length > 0){
        setIsModOpen(true);
        setActionId(id)
      }else {
        document.getElementById(id).click()
      }
    };

    const closeModal = () => {
        setIsModOpen(false);
    };

    const okayButton =()=>{
        document.getElementById(getActionId).click()
        closeModal()
    }



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

            callBackFile(files)
        }

    }

    const SignInHandleOpen = () => {
        setShowSignInForm(true);
        setSwitchForm(true)
    }

    const SignUpHandleOpen = () => {
        setShowSignInForm(true);
        setSwitchForm(false)
    }
    const SignInHandleClose = () => {
        setShowSignInForm(false);
    }

    const singUpFunc = async () => {


        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (getSignUpMail.match(validRegex)) {
            const regMail = { "email": getSignUpMail }
            try {

                const rawResponse = await fetch(getApiBasicUrl + '/system-sign-up', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'bearer ' + getToken
                    },
                    body: JSON.stringify(regMail)
                });

                const res = await rawResponse.json();
                if
                    (res.status_code == 200) {
                    showToastMessage(res.message)
                }

                else {
                    showToastMessageWarning(res.message)
                }

            } catch (error) {
                console.log(error)
            }
        } else {
            showToastMessageError("email format is not valide")
        }
    }

    const showToastMessage = (msg) => {
        toast.success(msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      };
    
      const showToastMessageWarning = (msg) => {
        toast.warning(msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      };
    
      const showToastMessageError = (msg) => {
        toast.error(msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      };
      const callBackMessagePopup =(bl)=>{
        setPopup(bl)
    }
    return (
        <div id='home' className="bg_1 h-full pb-28 border-b-2 border-white">
            <div className='container mx-auto'>
                <Navbar items={getMenu}></Navbar>

                <button className="hidden" id="singInButton" onClick={SignInHandleOpen}></button>
                <button className="hidden" id="singUpButton" onClick={SignUpHandleOpen}></button>

                {/* <div className='flex justify-between mx-2 pt-4'>
                    <img className='h-12 w-12 rounded-full' src={logo} alt="" />
                    <h2 className='text-white font-bold'>SPONSOR <i className="fa-brands ml-2 fa-twitter"></i></h2>
                </div> */}
                <div className='flex gap-6 2xl:gap-60 flex-col lg:flex-row'>
                    <div className='mt-28 w-[650px]'>
                        <h2 className='text-white text-4xl text-left'>Stay up to date with the latest in Machine Learning.</h2>
                        <p className='text-white text-left w-[600px] text-xl mt-3'>Get a weekly summary of the top research papers, repos, and tweets identified by our AI models.</p>

                        <div className="mt-4 flex gap-3">
                            <input
                            
                            onChange={(e) => setSignUpMail(e.target.value)}
                            value={getSignUpMail}
                                type="text"
                                className=" w-96 px-4 py-3 border border-gray-400 text-xl font-normal text-white bg-gray-800 rounded-md " placeholder="Email address"
                            />
                            <button onClick={singUpFunc} className='bg-[#03448D] border hover:bg-blue-400 border-blue-400 text-white font-semibold rounded-md text-sm px-8 '>Join Here</button>
                        </div>

                        <div className='flex mt-16 gap-4'>
                            <div className='h-[75px] w-[75px] border-4 border-gray-600 text-xs flex justify-center items-center text-white rounded-full'>Photo Retouch</div>

                            <div className='h-[75px] w-[75px] border-4 border-gray-600 text-xs flex justify-center items-center text-white rounded-full'>Ghost Mannequin</div>

                            <div className='h-[75px] w-[75px] border-4 border-gray-600 text-xs flex justify-center items-center text-white rounded-full'>Shadow Creation</div>

                            <div className='h-[75px] w-[75px] border-4 border-gray-600 text-xs flex justify-center items-center text-white rounded-full'>Image Masking</div>

                            <div className='h-[75px] w-[75px] border-4 border-gray-600 text-xs flex justify-center items-center text-white rounded-full'>Image Resizing</div>

                            <div className='h-[75px] w-[75px] border-4 border-gray-600 text-xs flex justify-center items-center text-white rounded-full'>Objects Removal</div>
                        </div>
                    </div>

                    <div
                        onDrop={dropHandler}
                        onDragOver={dragOverHandler}
                        onDragEnter={e => console.log("")}
                        onDragLeave={e => console.log("")}
                        className='flex flex-col  w-full  justify-center items-center h-[300px] mt-28 p-5 bg-gray-300 rounded-xl'>

                        <div

                            className=" rounded-lg flex flex-col justify-center items-center w-[400px] h-40 mx-auto"
                        >
                            <p><i className="fa-solid text-[#696C96] text-7xl fa-cloud-arrow-up"></i></p>
                            <p className="text-center text-lg mt-4 ">Choose your <span className="font-bold">File</span> or drag it here...</p>
                        </div>
                        <div >
                            <div className="content flex justify-center mt-4 gap-5">
                                <div className="round-container">
                                    <a
                                        //  href='#upload'
                                        onClick={() =>
                                            // document.querySelector("#singleImagePick").click()
                                            openModal("singleImagePick")
                                        }
                                        className="round-content">
                                        File
                                    </a>
                                </div>
                                <div
                                    className="round-container">
                                    <button 
                                    
                                    onClick={() =>
                                        // document.querySelector("#filepicker").click()
                                        openModal("filepicker")
                                    }
                                    className="round-content">
                                        Folder
                                    </button>
                                </div>
                                <div className="round-container">
                                    <button className="round-content">
                                        FTP
                                    </button>
                                </div>
                                <div className="round-container">
                                    <button className="round-content">
                                        URL
                                    </button>
                                </div>
                            </div>
                            {/* <div className='border-[#282C5D] bg-[#3A3E66] h-60 ml-20 p-2 rounded-md border-8  w-40 '>

                                <div className='mb-4'>
                                    <h2 className='text-[#A0A2B7] font-bold  text-left text-sm'>Top Papers</h2>
                                    <p className='text-[#A0A2B7] text-xs ml-2 text-left'>Hello Paper</p>
                                    <p className='text-[#A0A2B7] text-xs ml-2 text-left'>Bye Paper</p>
                                </div>
                                <div className='mb-4'>
                                    <h2 className='text-[#A0A2B7] font-bold  text-left text-sm'>Top Papers</h2>
                                    <p className='text-[#A0A2B7] text-xs ml-2 text-left'>Hello Paper</p>
                                    <p className='text-[#A0A2B7] text-xs ml-2 text-left'>Bye Paper</p>
                                </div>
                                <div>
                                    <h2 className='text-[#A0A2B7] font-bold  text-left text-sm'>Top Papers</h2>
                                    <p className='text-[#A0A2B7] text-xs ml-2 text-left'>Hello Paper</p>
                                    <p className='text-[#A0A2B7] text-xs ml-2 text-left'>Bye Paper</p>
                                </div>


                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center mb-8 ">
                {/* <button
                    className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors"
                    onClick={SignInHandleOpen}
                >
                    Sign In
                </button> */}

                {showSignInForm && <SignInForm onClose={SignInHandleClose} switchBool={getSwitchForm} />}

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
                                className="inline-block w-[460px] h-[180px] align-bottom border border-teal-700 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all "
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-headline"
                            >
                                <div className="bg-white  flex justify-center pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">

                                        <div className="mt-3 mb-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3
                                                className="text-xl leading-6 font-bold text-gray-900"

                                            >
                                                <i class="fa-solid text-yellow-500  fa-circle-exclamation"></i> Confirmation: <span className='text-lg font-medium'>Clear Previous Order Images</span>
                                            </h3>

                                        </div>
                                    </div>
                                </div>
                                <div className=" py-4 flex gap-4 justify-center ">


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

            {getPopup && <PopupMessage msg={getPopMsg} dark={true} callBackMessagePopup={callBackMessagePopup}/>}  

        </div>
    )
}

export default Home;
