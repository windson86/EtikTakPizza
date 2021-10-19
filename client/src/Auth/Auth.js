export const isUserAuth = () => {
  return window.localStorage.getItem("token") !== null;
};
