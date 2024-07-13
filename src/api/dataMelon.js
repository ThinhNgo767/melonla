import axios from "axios";

export const url_api_users = process.env.REACT_APP_API_USERS_URL;
export const url_api_melon = process.env.REACT_APP_API_MELON_URL;

export const fetchDataMelon = async () => {
  await axios
    .get(url_api_melon)
    .then((res) => {
      sessionStorage.setItem("dataMelon", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.error(err);
    });
};

export const saveDataMelon = async (data) => {
  axios
    .post(url_api_melon, data)
    .then(() => {
      fetchDataMelon();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deleteDataMelon = async (id) => {
  await axios
    .delete(`${url_api_melon}${id}`)
    .then(() => {
      fetchDataMelon();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const updateDataMelon = async (id, data) => {
  await axios
    .put(`${url_api_melon}${id}`, data)
    .then(() => {
      fetchDataMelon();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const creatNewUser = async (data) => {
  axios
    .post(url_api_users, data)
    .then(() => {
      alert("Created success!");
    })
    .catch((err) => {
      console.error(err);
    });
};
export const updatePassword = async (id, data) => {
  await axios
    .put(`${url_api_users}${id}`, data)
    .then(() => {
      console.log("Hoàn tất");
    })
    .catch((err) => {
      console.error(err);
    });
};
