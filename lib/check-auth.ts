import Cookie from "js-cookie";

export const checkAuth = () => {
  const token = Cookie.get("student-token");
  return !!token;
};
