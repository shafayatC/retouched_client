import React, { useState } from 'react';

const PopupMessage = ({msg, dark = false, callBackMessagePopup}) => {
    return (
        <>
            <div className='fixed w-full h-full top-0 left-0 flex justify-center items-center'>
                <div className='absolute rounded-md bg-white z-10 max-w-[400px] min-w-[300px] m-auto px-6 py-3  shadow-lg '>
                    <div className='py-8 text-center text-lg'>
                        <h3>{msg}</h3>
                    </div>
                    <div className='flex justify-center gap-3'>
                        <button onClick={() => callBackMessagePopup(false)} className='bg-red-800 min-w-[100px] text-white py-1 rounded'>Close</button>
                    </div>
                </div>
            {dark &&  <div onClick={() => callBackMessagePopup(false)} className='bg-black opacity-50 absolute w-full h-full top-0 left-0'></div>} 
            </div>
        </>
    );
};

export default PopupMessage;