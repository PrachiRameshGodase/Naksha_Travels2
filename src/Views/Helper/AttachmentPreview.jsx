import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import ImagesCrou from "../../Components/ShowImageCarousel.jsx/ImagesCrou";

// Supported file extensions for images
const imageExtensions = ["jpg", "jpeg", "png", "gif"];

// Helper function to get the file extension
const getFileExtension = (fileName) => fileName.split(".").pop().toLowerCase();

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

const AttachmentPreview = ({ attachments }) => {
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [imagesVal, setImagesVal] = useState([]);
  const [showAttachmentPreviews, setShowAttachmentPreviews] = useState(false); // New state for toggling previews

  // Function to handle image popup
  const showImagePopup = (url) => {
    setImagesVal([url]);
    setShowImagesModal(true);
  };

  // Function to open non-image file in a new tab
  const openFileInNewTab = (url) => {
    console.log("Opening file in new tab:", url); // Debugging log
    window.open(url, "_blank");
  };

  return (
    <div>
      <p className="sfdjklsd1xs2w4" style={{ marginLeft: "5px" }}>
        {attachments?.length >= 1 ? (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setShowAttachmentPreviews(!showAttachmentPreviews)}
          >
            <MdArrowOutward />
          </span>
        ) : (
          "-"
        )}
      </p>
      {showAttachmentPreviews && ( // Conditionally render previews
        <div className="attachment-previews">
          {attachments?.map((file, index) =>
            renderFilePreview(file, index, showImagePopup, openFileInNewTab)
          )}
        </div>
      )}
      {showImagesModal && (
        <ImagesCrou
          images={imagesVal}
          onClose={() => setShowImagesModal(false)}
        />
      )}
    </div>
  );
};

export default AttachmentPreview;
