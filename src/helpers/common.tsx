export const getExtension = (path: any) => {
  let basename = path?.split(/[\\/]/).pop(),
    pos = basename?.lastIndexOf(".");

  if (basename === "" || pos < 1) return "";

  return basename?.slice(pos + 1);
};
