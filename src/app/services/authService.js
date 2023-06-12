import axios from "axios";

const authService = {
    login: async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", data);

        } catch (err) {
            const data_error = err.response.data;
            console.log(data_error.message);
            setErrorMsg(data_error.message);
        }
    },

};

export default authService;