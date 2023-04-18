import p1 from "../images/1.jpg"
import p2 from "../images/2.jpg"
import CompareImage from "../CompareImage/CompareImage";

const ImageUpload = () => {
    return (
        <div className="container mx-auto my-20">
            <div>

                <div className="flex justify-center">
                    <div className="h-[400px] w-[600px]">
                        <CompareImage topImage={"https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg"} bottomImage={"https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg"} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageUpload;