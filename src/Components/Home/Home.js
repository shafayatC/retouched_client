
import { useState, useContext } from 'react';
import SignInForm from '../SignInForm/SignInForm';
import logo from '../images/logo.png'
import Navbar from './Navbar/Navbar';
import './style.css'
import { menuContextManager } from '../../App';


const Home = ({ callBackFile }) => {

    const [getMenuId, setMenuId, getMenu, setMenu] = useContext(menuContextManager)

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
    const [showSignInForm, setShowSignInForm] = useState(false);


    function SignInHandleOpen() {
        setShowSignInForm(true);
    }

    function SignInHandleClose() {
        setShowSignInForm(false);
    }



    return (
        <div id='home' className="bg_1 h-full pb-28">
            <div className='container mx-auto'>
                <Navbar items={getMenu}></Navbar>

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
                                type="text"
                                className=" w-96 px-4 py-3 border border-gray-400 text-xl font-normal text-white bg-gray-800 rounded-md " placeholder="Email address"
                            />
                            <button className='bg-[#03448D] border hover:bg-blue-400 border-blue-400 text-white font-semibold rounded-md text-sm px-8 '>Join Here</button>
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
                                            document.querySelector("#singleImagePick").click()
                                        }
                                        className="round-content">
                                        File
                                    </a>
                                </div>
                                <a
                                    onClick={() =>
                                        document.querySelector("#filepicker").click()
                                    }
                                    className="round-container">
                                    <button className="round-content">
                                        Folder
                                    </button>
                                </a>
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
                <button
                    className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors"
                    onClick={SignInHandleOpen}
                >
                    Sign In
                </button>
                {showSignInForm && <SignInForm onClose={SignInHandleClose} />}
            </div>


        </div>
    )
}

export default Home;
