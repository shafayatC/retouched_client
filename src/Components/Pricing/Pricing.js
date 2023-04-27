import React from 'react'
import free from '../images/free.png'
import enterprise from '../images/enterprise.png'

const Pricing = () => {
    return (
        <div className='container mx-auto h-full py-5 bg-white rounded-lg'>
            <div className='mt-6'>
                <h2 className='text-center text-4xl font-bold text-purple-500'>Choose Your Plan</h2>
            </div>
            <div className='flex w-full justify-center  '>
                {/* standard----------------------- */}
                <div className='h-[500px] w-60  mt-10 border border-r-0 border-gray-500 p-5'>
                    <h2 className='text-center pt-5 text-purple-400 text-xl font-semibold'>Standard</h2>
                    <h2 className='text-center pt-4  text-3xl font-bold'>Free</h2>
                    <img className='' src={free} />
                    <button className='px-10 rounded-lg  py-2 mt-4 bg-white text-purple-400 font-semibold border-2 border-purple-500'>Sign Up Free</button>
                    <p className='text-xs my-4 font-semibold text-purple-400'>+3 images per signup</p>

                    <p className='text-start text-sm'><i class="fa-solid fa-check mr-3 text-purple-700"></i>3 Images per day</p>
                    <p className='text-start text-sm'><i class="fa-solid fa-check mr-3 text-purple-700"></i>Background removal option</p>
                    <p className='text-start text-sm'><i class="fa-solid fa-check mr-3 text-purple-700"></i>76 background designs</p>
                    <p className='text-start text-sm'><i class="fa-solid fa-check mr-3 text-purple-700"></i>1 GB of project storage</p>
                </div>

                {/* pro----------------------- */}
                <div className='h-[520px] w-[280px] mt-5 border-2 border-blue-400 rounded-t-lg  pb-5'>
                    <p className='w-full bg-blue-400 rounded-t-lg text-sm font-semibold text-white'>Most Popular</p>
                    <h2 className='text-center pt-10 text-purple-400  text-xl font-semibold'>Pro</h2>

                    <h2 className='text-center pt-4  text-3xl font-bold'>$6,59/month</h2>
                    <p className='mt-5 mb-6'>$0,015 /image</p>
                    <button className='px-16 rounded-lg  py-2 border border-purple-500 hover:bg-purple-400 mt-24 bg-purple-500 text-white mb-12 font-semibold '>Choose Pro</button>


                    <p className='text-start text-sm mt-1 px-5'><i class="fa-solid fa-check mr-3 text-purple-700"></i>50 images/day</p>
                    <p className='text-start text-sm px-5'><i class="fa-solid fa-check mr-3 text-purple-700"></i>Limit of 500 images/month</p>
                    <p className='text-start text-sm px-5'><i class="fa-solid fa-check mr-3 text-purple-700"></i>Background removal option</p>
                    <p className='text-start text-sm px-5'><i class="fa-solid fa-check mr-3 text-purple-700"></i>Batch background removing <i class="fa-solid text-purple-600 fa-circle-question"></i></p>
                </div>

                {/* Business----------------------------- */}
                <div className='h-[500px] w-[280px]  mt-10 border border-l-0 border-gray-400 p-5'>
                    <h2 className='text-center pt-5 text-purple-400 text-xl font-semibold'>Business</h2>
                    <h2 className='text-center pt-4  text-3xl font-bold'>$12,99/month</h2>
                    <p className='mt-5 mb-6'>$0,015 /image</p>
                    <button className='px-10 rounded-lg  py-2 mt-24 bg-white text-purple-400 font-semibold border-2 border-purple-500'>Choose Business</button>
                    <p className='text-sm my-4 font-semibold text-black'>Pro Features Plus..</p>

                    <p className='text-start text-sm'><i class="fa-solid fa-check mr-3 text-purple-700"></i>1000 images/day</p>
                    <p className='text-start text-sm'><i class="fa-solid fa-check mr-3 text-purple-700"></i>Limit of 1000 images/months</p>
                    <p className='text-start text-sm'><i class="fa-solid fa-check mr-3 text-purple-700"></i>Batch editing <i class="fa-solid text-purple-600 fa-circle-question"></i></p>
                    <p className='text-start text-sm'><i class="fa-solid fa-check mr-3 text-purple-700"></i>Text editor <i class="fa-solid text-purple-600 fa-circle-question"></i></p>
                </div>

                {/* Enterprise----------------- */}
                <div className='h-[500px] w-64  mt-10 border-l-0 border border-gray-500 p-5'>
                    <h2 className='text-center pt-5 text-purple-400 text-xl font-semibold'>Enterprise</h2>

                    <img className='mt-8' src={enterprise} />
                    <button className='px-12 rounded-lg  py-2 mt-8 bg-white text-purple-400 font-semibold border-2 border-purple-500'>Contact Us</button>
                    <p className='text-sm my-4 font-semibold text-black'>Business Features Plus..</p>

                    <p className='text-start text-sm'><i class="fa-solid fa-check mr-3 text-purple-700"></i>Up to 1 million images/month</p>
                    <p className='text-start text-sm'><i class="fa-solid fa-check mr-3 text-purple-700"></i>API <i class="fa-solid text-purple-600 fa-circle-question"></i></p>
                    <p className='text-start text-sm'><i class="fa-solid fa-check mr-3 text-purple-700"></i>Extension for CMS <i class="fa-solid text-purple-600 fa-circle-question"></i></p>
                    <p className='text-start text-sm'><i class="fa-solid fa-check mr-3 text-purple-700"></i>Unlimited project storage</p>
                </div>


            </div>

        </div>
    )
}

export default Pricing