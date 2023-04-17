import logo from '../images/logo.png'
import './style.css'

const Home = () => {
    return (
        <div className="bg-[#060D5A] h-[100vh]">
            <div className='container mx-auto'>
                <div className='flex justify-between mx-2 pt-4'>
                    <img className='h-16 w-16 rounded-full' src={logo} alt="" />
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
                            <button className='bg-[#03448D] border hover:bg-blue-400 border-blue-400 text-white font-semibold rounded-md text-sm px-3  '>GET MY SUMMARY</button>
                        </div>
                        <a href='' target='_blank' className='text-white underline flex justify-start mt-2 '>Read the latest summary</a>
                    </div>
                    <div className='mt-4 justify-center items-center  flex gap-4'>


                        <div className="content flex flex-col  mt-8 gap-6">
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

                        <div className='flex flex-col -mt-5 gap-4'>
                            <div className='h-[75px] w-[75px] border-4 border-gray-600 text-xs flex justify-center items-center text-white rounded-full'>Photo Retouch</div>

                            <div className='h-[75px] w-[75px] border-4 border-gray-600 text-xs flex justify-center items-center text-white rounded-full'>Ghost Mannequin</div>

                            <div className='h-[75px] w-[75px] border-4 border-gray-600 text-xs flex justify-center items-center text-white rounded-full'>Shadow Creation</div>

                            <div className='h-[75px] w-[75px] border-4 border-gray-600 text-xs flex justify-center items-center text-white rounded-full'>Image Masking</div>

                            <div className='h-[75px] w-[75px] border-4 border-gray-600 text-xs flex justify-center items-center text-white rounded-full'>Image Resizing</div>

                            <div className='h-[75px] w-[75px] border-4 border-gray-600 text-xs flex justify-center items-center text-white rounded-full'>Objects Removal</div>



                        </div>

                        <div className='border-[#282C5D] bg-[#3A3E66] h-60 ml-20 p-2 rounded-md border-8  w-40 '>

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


                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='text-center text-white mt-6'>Join 50012 world-class researchers and engineers from</h2>
                </div>
            </div>

        </div>
    )
}

export default Home;
