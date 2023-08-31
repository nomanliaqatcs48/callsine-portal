export const insertBodyLoader = () => {
  let _body: any = document.querySelector("body");
  let _root: any = document.querySelector("#root");
  if (_body) {
    _body.classList.toggle("tw-overflow-hidden");
    if (_root) {
      _root.insertAdjacentHTML(
        "afterbegin",
        '<div id="body-loader" class="tw-h-full tw-w-full tw-flex tw-justify-center tw-items-center tw-z-[9999] tw-bg-white tw-opacity-60 tw-fixed tw-overflow-hidden">' +
          '<div class="tw-w-[40px] tw-h-[40px]">' +
          '<svg class="tw-block tw-animate-spin" viewBox="22 22 44 44">' +
          '<circle style="stroke: #1976d2;stroke-dasharray: 80px,200px;stroke-dashoffset: 0;-webkit-animation: animation-1p2h4ri 1.4s ease-in-out infinite;animation: animation-1p2h4ri 1.4s ease-in-out infinite;" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>' +
          "</svg></div></div>"
      );
    }
  }
};

export const removeBodyLoader = () => {
  let _body: any = document.querySelector("body");
  let _body_loader: any = document.querySelector("#body-loader");
  if (_body) {
    _body.classList.toggle("tw-overflow-hidden");
    if (_body_loader) {
      _body_loader.remove();
    }
  }
};

export const SmallSpinner = () => {
  return (
    <div className="tw-items-center tw-justify-center tw-flex">
      <svg
        className="tw-w-5 tw-h-5 tw-text-blue-400 tw-animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="tw-opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="tw-opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3.02 7.938l1.984-1.647z"
        ></path>
      </svg>
    </div>
  );
};
