import Axios from "axios";

Axios.interceptors.response.use(null, error => {
    const expectedError = error.response
        && error.response.status >= 400
        && error.response.status < 500;

    if (!expectedError){
        console.log(error);
        console.error("An unexpected error occurred..");
        // toast("An unexpected error occurred.."); as an object
    }

    return Promise.reject(error);
});
//------------------------------------------------------------------------------------

const http = {
    get: Axios.get,
    post: Axios.post
};

export default http;