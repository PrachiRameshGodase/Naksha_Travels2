import React, { useRef, useState, useEffect } from "react";
import { otherIcons } from "../SVGIcons/ItemsIcons/Icons";
import { BsEye } from "react-icons/bs";
import { v4 } from "uuid";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { OverflowHideBOdy } from "../../../Utils/OverflowHideBOdy";
import { imageDB } from "../../../Configs/Firebase/firebaseConfig";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const ImageUpload = ({
  formData,
  setFormData,
  setFreezLoadingImg,
  imgLoader,
  setImgeLoader,
  component,
  type,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files?.length === 0) return;
    setFreezLoadingImg(true);
    setImgeLoader(true);
    const imageRef = ref(imageDB, `ImageFiles/${v4()}`);
    uploadBytes(imageRef, e.target.files[0])
      .then(() => {
        setImgeLoader("success");
        setFreezLoadingImg(false);
        getDownloadURL(imageRef)?.then((url) => {
          if (component === "purchase") {
            setFormData({
              ...formData,
              upload_image: url,
            });
          } else if (component === "expense") {
            setFormData({
              ...formData,
              document: url,
            });
          } else {
            setFormData({
              ...formData,
              image_url: url,
            });
          }
        });
      })
      .catch((error) => {
        setFreezLoadingImg(false);
        setImgeLoader("fail");
      });
  };

  const showimagepopup = () => {
    OverflowHideBOdy(true); // Set overflow hidden
    setShowPopup(true); // Show the popup
  };

  return (
    <>
      <div className="form-group">
        {type === "grm" ? "" : <label>Attach Files To Estimate</label>}
        <div
          className="file-upload"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              const input = document.getElementById("file");
              input.click();
            }
          }}
        >
          <input
            type="file"
            name="image_url"
            id="file"
            className="inputfile"
            accept="image/*"
            onChange={handleImageChange}
          />

          <label htmlFor="file" tabIndex="0" className="file-label">
            <div id="spc5s6">
              {otherIcons.export_svg}
              {formData?.image_url === null || formData?.image_url == 0
                ? "Browse Files"
                : ""}
            </div>
          </label>

          {formData?.image_url ? (
            <>
              {imgLoader === "success" &&
              formData?.image_url !== null &&
              formData?.image_url !== "0" ? (
                <label
                  className="imageviewico656s"
                  htmlFor=""
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="View Item Image"
                  onClick={showimagepopup}
                >
                  <BsEye />
                </label>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              {imgLoader === "success" &&
              formData?.upload_image !== null &&
              formData?.upload_image !== "0" ? (
                <label
                  className="imageviewico656s"
                  htmlFor=""
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="View Item Image"
                  onClick={showimagepopup}
                >
                  <BsEye />
                </label>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="mainxpopups2" ref={popupRef}>
          <div className="popup-content02">
            <span
              className="close-button02"
              onClick={() => setShowPopup(false)}
            >
              <RxCross2 />
            </span>
            {component === "purchase" ? (
              <>
                {
                  <img
                    src={formData?.upload_image}
                    name="upload_image"
                    alt=""
                    height={500}
                    width={500}
                  />
                }
              </>
            ) : component === "expense" ? (
              <>
                {
                  <img
                    src={formData?.document}
                    name="document"
                    alt=""
                    height={500}
                    width={500}
                  />
                }
              </>
            ) : (
              <>
                {
                  <img
                    src={formData?.image_url}
                    name="image_url"
                    alt=""
                    height={500}
                    width={500}
                  />
                }
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ImageUpload;

export const MultiImageUpload = ({
  formData,
  setFormData,
  setFreezLoadingImg,
  imgLoader,
  setImgeLoader,
  isUploading,
  setIsUploading,
  setImage,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(""); // State for the selected image URL

  const popupRef = useRef(null);

  const handleImageChange = (e) => {
    setFreezLoadingImg(true);
    setImgeLoader(true);
    setIsUploading(true);

    const updatedUploadDocuments = Array.isArray(formData?.upload_documents)
      ? [...formData.upload_documents]
      : [];

    Promise.all(
      Array.from(e.target.files).map((file) => {
        const imageRef = ref(imageDB, `Documents/${v4()}`);
        return uploadBytes(imageRef, file)
          .then(() => {
            return getDownloadURL(imageRef)?.then((url) => {
              updatedUploadDocuments.push({
                name: file.name,
                [updatedUploadDocuments?.length + 1]: url,
              });
            });
          })
          .catch((error) => {
            setFreezLoadingImg(false);
            setImgeLoader("fail");
            setIsUploading(false);
            throw error;
          });
      })
    )
      .then(() => {
        setImgeLoader("success");
        setFreezLoadingImg(false);
        setFormData({
          ...formData,
          upload_documents: updatedUploadDocuments,
        });
        setIsUploading(false);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        setIsUploading(false);
      });
  };

  const showimagepopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    OverflowHideBOdy(true); // Set overflow hidden
    setShowPopup(true); // Show the popup
  };

  const handleDeleteImage = (imageUrl) => {
    const updatedUploadDocuments = formData?.upload_documents?.filter(
      (image) => image !== imageUrl
    );
    setFormData({
      ...formData,
      upload_documents: updatedUploadDocuments,
    });
  };

  return (
    <>
      <div className="form-group">
        <label style={{ marginLeft: "2px" }}>Upload Images/Documents</label>
        <div
          className="file-upload"
          tabIndex="0"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              const input = document.getElementById("file");
              input.click();
            }
          }}
        >
          <input
            type="file"
            name="image_url"
            id="file"
            className="inputfile"
            onChange={handleImageChange}
            multiple
          />
          <label htmlFor="file" className="file-label">
            <div id="spc5s6">
              {otherIcons.export_svg}
              {formData?.upload_documents?.length
                ? `${formData.upload_documents?.length} Images Uploaded`
                : "Browse Files"}
            </div>
          </label>
        </div>

        {setImage &&
          imgLoader === "success" &&
          formData?.upload_documents &&
          formData?.upload_documents?.length > 0 && (
            <div>
              {formData?.upload_documents?.map((image, index) => (
                <div key={index}>
                  <div id="Show_delete_img_new_vendor">
                    <>{image.name}</>
                    <div onClick={() => handleDeleteImage(image)}>
                      <MdOutlineDeleteForever />
                      Delete
                    </div>
                    <div
                      onClick={() => showimagepopup(Object.values(image)[0])}
                    >
                      <FaEye />
                      Show
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>

      {showPopup && (
        <div className="mainxpopups2" ref={popupRef}>
          <div className="popup-content02">
            <span
              className="close-button02"
              onClick={() => setShowPopup(false)}
            >
              <RxCross2 />
            </span>
            <img
              src={selectedImage}
              alt="Selected Image"
              height={500}
              width={500}
            />
          </div>
        </div>
      )}
    </>
  );
};

export const MultiImageUploadHelp = ({
  formData,
  setFormData,
  setFreezLoadingImg,
  imgLoader,
  setImgeLoader,
  // isUploading,
  // setIsUploading,
  // setImage,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(""); // State for the selected image URL

  const popupRef = useRef(null);

  const handleImageChange = (e) => {
    setFreezLoadingImg(true);
    setImgeLoader(true);
    // setIsUploading(true);

    const updatedUploadDocuments = Array.isArray(formData?.upload_documents)
      ? [...formData.upload_documents]
      : [];

    Promise.all(
      Array.from(e.target.files).map((file) => {
        const imageRef = ref(imageDB, `Documents/${v4()}`);
        return uploadBytes(imageRef, file)
          .then(() => {
            return getDownloadURL(imageRef)?.then((url) => {
              updatedUploadDocuments.push({
                url: url,
                name: file.name,
              });
            });
          })
          .catch((error) => {
            setFreezLoadingImg(false);
            setImgeLoader("fail");
            // setIsUploading(false);
            throw error;
          });
      })
    )
      .then(() => {
        setImgeLoader("success");
        setFreezLoadingImg(false);
        setFormData({
          ...formData,
          upload_documents: updatedUploadDocuments,
        });
        // setIsUploading(false);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        // setIsUploading(false);
      });
  };

  const showimagepopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    OverflowHideBOdy(true); // Set overflow hidden
    setShowPopup(true); // Show the popup
  };

  const handleDeleteImage = (imageUrl) => {
    const updatedUploadDocuments = formData?.upload_documents?.filter(
      (image) => image !== imageUrl
    );
    setFormData({
      ...formData,
      upload_documents: updatedUploadDocuments,
    });
  };

  return (
    <>
      <div className="form-group">
        <label style={{ marginLeft: "2px" }}>Upload Images/Documents</label>
        <div
          className="file-upload"
          tabIndex="0"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              const input = document.getElementById("file");
              input.click();
            }
          }}
        >
          <input
            type="file"
            name="image_url"
            id="file"
            className="inputfile"
            onChange={handleImageChange}
            multiple
          />
          <label htmlFor="file" className="file-label">
            <div id="spc5s6">
              {otherIcons.export_svg}
              {formData?.upload_documents?.length
                ? `${formData.upload_documents?.length} Images Uploaded`
                : "Browse Files"}
            </div>
          </label>
        </div>

        {imgLoader === "success" &&
          formData?.upload_documents &&
          formData?.upload_documents?.length > 0 && (
            <div>
              {formData?.upload_documents?.map((image, index) => (
                <div key={index}>
                  <div id="Show_delete_img_new_vendor">
                    <p style={{ width: "50%" }} title={image?.name || ""}>
                      {image?.name?.length > 20
                        ? `${image?.name.substring(0, 20)}...`
                        : image?.name}
                    </p>

                    <div onClick={() => handleDeleteImage(image)}>
                      <MdOutlineDeleteForever />
                      {/* Delete */}
                    </div>
                    <div
                      onClick={() => showimagepopup(Object.values(image)[0])}
                    >
                      <FaEye />
                      {/* Show */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>

      {showPopup && (
        <div
          className="mainxpopups2"
          ref={popupRef}
          style={{ marginTop: "10px" }}
        >
          <div className="popup-content02">
            <span
              className="close-button02"
              onClick={() => setShowPopup(false)}
            >
              <RxCross2 />
            </span>
            <img
              src={selectedImage}
              alt="Selected Image"
              height={500}
              width={500}
            />
          </div>
        </div>
      )}
    </>
  );
};

export const ImageUploadGRN = ({
  formData,
  setFormData,
  setFreezLoadingImg,
  imgLoader,
  setImgeLoader,
  index,
  type,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const popupRef = useRef(null);

  const handleImageChange = (e) => {
    setFreezLoadingImg(true);
    setImgeLoader(true);

    const updatedDocuments = [];

    Promise.all(
      Array.from(e.target.files).map((file) => {
        const imageRef = ref(imageDB, `ImageFiles/${v4()}`);
        return uploadBytes(imageRef, file)
          .then(() => {
            return getDownloadURL(imageRef)?.then((url) => {
              updatedDocuments.push(url);
            });
          })
          .catch((error) => {
            setFreezLoadingImg(false);
            setImgeLoader("fail");
            throw error;
          });
      })
    )
      .then(() => {
        setImgeLoader("success");
        setFreezLoadingImg(false);

        if (type === "grm_charge") {
          const updatedChargesType = formData.charges_type.map((item, i) => {
            if (i === index) {
              return {
                ...item,
                upload_image: [
                  ...(item.upload_image || []),
                  ...updatedDocuments,
                ],
              };
            }
            return item;
          });

          setFormData({
            ...formData,
            charges_type: updatedChargesType,
          });
        } else {
          const updatedItems = formData.items.map((item, i) => {
            if (i === index) {
              return {
                ...item,
                upload_image: [
                  ...(item.upload_image || []),
                  ...updatedDocuments,
                ],
              };
            }
            return item;
          });

          setFormData({
            ...formData,
            items: updatedItems,
          });
        }
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };
  const showImagesPopup = (images) => {
    setCurrentPOP(false);
    setSelectedImages(images);
    OverflowHideBOdy(true); // Set overflow hidden
    setShowPopup(true); // Show the popup
  };

  const item =
    type === "grm_charge"
      ? formData?.charges_type?.[index] || {}
      : formData?.items?.[index] || {};
  const CloseShowDeleteImgIndex = () => {
    setCurrentImageIndex(null);
    setCurrentPOP(false);
  };
  const CloseShowDeleteImg = () => {
    setCurrentPOP(!currentPOP);
    setShowPopup(!showPopup);
  };

  const handleDeleteImage = (imageUrl) => {
    if (item?.upload_image?.length == 1) {
      setCurrentPOP(!currentPOP);
      setShowPopup(!showPopup);
    }
    if (type === "grm_charge") {
      const updatedChargesType = formData.charges_type.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            upload_image: item.upload_image.filter((url) => url !== imageUrl),
          };
        }
        return item;
      });

      setFormData({
        ...formData,
        charges_type: updatedChargesType,
      });
    } else {
      const updatedItems = formData.items.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            upload_image: item.upload_image.filter((url) => url !== imageUrl),
          };
        }
        return item;
      });

      setFormData({
        ...formData,
        items: updatedItems,
      });
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [currentPOP, setCurrentPOP] = useState(false);

  // const popupRef = useRef();

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, setShowPopup]);
  const handleShowImage = (idx) => {
    setCurrentPOP(!currentPOP);
    setCurrentImageIndex(idx);
    // Aap yahan aur actions add kar sakte hain
  };

  return (
    <>
      <div className="form-group">
        <div
          className="file-upload"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              const input = document.getElementById(`file-${index}-${type}`);
              input.click();
            }
          }}
        >
          <input
            type="file"
            name="image_url"
            id={`file-${index}-${type}`}
            className="inputfile"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <label
            htmlFor={`file-${index}-${type}`}
            tabIndex="0"
            className="file-label"
          >
            <div id="spc5s6">
              {otherIcons.export_svg}
              {item?.upload_image?.length
                ? `${item.upload_image?.length} Images Uploaded`
                : "Browse Files"}
            </div>
          </label>

          {imgLoader === "success" && item?.upload_image?.length ? (
            <label
              className="imageviewico656s"
              htmlFor=""
              data-tooltip-id="my-tooltip"
              data-tooltip-content="View Item Images"
              onClick={() => showImagesPopup(item.upload_image)}
            >
              <FaEye />
            </label>
          ) : null}
        </div>
      </div>

      {showPopup && (
        <div
          ref={popupRef}
          id={`${currentPOP ? "ooi6787" : "mainxpopups2"}`}
          style={{ marginLeft: "10%", marginTop: "5%" }}
        >
          <div>
            <span
              id="close-button02"
              className={`close-button02  close_opop  ${
                currentPOP ? "close_opop" : ""
              }`}
              onClick={CloseShowDeleteImg}
            >
              <RxCross2 />
            </span>
            <div>
              {item?.upload_image.map((image, idx) => (
                <div key={idx} id={`${currentPOP ? "mainxpopups2_S" : ""}`}>
                  {currentImageIndex === idx ? (
                    <div className="mainxpopups2">
                      <span
                        className="close-button02"
                        onClick={CloseShowDeleteImgIndex}
                      >
                        <RxCross2 />
                      </span>
                      <img
                        src={image}
                        alt={`Uploaded ${idx}`}
                        style={{ width: "80%", height: "80%" }}
                      />
                      <div>
                        {/* <button onClick={() => setCurrentImageIndex(null)}><RxCross2 /></button> */}
                      </div>
                    </div>
                  ) : (
                    <div id="Show_de_ID">
                      <span onClick={() => handleShowImage(idx)}>
                        {" "}
                        <FaEye /> Show
                      </span>
                      <span onClick={() => handleDeleteImage(image)}>
                        <MdOutlineDeleteForever /> Delete
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const ImageUploadGRNCharge = (props) => (
  <ImageUploadGRN {...props} type="grm_charge" />
);

export const MultiImageUploadEmail = ({
  formData,
  setFormData,
  setFreezLoadingImg,
  imgLoader,
  setImgeLoader,
  setImage,
  pdfUrl,
  isPdfChecked,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [pdfAdded, setPdfAdded] = useState(false); // Track if the PDF has been added

  const popupRef = useRef(null);

  const handleImageChange = (e) => {
    setFreezLoadingImg(true);
    setImgeLoader(true);

    const updatedUploadDocuments = Array.isArray(formData?.upload_documents)
      ? [...formData.upload_documents]
      : [];

    Promise.all(
      Array.from(e.target.files).map((file) => {
        const imageRef = ref(imageDB, `Documents/${v4()}`);
        return uploadBytes(imageRef, file)
          .then(() => {
            return getDownloadURL(imageRef)?.then((url) => {
              updatedUploadDocuments.push({
                name: file.name,
                url: url,
              });
            });
          })
          .catch((error) => {
            setFreezLoadingImg(false);
            setImgeLoader("fail");
            throw error;
          });
      })
    )
      .then(() => {
        setImgeLoader("success");
        setFreezLoadingImg(false);
        setFormData({
          ...formData,
          upload_documents: updatedUploadDocuments,
        });
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  // Function to fetch the PDF blob and upload it to Firebase, but only if isPdfChecked is true
  const uploadPdf = async () => {
    try {
      if (!pdfUrl || !isPdfChecked || pdfAdded) return; // Ensure not to upload if already added or isPdfChecked is false

      setFreezLoadingImg(true);
      setImgeLoader(true);

      // Fetch the blob from the pdfUrl
      const response = await fetch(pdfUrl);
      const blob = await response.blob();

      // Create a file from the blob (name the file accordingly)
      const pdfFile = new File([blob], `document_${v4()}.pdf`, {
        type: blob.type,
      });

      // Upload to Firebase
      const pdfRef = ref(imageDB, `Documents/${v4()}`);
      await uploadBytes(pdfRef, pdfFile);

      // Get the PDF download URL
      const pdfDownloadUrl = await getDownloadURL(pdfRef);

      // Update the formData with the uploaded PDF URL
      const updatedUploadDocuments = Array.isArray(formData?.upload_documents)
        ? [...formData.upload_documents]
        : [];

      updatedUploadDocuments.push({
        name: pdfFile.name,
        url: pdfDownloadUrl,
      });

      setFormData({
        ...formData,
        upload_documents: updatedUploadDocuments,
      });

      setImgeLoader("success");
      setFreezLoadingImg(false);
      setPdfAdded(true); // Mark PDF as added
    } catch (error) {
      console.error("Error uploading PDF:", error);
      setFreezLoadingImg(false);
      setImgeLoader("fail");
    }
  };

  // Function to remove the PDF from the formData when isPdfChecked becomes false
  const removePdf = () => {
    if (!pdfAdded) return; // If no PDF has been added, skip removal

    const updatedUploadDocuments = formData.upload_documents?.filter(
      (doc) => !doc.name.endsWith(".pdf")
    );

    setFormData({
      ...formData,
      upload_documents: updatedUploadDocuments,
    });

    setPdfAdded(false); // Mark PDF as removed
  };

  useEffect(() => {
    // If isPdfChecked becomes true, upload the PDF
    if (isPdfChecked) {
      uploadPdf();
    } else {
      // If isPdfChecked becomes false, remove the previously added PDF
      removePdf();
    }
  }, [isPdfChecked]);

  const handleDeleteImage = (imageUrl) => {
    const updatedDocuments = formData.upload_documents?.filter(
      (doc, index) => index !== imageUrl
    );

    setFormData({
      ...formData,
      upload_documents: updatedDocuments,
    });
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [currentPOP, setCurrentPOP] = useState(false);
  const showImagesPopup = (images) => {
    setCurrentPOP(false);
    setSelectedImages(images);
    OverflowHideBOdy(true); // Set overflow hidden
    setShowPopup(true); // Show the popup
  };
  const handleShowImage = (images) => {
    setCurrentPOP(!currentPOP);
    setCurrentImageIndex(images);
    // Additional actions can be added here
  };
  const CloseShowDeleteImgIndex = () => {
    setCurrentImageIndex(null);
    setCurrentPOP(false);
  };
  const CloseShowDeleteImg = () => {
    setCurrentPOP(!currentPOP);
    setShowPopup(!showPopup);
  };
  const showimage = formData.upload_documents.map((doc) => doc?.url);

  return (
    <>
      <div className="form-group">
        {/* <label style={{ marginLeft: "20px" }}>Upload Images/Documents</label> */}
        <div style={{ display: "flex" }}>
          <div
            className="file-upload"
            tabIndex="0"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                const input = document.getElementById("file");
                input.click();
              }
            }}
          >
            <input
              type="file"
              name="image_url"
              id="file"
              className="inputfile "
              onChange={handleImageChange}
              multiple
              style={{ display: "none" }}
            />
            <label
              htmlFor="file"
              className="filelabelemail"
              id="uploadAttachment"
            >
              {/* <div id="spc5s6" style={{display:"flex",gap:"5px"}}>
                              <div>
                              {otherIcons.export_svg}
                              </div>
                              <div style={{marginTop:"3px"}}>
                              {formData?.upload_documents?.length
                                  ? `${formData.upload_documents?.length} Images Uploaded`
                                  : "Browse Files"}
                                  </div>
              </div>  */}

              <div
                id="spc5s6"
                style={{
                  display: "flex",
                  gap: "5px",
                  padding: "6px",

                  border: "1px solid lightgray", // Light gray border
                  borderRadius: "8px", // Rounded corners
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft box shadow
                }}
              >
                <span
                  style={{ marginTop: "5px", fill: "blue", cursor: "pointer" }}
                >
                  {otherIcons.export_svg}
                </span>

                <div style={{ marginTop: "3px", cursor: "pointer" }}>
                  <h3
                    id="AttachmentHeading"
                    style={{
                      fontWeight: "300",
                      color: "blue",
                      fontSize: "16px",
                    }}
                  >
                    {" "}
                    Attachments {formData?.upload_documents?.length}
                  </h3>
                </div>
              </div>
            </label>
          </div>

          {setImage &&
            imgLoader === "success" &&
            formData?.upload_documents &&
            formData?.upload_documents?.length > 0 && (
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  // marginTop: "15px",
                  // marginLeft: "7px",
                }}
              >
                <label
                  className="imageviewico656s"
                  htmlFor=""
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="View Item Images"
                  onClick={() => {
                    // Extract URLs from the upload_documents array
                    const images = formData.upload_documents.map(
                      (doc) => doc[Object.keys(doc)[0]]
                    );

                    showImagesPopup(images);
                  }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                      color: "#7d6666",
                      padding: "13px 7px",
                      border: "1px solid lightgray",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <FaEye style={{ marginTop: "16px" }} />
                  </span>
                </label>
                {showPopup && (
                  <div
                    ref={popupRef}
                    id={`${currentPOP ? "ooi6787" : "mainxpopups2"}`}
                    style={{
                      top: "22%",
                      left: "140%",
                      marginBottom: "10%",
                      position: `${!currentPOP ? "static" : "absolute"}`,
                      width: "300px",
                    }}
                  >
                    <div>
                      <span
                        id="close-button02"
                        className={`close-button02  close_opop  ${
                          currentPOP ? "close_opop" : ""
                        }`}
                        onClick={CloseShowDeleteImg}
                      >
                        <RxCross2 />
                      </span>
                      <div>
                        {showimage.map((image, idx) => {
                          const imageName =
                            formData.upload_documents[idx]?.name; // Get the actual image name
                          return (
                            <div
                              key={idx}
                              id={`${currentPOP ? "mainxpopups2_S" : ""}`}
                            >
                              {currentImageIndex === idx ? (
                                <div className="mainxpopups2">
                                  <span
                                    className="close-button02"
                                    onClick={CloseShowDeleteImgIndex}
                                  >
                                    <RxCross2 title="Close" />
                                  </span>
                                  <img
                                    src={image}
                                    alt={`Uploaded${idx}`}
                                    style={{ width: "60%", height: "60%" }}
                                  />
                                </div>
                              ) : (
                                <div
                                  id="Show_de_ID"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      marginRight: "2px",
                                      fontSize: "11px",
                                      width: "80%",
                                    }}
                                    title={imageName}
                                  >
                                    {imageName.length > 30
                                      ? `${imageName.substring(0, 30)}...`
                                      : imageName}
                                    {/* {typeof (imageName.length)} */}
                                  </span>{" "}
                                  {/* Display the image name */}
                                  <span
                                    onClick={() => {
                                      const images =
                                        formData.upload_documents.map(
                                          (doc) => doc[Object.keys(doc)[0]]
                                        );
                                      handleShowImage(idx);
                                    }}
                                    style={{ marginTop: "12px" }}
                                  >
                                    {/* <FaEye
                                      title="Show"
                                      style={{
                                        color: "blue",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                      }}
                                    /> */}
                                  </span>
                                  <span
                                    style={{ marginTop: "10px" }}
                                    onClick={() => handleDeleteImage(idx)}
                                  >
                                    <MdOutlineDeleteForever
                                      title="Delete"
                                      style={{
                                        color: "red",
                                        fontSize: "12px",
                                        marginLeft: "-9px",
                                      }}
                                    />
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export const MultiImageUploadDocument = ({
  formData,
  setFormData,
  setFreezLoadingImg,
  imgLoader,
  setImgeLoader,
  index,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(""); // For the popup
  const popupRef = useRef(null);

  // Parse upload_documents if it's a JSON string
  const uploadDocuments = Array.isArray(formData?.upload_documents)
    ? formData?.upload_documents
    : JSON.parse(formData?.upload_documents || "[]");

  const handleImageChange = (e) => {
    setFreezLoadingImg(true);
    setImgeLoader(true);

    const updatedUploadDocuments = [...uploadDocuments]; // Start with existing docs

    Promise.all(
      Array.from(e.target.files).map((file) => {
        const imageRef = ref(imageDB, `Documents/${v4()}`);
        return uploadBytes(imageRef, file)
          .then(() => getDownloadURL(imageRef))
          .then((url) => {
            updatedUploadDocuments.push({
              url: url,
              name: file.name,
            });
          })
          .catch((error) => {
            setFreezLoadingImg(false);
            setImgeLoader("fail");
            console.error("Upload error:", error);
          });
      })
    )
      .then(() => {
        setImgeLoader("success");
        setFreezLoadingImg(false);
        // Update the formData with stringified JSON
        setFormData(index, {
          ...formData,
          upload_documents: JSON.stringify(updatedUploadDocuments),
        });
      })
      .catch((error) => console.error("Error in uploads:", error));
  };

  const handleDeleteImage = (imageUrl) => {
    const updatedUploadDocuments = uploadDocuments.filter(
      (image) => image.url !== imageUrl
    );

    setFormData(index, {
      ...formData,
      upload_documents: JSON.stringify(updatedUploadDocuments),
    });
  };

  const showImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    OverflowHideBOdy(true); // Hide body scroll
    setShowPopup(true);
  };

  return (
    <>
      <div className="form-group">
        <label>Upload Images/Documents</label>
        <div className="file-upload" tabIndex="0">
          <input
            type="file"
            id={`file_${index}`}
            className="inputfile"
            onChange={handleImageChange}
            multiple
          />
          <label htmlFor={`file_${index}`} className="file-label">
            <div id="spc5s6">
              {uploadDocuments.length ? (
                `${uploadDocuments.length} Images Uploaded`
              ) : (
                <>{otherIcons.export_svg} Browse Files</>
              )}
            </div>
          </label>
        </div>

        {/* Render uploaded documents */}
        {imgLoader === "success" &&
          uploadDocuments.map((image, idx) => (
            <div key={idx} id="Show_delete_img_new_vendor">
              <p style={{ width: "50%" }} title={image?.name || ""}>
                {image?.name?.length > 20
                  ? `${image?.name.substring(0, 20)}...`
                  : image?.name}
              </p>

              <div onClick={() => handleDeleteImage(image.url)}>
                <MdOutlineDeleteForever />
              </div>
              <div onClick={() => showImagePopup(image.url)}>
                <FaEye />
              </div>
            </div>
          ))}
      </div>

      {/* Popup for viewing images */}
      {showPopup && (
        <div
          className="mainxpopups2"
          ref={popupRef}
          style={{ marginTop: "10px" }}
        >
          <div className="popup-content02">
            <span
              className="close-button02"
              onClick={() => setShowPopup(false)}
            >
              <RxCross2 />
            </span>
            <img
              src={selectedImage}
              alt="Selected Image"
              height={500}
              width={500}
            />
          </div>
        </div>
      )}
    </>
  );
};

export const SingleImageUploadDocument = ({
  formData,
  setFormData,
  setFreezLoadingImg,
  imgLoader,
  setImgeLoader,
  index,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(""); // For the popup
  const popupRef = useRef(null);

  // Parse photo if it's a JSON string
  const photo = formData?.photo ? JSON.parse(formData?.photo || "{}") : null;

  const handleImageChange = (e) => {
    if (e.target.files.length === 0) return;

    const file = e.target.files[0];
    setFreezLoadingImg(true);
    setImgeLoader(true);

    const imageRef = ref(imageDB, `Documents/${v4()}`);
    uploadBytes(imageRef, file)
      .then(() => getDownloadURL(imageRef))
      .then((url) => {
        const updatedPhoto = {
          url: url,
          name: file.name,
        };

        setFormData(index, {
          ...formData,
          photo: JSON.stringify(updatedPhoto),
        });
        setImgeLoader("success");
        setFreezLoadingImg(false);
      })
      .catch((error) => {
        setFreezLoadingImg(false);
        setImgeLoader("fail");
        console.error("Upload error:", error);
      });
  };

  const handleDeleteImage = () => {
    setFormData(index, {
      ...formData,
      photo: JSON.stringify(null),
    });
  };

  const showImagePopup = () => {
    if (photo?.url) {
      setSelectedImage(photo.url);
      OverflowHideBOdy(true); // Hide body scroll
      setShowPopup(true);
    }
  };

  return (
    <>
      <div className="form-group" style={{ width: "202px" }}>
        <div
          className="file-upload"
          tabIndex="0"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              const input = document.getElementById("file");
              input.click();
            }
          }}
        >
          <input
            type="file"
            name="image_url"
            id="file"
            className="inputfile"
            onChange={handleImageChange}
            multiple
            style={{ display: "none" }}
          />
          <label
            htmlFor="file"
            className="filelabelemail"
            id="uploadAttachment"
          >
            <div
              id="spc5s6"
              style={{
                display: "flex",
                gap: "5px",
                padding: "6px",
                border: "1px solid lightgray", // Light gray border
                borderRadius: "8px", // Rounded corners
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft box shadow
              }}
            >
              {/* Conditionally render the export icon only if photo is not present */}
              {!photo?.url && (
                <span
                  style={{ marginTop: "5px", fill: "blue", cursor: "pointer" }}
                >
                  {otherIcons.export_svg}
                </span>
              )}

              <div
                style={{ marginTop: "3px", cursor: "pointer", display: "flex" }}
              >
                <h3
                  id="AttachmentHeading"
                  style={{
                    fontWeight: "300",
                    color: "blue",
                    fontSize: "16px",
                  }}
                >
                  <p
                    title={photo?.name || "No file selected"} // Full name shown on hover
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      marginLeft: !photo?.url ? "24px" : "0",

                      textOverflow: "ellipsis",
                      maxWidth: "140px", // Limit the width for truncation
                    }}
                  >
                    {photo?.name?.length > 20
                      ? `${photo.name.substring(0, 20)}...`
                      : photo?.name || "No file selected"}
                  </p>
                </h3>
              </div>
              {imgLoader === "success" && photo && (
                <div
                  id="Show_delete_img_new_vendor"
                  style={{ display: "flex", gap: "2px" }}
                >
                  <div
                    onClick={handleDeleteImage}
                    style={{ cursor: "pointer" }}
                  >
                    <MdOutlineDeleteForever />
                  </div>
                  <div onClick={showImagePopup} style={{ cursor: "pointer" }}>
                    <FaEye />
                  </div>
                </div>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Popup for viewing photo */}
      {showPopup && (
        <div
          className="mainxpopups2"
          ref={popupRef}
          style={{ marginTop: "10px" }}
        >
          <div className="popup-content02">
            <span
              className="close-button02"
              onClick={() => setShowPopup(false)}
            >
              <RxCross2 />
            </span>
            <img
              src={selectedImage}
              alt="Selected Photo"
              height={500}
              width={500}
            />
          </div>
        </div>
      )}
    </>
  );
};
