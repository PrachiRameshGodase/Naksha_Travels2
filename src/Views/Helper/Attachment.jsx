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
  };
  return (
    <div>
      <p className="sfdjklsd1xs2w4" style={{ marginLeft: "5px" }}>
        {attachments?.length >= 1 ? (
          <span onClick={() => showAllImages(attachments)}>
            {attachments?.length} Images{" "}
            <MdArrowOutward style={{ cursor: "pointer" }} />
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
    const imageUrls = Array.isArray(val)
      ? val.map((item) => item.url || item)
      : [val];
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
            <span
              onClick={() => showAllImages(attachments)}
              style={{ cursor: "pointer" }}
            >
              {Array.isArray(attachments)
                ? `${attachments.length} Image(s)`
                : "1 Image"}{" "}
              <MdArrowOutward />
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
            <span
              className="close-button02"
              onClick={() => setshowImagesModal(false)}
            >
              <RxCross2 />
            </span>
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
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

const imageExtensions = ["jpg", "jpeg", "png", "gif"];

// Helper function to get the file extension
const getFileExtension = (fileName) => fileName?.split(".").pop().toLowerCase();

// Component to render the file preview
const renderFilePreview = (file, index, showImagePopup, openFileInNewTab) => {
  const fileExtension = getFileExtension(file.name);
  const isImage = imageExtensions.includes(fileExtension);

  if (isImage) {
    return (
      <img
        key={index}
        src={file.url}
        alt={`Uploaded ${file.name}`}
        className="uploaded-image"
        onClick={() => showImagePopup(file.url)}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          cursor: "pointer",
          margin: "5px",
        }}
      />
    );
  }

  // Render icons for non-image files
  const openFileHandler = () => openFileInNewTab(file.url);

  if (fileExtension === "pdf") {
    return (
      <i
        key={index}
        className="file-icon pdf-icon"
        onClick={openFileHandler}
        style={{ cursor: "pointer", margin: "5px" }}
      >
        PDF
      </i>
    );
  }
  if (["doc", "docx"].includes(fileExtension)) {
    return (
      <i
        key={index}
        className="file-icon word-icon"
        onClick={openFileHandler}
        style={{ cursor: "pointer", margin: "5px" }}
      >
        Word
      </i>
    );
  }
  if (["xls", "xlsx"].includes(fileExtension)) {
    return (
      <i
        key={index}
        className="file-icon excel-icon"
        onClick={openFileHandler}
        style={{ cursor: "pointer", margin: "5px" }}
      >
        Excel
      </i>
    );
  }
  if (fileExtension === "zip") {
    return (
      <i
        key={index}
        className="file-icon zip-icon"
        onClick={openFileHandler}
        style={{ cursor: "pointer", margin: "5px" }}
      >
        ZIP
      </i>
    );
  }

  // Default fallback for unsupported files
  return (
    <i
      key={index}
      className="file-icon generic-icon"
      onClick={openFileHandler}
      style={{ cursor: "pointer", margin: "5px" }}
    >
      File
    </i>
  );
};

export const AttachmentPreviewMultipleDocument = ({ attachments }) => {
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [imagesVal, setImagesVal] = useState([]);
  const [showAttachmentPreviews, setShowAttachmentPreviews] = useState(false); // New state for toggling previews

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]; // Define supported image file extensions

  // Function to handle image popup
  const showImagePopup = (url) => {
    // setImagesVal([url]);
    setShowImagesModal(true);
  };

  // Function to open non-image file in a new tab
  const openFileInNewTab = (url) => {
    window.open(url, "_blank");
  };

  // Handle arrow click to directly open previews for images or open non-image files in new tab
  const handleArrowClick = (url) => {
    console.log("first", url[0]);
    // if (attachments && attachments.length > 0) {
    //   const firstAttachment = attachments[0];
    //   const fileExtension = getFileExtension(firstAttachment.name);

    //   if (imageExtensions.includes(fileExtension)) {
    //     showImagePopup(firstAttachment.url); // Show image preview if it's an image file
    //   } else {
    //     openFileInNewTab(firstAttachment.url); // Open non-image file in a new tab
    //   }
    // }
  };

  // Function to extract the file extension from the file name
  const getFileExtension = (fileName) => {
    return fileName?.split(".").pop().toLowerCase();
  };

  return (
    <div>
      <p className="sfdjklsd1xs2w4" style={{ marginLeft: "5px" }}>

        {/* {JSON.parse(attachments)} */}
        {attachments?.length >= 1 ? (
          <>
            <span
              style={{ cursor: "pointer" }}
            // Directly show the preview or open the file
            >
              {JSON.parse(attachments).length >= 1 && <span><MdArrowOutward onClick={() => handleArrowClick(JSON.parse(attachments))} /></span>}
              {console.log("attachments", JSON.parse(attachments))}
              {/* <MdArrowOutward /> */}
            </span>
          </>
        ) : (
          "-"
        )}
      </p>

      {showImagesModal && (
        <div className="mainxpopups2">
          <div className="popup-content02">
            <span
              className="close-button02"
              onClick={() => setShowImagesModal(false)}
            >
              <RxCross2 />
            </span>
            <img
              src={imagesVal[0]} // Display the selected image
              alt="Attachment"
              height={500}
              width={500}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const AttachmentPreview3 = ({ attachments }) => {

  return (
    <div>
      <p className="sfdjklsd1xs2w4" style={{ marginLeft: "5px" }}>
        {attachments != "-" ? (
          <div>
            <img
              src={attachments || "-"}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
          </div>
        ) : (
          "-"
        )}
      </p>
    </div>
  );
};

export const AttachmentPreview4 = ({ document }) => {

  const [showImagesModal, setShowImagesModal] = useState(false);
  const [imagesVal, setImagesVal] = useState([]);
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]; // Supported image file extensions

  // Function to handle image popup
  const showImagePopup = (url) => {
    setImagesVal([url]);
    setShowImagesModal(true);
  };

  // Function to open non-image file in a new tab
  const openFileInNewTab = (url) => {
    window.open(url, "_blank");
  };

  // Handle arrow click to preview the attachment
  const handleArrowClick = (url) => {
    console.log("rullllll", url)
    if (document) {
      const fileExtension = getFileExtension(document.name); // Extract file extension

      if (imageExtensions.includes(fileExtension)) {
        showImagePopup(document.url); // Show image preview if it's an image file
      } else {
        openFileInNewTab(document.url); // Open non-image file in a new tab
      }
    }
  };

  // Function to extract file extension
  const getFileExtension = (fileName) => {
    return fileName?.split(".").pop().toLowerCase();
  };

  return (
    <div>
      <p className="sfdjklsd1xs2w4" style={{ marginLeft: "5px" }}>
        {document?.url ? (
          <span
            style={{ cursor: "pointer" }}
            onClick={handleArrowClick} // Preview or open the attachment
          >
            <MdArrowOutward />
          </span>
        ) : (
          "-"
        )}
      </p>

      {showImagesModal && (
        <div className="mainxpopups2">
          <div className="popup-content02">
            <span
              className="close-button02"
              onClick={() => setShowImagesModal(false)}
            >
              <RxCross2 />
            </span>
            <img
              src={imagesVal[0]}
              alt="Attachment"
              height={500}
              width={500}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const AttachmentPreview5 = ({ document }) => {

  const [showImagesModal, setShowImagesModal] = useState(false);
  const [imagesVal, setImagesVal] = useState([]);
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]; // Supported image file extensions

  // Function to handle image popup
  const showImagePopup = (url) => {
    setImagesVal([url]);
    setShowImagesModal(true);
  };

  // Function to open non-image file in a new tab
  const openFileInNewTab = (url) => {
    window.open(url, "_blank");
  };

  // Handle arrow click to preview the attachment
  const handleArrowClick = (item) => {

    if (item) {
      const fileExtension = getFileExtension(item?.name); // Extract file extension

      if (imageExtensions.includes(fileExtension)) {
        showImagePopup(item?.url); // Show image preview if it's an image file
      } else {
        openFileInNewTab(item?.url); // Open non-image file in a new tab
      }
    }
  };

  // Function to extract file extension
  const getFileExtension = (fileName) => {
    return fileName.split(".").pop().toLowerCase();
  };
  const documentData = document ? JSON.parse(document) : "-";
  return (
    <div>
      <p className="sfdjklsd1xs2w4" style={{ marginLeft: "5px" }}>
        {documentData?.map((item, index) => (
          <span
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => handleArrowClick(item)}
          >
            <MdArrowOutward />
          </span>
        ))}
      </p>

      {showImagesModal && (
        <div className="mainxpopups2">
          <div className="popup-content02">
            <span
              className="close-button02"
              onClick={() => setShowImagesModal(false)}
            >
              <RxCross2 />
            </span>
            <img
              src={imagesVal[0]}
              alt="Attachment"
              height={500}
              width={500}
            />
          </div>
        </div>
      )}
    </div>
  );
};
