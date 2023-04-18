import logo from '../images/logo.png'
import './style.css'

const Home = () => {
    return (
        <div className="bg-[#060D5A] h-[100vh]">
            <div className='container mx-auto'>
                <div className='flex justify-between mx-2 pt-4'>
                    <img className='h-12 w-12 rounded-full' src={logo} alt="" />
                    <h2 className='text-white font-bold'>SPONSOR <i className="fa-brands ml-2 fa-twitter"></i></h2>
                </div>

                <div className='flex gap-4'>
                    <div className='mt-28 w-[650px] '>
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


                    <div className='flex flex-col justify-center items-center  h-[300px] mt-28 p-5 bg-gray-300 rounded-xl ml-20'>
                        <div className='text-white font-bold px-5 py-2 bg-[#696C96] rounded-md '>
                            <h2 >UPLOAD IMAGE</h2>
                            <p><i className="fa-solid text-xl mt-2 fa-caret-down"></i></p>
                        </div>
                        <div >
                            <div className="content flex justify-center mt-8 gap-5">
                                <div className="round-container">
                                    <button className="round-content">
                                        File
                                    </button>
                                </div>
                                <div className="round-container">
                                    <button className="round-content">
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

        </div>
    )
}

export default Home;