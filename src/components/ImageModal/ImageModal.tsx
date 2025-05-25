import Modal from "react-modal";
import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const modalStyles = {
  content: {
    width: "80vw",
    height: "80vh",
    padding: "10px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#fff",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000,
  },
};
type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
};
const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src,
  alt,
}) => {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel="Image Preview Modal"
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "6px 10px",
          background: "transparent",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "24px",
          color: "#333",
        }}
      >
        <IoMdClose />
      </button>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
