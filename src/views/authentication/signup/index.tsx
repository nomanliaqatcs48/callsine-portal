import React from "react";
import Register from "./Register";
import imageBgc from "../../../assets/images/users/Group3.png";
import imageBgcTop from "../../../assets/images/users/Rectangle1.png";

const index = () => {
  return (
    <>
      <div className="">
        <div className="tw-flex tw-flex-col lg:tw-flex-row">
          <div
            className="tw-hidden tw-relative lg:tw-flex lg:tw-items-center lg:tw-w-2/3"
            style={{ position: "relative", height: "100vh" }}
          >
            <img
              className="h-auto max-w-full"
              src={imageBgc}
              alt="description"
              style={{
                position: "absolute",
                zIndex: "999",
                height: "100vh",
                width: "100%",
                mixBlendMode: "overlay",
              }}
            />
            <img
              className="h-auto max-w-full"
              src={imageBgcTop}
              alt="description"
              style={{ position: "absolute", height: "100vh", width: "100%" }}
            />
            <div
              className="tw-px-9 tw-space-y-5 tw-text-white 2xl:tw-px-20 3xl:tw-px-40 4xl:tw-px-52"
              style={{ position: "relative", zIndex: "999999" }}
            >
              <div className="tw-text-[68px] tw-font-bold tw-tracking-[3.4px] tw-leading-[80px]">
                B2B Contact Data at Your Fingertips
              </div>
              <p className="tw-text-[25px] tw-leading-[38px]">
                Get access to your prospects’ phone number and email via our
                Google Chrome extension, instantly. Convert leads with real data
                and save time.
              </p>
            </div>
          </div>
          <div className="lg:tw-w-1/2">
            <Register />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
