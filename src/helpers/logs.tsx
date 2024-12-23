export const devLog = (callback: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log("A dev log in next line");
    callback();
  }
};

export const devLogError = (callback: any) => {
  if (process.env.NODE_ENV === "development") {
    console.group("error");
    callback();
    console.groupEnd();
  }
};
