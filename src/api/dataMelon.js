import axios from "axios";

export const URL_API = "https://668026f656c2c76b495b4f16.mockapi.io/melon/";
export const URL_API_USERS =
  "https://668026f656c2c76b495b4f16.mockapi.io/users/";
export const fetchDataMelon = async () => {
  await axios
    .get(URL_API)
    .then((res) => {
      sessionStorage.setItem("dataMelon", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.error(err);
    });
};

export const saveDataMelon = async (data) => {
  axios
    .post(URL_API, data)
    .then(() => {
      fetchDataMelon();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deleteDataMelon = async (id) => {
  await axios
    .delete(`${URL_API}${id}`)
    .then(() => {
      fetchDataMelon();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const updateDataMelon = async (data) => {
  await axios
    .patch(URL_API, data)
    .then(() => {
      fetchDataMelon();
    })
    .catch((err) => {
      console.error(err);
    });
};