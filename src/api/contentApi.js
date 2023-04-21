import axios from 'axios';

function contentApi(){

}

export const imageUpload =  async (selectedFile) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
        const response =  axios.post('http://localhost:8080/create/upload', formData)
        return response;
    } catch (err) {
        error(err);
    }
};

export const contentUpload = async (data) => {
    try {
        const response = await axios.post('http://localhost:8080/create', data);
        return response;
    } catch (err) {
        error(err);
    }
};

        
function error(err) {
    console.log(' err : ', err.response);
    const statusCode = err.response.status; // 400
    const statusText = err.response.statusText; // Bad Request
    const message = err.response.data.message[0]; // id should not be empty
    console.log(`${statusCode} - ${statusText} - ${message}`);
}


export default contentApi;
