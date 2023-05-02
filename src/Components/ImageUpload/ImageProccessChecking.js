import React, { useState } from 'react';

const ImageProccessChecking = () => {
    const [getImageStatus, setImageStatus] = useState(false);

    function testImage(url, callback, timeout) {
        timeout = timeout || 5000;
        var timedOut = false,
            timer;
        var img = new Image();
        img.src = url;
        img.onerror = img.onabort = function () {
            if (!timedOut) {
                clearTimeout(timer);
                callback("error");
            }
        };
        img.onload = function () {
            if (!timedOut) {
                clearTimeout(timer);
                callback("success");
            }
        };
        // img.src = url;
        timer = setTimeout(function () {
            timedOut = true;
            callback("timeout");
        }, timeout);
    }


    const checkAiProccesDone = (imgFile) => {
        console.log(imgFile)
        console.log("check proccese is done ")
        const myCallback = (result) => {
            if (result == "success") {
                // getAfterBeforeImg[0].output_urls[0].is_ai_processed = true;
                console.log("success is")

                setImageStatus(true);
            } else {
                console.log("unsuccess is")

                checkAiProccesDone(imgFile)
            }
        };
        testImage(
            imgFile,
            myCallback
        );
    };

    return (
        <>
            {
                getImageStatus &&
                <div className=" text-green-400 absolute top-2 right-2 ">
                    <p><i className="fa-solid fa-circle-check"></i></p>
                </div>
            }

        </>

    );
};

export default ImageProccessChecking;