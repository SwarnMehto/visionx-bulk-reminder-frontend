export const loginUser = (email) => {
  localStorage.setItem("user", JSON.stringify({ email }));
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};