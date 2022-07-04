import React from "react";
import * as loading from "../../../assets/json/loading.json";
import Lottie from "react-lottie";

export const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed inset-0 w-full h-full z-[999999] bg-white flex items-center justify-center">
      {/* <Lottie options={defaultOptions} height={400} width={400} /> */}
      <img
        className="animate-spin b-loading"
        src="/loading.jpeg"
        style={{
          width: 400,
          height: 400,
          borderRadius: 9999,
        }}
      />
    </div>
  );
};
