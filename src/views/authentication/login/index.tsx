import Login from "./Login";

const LoginMain = () => {
  return (
    <>
      <div className="">
        <div className="tw-flex tw-flex-col lg:tw-flex-row">
          <div className="tw-hidden lg:tw-flex lg:tw-items-center lg:tw-p-2 lg:tw-w-2/3 lg:tw-bg-[#4d4bc0]">
            <div className="tw-px-9 tw-space-y-5 tw-text-white 2xl:tw-px-20 3xl:tw-px-40 4xl:tw-px-52">
              <div className="tw-text-[68px] tw-leading-[80px] tw-tracking-[3.4px] tw-text-6xl tw-font-bold">
                B2B Contact Data at Your Fingertips
              </div>
              <p className="tw-text-[25px] tw-leading-[38px]">
                Get access to your prospect's phone number and email via our
                Google Chrome extension, instantly. Convert leads with real data
                and save time.
              </p>
            </div>
          </div>
          <div className="lg:tw-w-1/2">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginMain;
