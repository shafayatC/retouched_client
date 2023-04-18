import p1 from "../images/1.jpg"
import p2 from "../images/2.jpg"
import CompareImage from "../CompareImage/CompareImage";

const ImageUpload = () => {
    return (
        <div className="container mx-auto my-20">
            <div>

                <div className="flex justify-center">
                    <div className="h-[400px] w-[600px]">
                        <CompareImage topImage={p1} bottomImage={p2} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageUpload;