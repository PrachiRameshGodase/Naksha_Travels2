import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import ImagesCrou from "../../Components/ShowImageCarousel.jsx/ImagesCrou";

const Attachment = ({ attachments }) => {

    //Show items image
    const [showImagesModal, setshowImagesModal] = useState(false);
    // const [showComponent, setShowComponent] = useState(false);
    const [imagesVal, setImagesVal] = useState([]);

    const showAllImages = (val) => {
      const imageUrls = val.map((item) => item.url); 
        setImagesVal(imageUrls);
        setshowImagesModal(true);
        // setShowComponent(true);
    }
    return (
        <div>
            <p className='sfdjklsd1xs2w4' style={{ marginLeft: "5px" }}>
                {(attachments)?.length >= 1 ? (
                    <span onClick={() => showAllImages(attachments)}>
                        {(attachments)?.length} Images <MdArrowOutward style={{cursor:"pointer"}} />
                    </span>
                ) : (
                    "No Image"
                )}
            </p>
            {showImagesModal && (
                <ImagesCrou
                    showModal={showImagesModal}
                    closeModal={setshowImagesModal}
                    images={imagesVal}
                />
            )}
        </div>
    );
};

export default Attachment;
