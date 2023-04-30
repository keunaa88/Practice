import api from './api';
import axios from 'axios';

export const contentApi = {
    contentRead: async (id) => {
        try {
            const response = await axios.get(`${api.baseURL}/post/detail/${id}`);
            return response;
        } catch (err) {
            error(err);
        }
    },
    contentUpload: async (data) => {
        try {
            const response = await axios.post(`${api.baseURL}/post/upload`, data);
            return response;
        } catch (err) {
            error(err);
        }
    }
    
};

export const uploadImageToS3 =  async (selectedFile) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
        const response =  axios.post(`${api.baseURL}/post/uploadImg`, formData)
        return response;
    } catch (err) {
        error(err);
    }
};

export const uploadImageToS3fromURL = async (selectedFile) => {

    // web browser에서 api호출이므로 fetch 사용
    const response = await fetch(selectedFile)
        .then((res) => res.blob())
        .then((blob) => {
            const formData = new FormData();
            formData.append('file', blob);
            const response =   axios.post(`${api.baseURL}/post/uploadImg`, formData)
            return response;
        }).then(response => {
            // 성공적으로 업로드된 경우 실행할 코드
            return response;
        })
        .catch(error => {
            // 업로드 중에 에러가 발생한 경우 실행할 코드
            console.log('error', error)
        });

    return response;
  };

export const contentUpload = async (data) => {
    try {
        const response = await axios.post(`${api.baseURL}/post/upload`, data);
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
