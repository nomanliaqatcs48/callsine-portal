export const devLog = (callback: any) => {
  if (process.env.NODE_ENV === "development") {
    callback();
  }
};

export const devLogError = (...data: any) => {
  if (process.env.NODE_ENV === "development") {
    console.error(data);
  }
};
