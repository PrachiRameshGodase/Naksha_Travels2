import React, { useEffect, useState } from "react";
import { Modal, Container } from "react-bootstrap";
import "./ImageCrou.scss";

const ImagesCrou = ({ images, showModal, closeModal }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleClose = () => {
        closeModal(false);
        scrollToTop();
    };

    const loadBootstrapResources = () => {
        const bootstrapStylesheet = document.createElement("link");
        bootstrapStylesheet.rel = "stylesheet";
        bootstrapStylesheet.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
        document.head.appendChild(bootstrapStylesheet);

        const bootstrapScript = document.createElement("script");
        bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
        bootstrapScript.integrity = "sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz";
        bootstrapScript.crossOrigin = "anonymous";
        document.body.appendChild(bootstrapScript);

        return { bootstrapStylesheet, bootstrapScript };
    };

    const cleanupBootstrapResources = ({ bootstrapStylesheet, bootstrapScript }) => {
        document.head.removeChild(bootstrapStylesheet);
        document.body.removeChild(bootstrapScript);
    };

    useEffect(() => {
        let resources;
        if (showModal) {
            resources = loadBootstrapResources();
        }
        return () => {
            if (resources) {
                cleanupBootstrapResources(resources);
            }
        };
    }, [showModal]);

    const getFileType = (url) => {
        const extension = url.split(".").pop().toLowerCase();
        if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) return "image";
        if (["mp4", "webm", "ogg"].includes(extension)) return "video";
        if (["mp3", "wav", "aac"].includes(extension)) return "audio";
        if (["pdf"].includes(extension)) return "pdf";
        return "other";
    };

    return (
        <>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                fullscreen
            >
                <Modal.Header closeButton className="custom-close-btn" style={{ borderBottom: "none" }}></Modal.Header>
                <Modal.Body>
                    <Container>
                        <div className="row">
                            <div id="colOfthhs" className="col">
                                <div className="gallery">
                                    {images?.map((file, index) => {
                                        const fileType = getFileType(file);
                                        const fileName = file.split("/").pop();
                                        return (
                                            <a key={index} href={file} target="_blank" rel="noopener noreferrer">
                                                {fileType === "image" ? (
                                                    <img src={file} alt={fileName} className="thumbnail" />
                                                ) : fileType === "video" ? (
                                                    <div className="thumbnail video-file">📹 Video Preview</div>
                                                ) : fileType === "audio" ? (
                                                    <div className="thumbnail audio-file">🎵 Audio Preview</div>
                                                ) : fileType === "pdf" ? (
                                                    <div className="thumbnail pdf-file">📄 PDF Preview</div>
                                                ) : (
                                                    <div className="thumbnail other-file">📁 File Preview</div>
                                                )}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ImagesCrou;
