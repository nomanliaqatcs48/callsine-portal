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
    _body_loader.remove();
  }
};
