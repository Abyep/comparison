import axios from "axios";

const api = {


  getData() {
    return new Promise((resolve, reject) => {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      };
      axios
        .get(`http://www.mocky.io/v2/5e9ebdaa2d00007800cb7697`)
        .then((res) => {
          if (res.status == 200) {
            resolve(res.data);
          } else {
            reject(new Error("error"));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  
};

export default api;
