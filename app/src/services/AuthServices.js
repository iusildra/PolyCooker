import axios from "axios";
const url = "http://localhost:3080/api/";
export default {
    async signin(credentials) {
        return axios
            .post(url + "signin/", credentials)
            .then((response) => response.data);
    },
    async signup(credentials) {
        return axios
            .post(url + "signup/", credentials)
            .then((response) => response.data);
    },
    async updateData(credentials) {
        return axios
            .put(url + "users/"+credentials["id"], credentials)
            .then((response) => response.data);
    },
};
