import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import ImagesCrou from "../../Components/ShowImageCarousel.jsx/ImagesCrou";
import { RxCross2 } from "react-icons/rx";

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




export const Attachment2 = ({ attachments }) => {
    const [showImagesModal, setshowImagesModal] = useState(false);
    const [imagesVal, setImagesVal] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // For previewing a selected image

    const showAllImages = (val) => {
        const imageUrls = Array.isArray(val) ? val.map((item) => item.url || item) : [val];
        setImagesVal(imageUrls);
        setSelectedImage(imageUrls[0]); // Default to the first image
        setshowImagesModal(true);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image); // Set the clicked image as selected
    };

    return (
        <div>
            <p className="sfdjklsd1xs2w4" style={{ marginLeft: "5px" }}>
                {attachments ? (
                    <div>
                        <span onClick={() => showAllImages(attachments)} style={{ cursor: "pointer" }}>
                            {Array.isArray(attachments) ? `${attachments.length} Image(s)` : "1 Image"} <MdArrowOutward />
                        </span>
                    </div>
                ) : (
                    "No Image"
                )}
            </p>

            {/* Image Preview Modal */}
            {showImagesModal && (
                <div className="mainxpopups2">
                    <div className="popup-content02">
                        <span className="close-button02" onClick={() => setshowImagesModal(false)}>
                            <RxCross2 />
                        </span>
                        {selectedImage ? (
                            <img 
                                src={selectedImage} 
                                alt="Selected Preview" 
                                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                            />
                        ) : (
                            <p>No image selected</p>
                        )}
                    </div>
                    <div className="thumbnail-container">
                        {imagesVal.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    margin: "5px",
                                    cursor: "pointer",
                                    border: image === selectedImage ? "2px solid blue" : "none",
                                }}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};







