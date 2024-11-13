import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import styles from "../../style/virtualCard.module.css";
import toast from "react-hot-toast";
import { useGetMemberByIdQuery } from "../../store/api/memberAPI";
import Loader from "./loader";
import { toJpeg } from "html-to-image";
import profilepic from "../../assets/images/virtual-card-profile-img.svg";
import TextWrapper from "./TextWrapper";
import { MdFileDownload, MdOutgoingMail } from "react-icons/md";
import { formatDate } from "../../config/FormattedDate";

function VirtualCard({ onModal, data }) {
  const [open, setOpen] = useState(true);
  const frontendRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const {
    data: virtualData,
    isLoading: virtualCardLoading,
  } = useGetMemberByIdQuery({
    memberId: data._id,
  });

  useEffect(() => {
    if (isLoading) {
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(oldProgress + 10, 100);
        });
      }, 200);
    } else {
      setLoadingProgress(0);
    }
  }, [isLoading]);

  if (virtualCardLoading) return <Loader />;

  const handleAction = async (action) => {
    try {
      setIsLoading(true);
      const frontImage = await toJpeg(frontendRef.current, {
        quality: 1,
      });

      if (action === "download") {
        const a = document.createElement("a");
        a.href = frontImage;
        a.download = "virtual-card.jpg";
        a.click();
        toast.success("Image downloaded successfully.");
      } else if (action === "send-email") {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/member/send-card-email`,
          { frontImage, email: virtualData.data.email }
        );

        if (response.status === 200) {
          toast.success("Email sent successfully.", {
            duration: 2000,
            position: "top-center",
          });
        } else {
          toast.error("Failed to send email.", {
            duration: 2000,
            position: "top-center",
          });
        }
      }
    } catch (error) {
      toast.error(
        `Failed to ${
          action === "send-email" ? "send email" : "download image"
        }.`,
        {
          duration: 2000,
          position: "top-center",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingIndicator progress={loadingProgress} />}
      {open && (
        <div
          className={styles.cardOverlay}
          onClick={(e) => {
            setOpen(false);
            onModal();
          }}
        >
          <div
            className={styles.cardContainer}
            onClick={(e) => {
              e.stopPropagation();
            }}
            ref={frontendRef}
          >
            <div className={styles.cardHeader}></div>
            <div className={styles.cardBody}>
              <div className={styles.image}>
                <img
                  draggable="false"
                  src={virtualData.data.image.url || profilepic}
                  alt="profile picture"
                />
                <p className={styles.memberId}>Member ID</p>
                <p className={styles.memberIdValue}>{virtualData.data._id}</p>
              </div>
              <div className={styles.data}>
                <TextWrapper label="Name">
                  {virtualData.data.firstname +
                    " " +
                    virtualData.data.lastname || "N/A"}
                </TextWrapper>
                <TextWrapper label="Email">
                  {virtualData.data.email || "N/A"}
                </TextWrapper>
                <TextWrapper label="Mobile">
                  {virtualData.data.mobileNumber || "N/A"}
                </TextWrapper>
                <TextWrapper label="Address">
                  {virtualData.data.address || "N/A"}
                </TextWrapper>
                <TextWrapper className="w-48" label="Organization">
                  {virtualData.data.organization || "N/A"}
                </TextWrapper>
                <TextWrapper label="Valid Upto" className="text-blue-700">
                  {formatDate(virtualData.data.expiryTime.split("T")[0]) ||
                    "N/A"}
                </TextWrapper>
              </div>
            </div>
            <img
              draggable="false"
              src={virtualData.qrCode}
              className={styles.cardQR}
            ></img>
            <div className={styles.buttonContainer}>
              <button
                className={styles.btn}
                onClick={() => handleAction("download")}
              >
                Download
                <MdFileDownload size={18} />
              </button>
              <button
                className={styles.btn}
                onClick={() => handleAction("send-email")}
              >
                Send to mail
                <MdOutgoingMail size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const LoadingIndicator = ({ progress }) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-[10000] flex items-center justify-center">
    <div className="w-full max-w-screen-sm rounded-md h-2 bg-gray-300 fixed">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      <h4
        className={`text-white text-center font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          progress === 100 ? "opacity-0" : "opacity-100"
        }`}
      >
        {progress === 100
          ? "Please wait while we process your request."
          : "Processing your request."}
      </h4>
    </div>
  </div>
);

export default VirtualCard;
