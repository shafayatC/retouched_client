import p1 from "../images/1.jpg"
import p2 from "../images/2.jpg"
import p3 from "../images/3.jpg"
import CompareImage from "../CompareImage/CompareImage";
import './style.css';

const ImageUpload = () => {
    return (
        <div className="container mx-auto my-20">
            <div>

                <div className="flex gap-16 justify-center">
                    <div className="flex items-center">
                        <img className="h-[300px] w-[300px] skew-y-3  opacity-50" src={p3} />
                    </div>
                    <div className="h-[500px] w-[600px]">
                        <CompareImage topImage={p1} bottomImage={p1} />

                    </div>
                    {/* 
                    <div className="flex items-center opacity-50">
                        <img className="h-[300px] w-[300px]  -skew-y-3 " src={p2} />
                    </div> */}

                    <div className="flex items-center">
                        <img class="css_transform h-[300px] w-[300px]" src={p2} />
                    </div>

                </div>
                <div className="">
                    <button className=" px-4 py-1 bg-[#696C96] rounded-lg mt-2 text-white">Process Image</button>
                </div>

            </div>
        </div>
    )
}

export default ImageUpload;