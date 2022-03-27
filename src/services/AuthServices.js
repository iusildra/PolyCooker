import axios from "axios";
import api from "../config/config.json"
export default {
    async signin(credentials) {
        return axios
            .post(api.api_routes.signin, credentials)
            .then((response) => response.data);
    },
    async signup(credentials) {
        return axios
            .post(api.api_routes.signup, credentials)
            .then((response) => response.data);
    },
    async updateData(credentials) {
        return axios
            .put(api.api_routes.userById+credentials["id"], credentials)
            .then((response) => response.data);
    },
};
