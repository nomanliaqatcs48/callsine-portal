const Spinner = () => {
  return (
    <div className="tw-p-4 tw-relative tw-w-full h-50vh-minus-100 tw-z-50">
      {/* Your content here */}

      <div className="tw-absolute tw-top-3/4 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2">
        <div className="tw-border-4 tw-border-gray-200 tw-rounded-full tw-w-12 tw-h-12 tw-animate-spin"></div>
        <div className="tw-border-t-4 tw-border-blue-500 tw-rounded-full tw-w-12 tw-h-12 tw-animate-spin tw-absolute tw-top-0 tw-left-0"></div>
        <p className="tw-text-center tw-mt-16">Loading...</p>
      </div>
    </div>
  );
};

export default Spinner;
