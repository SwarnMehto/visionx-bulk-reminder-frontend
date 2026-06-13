export const getUser = () => {
  if (typeof window === "undefined") return {};

  const data = localStorage.getItem("user");

  try {
    return data ? JSON.parse(data) : {};
  } catch (err) {
    localStorage.removeItem("user");
    return {};
  }
};

export const updateUser = (data) => {
  if (typeof window === "undefined") return;

  const safeData =
    typeof data === "string" ? { name: data } : data;

  localStorage.setItem("user", JSON.stringify(safeData));
  return safeData;
};