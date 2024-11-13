import React from "react";
import Lottie from "react-lottie";
import loadingAnimationData from "../../assets/animations/loader.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      hideOnTransparent: true,
    },
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isClickToPauseDisabled
      />
    </div>
  );
};

export default Loader;
