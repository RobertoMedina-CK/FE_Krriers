import axios from "./libs/axios";

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const login = async (nombre, password) => {
  const bodyCarga = {
    nombre: nombre,
    password: password,
  };
  const response = await axios.post(`/cajerosauth`, bodyCarga);
  console.log(response);
  localStorage.setItem("user", JSON.stringify(response.data));
  if (response.data && response.data.length > 0) {
    return response.data;
  }
};

const logout = () => {
  localStorage.removeItem("user");
  if (localStorage.getItem("user")) {
    //check something in local storage so you can know
    // if you should reload or not
    //window.location.√();
  }
  return "you were logout";
};

export { getCurrentUser, login, logout };
