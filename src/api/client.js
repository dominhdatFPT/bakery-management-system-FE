import axios from 'axios';

// Tạo 1 "bản sao" axios dùng chung cho cả app, có sẵn baseURL
// để các file khác không phải gõ lại "http://localhost:8080" mỗi lần gọi API.
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export default apiClient;