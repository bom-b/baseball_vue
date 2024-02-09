// axios 요청을 할 때 헤더에 토큰을 실어서 보내도록 함
// axios 요청이 일어날때 요청을 인터셉트해서 토큰 유효성 검사를 먼저 진행
// 토큰이 유효하지 않으면 경고창을 띄우기 때문에
// 개별적으로 토큰이 유효하지 않을때 발생하는 오류를 처리할 필요가 없음.
import axios from "axios";
import swal from "sweetalert2";

const API_URL = import.meta.env.VITE_SPRING_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("jwtToken");

        config.headers.Authorization = `Bearer ${token}`;

        // 토큰 유효성 검사
        try {
            await axios.get(API_URL + '/checkToken', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        } catch (error) {
            swal.fire({
                text: '로그인 정보가 만료되었습니다. 다시 로그인 해주세요.',
                icon: 'warning',
                confirmButtonColor: '#41b882',
                confirmButtonText: '확인'
            })
                .then(() => {
                    window.location.href = '/service/login';
                });
            window.localStorage.removeItem('jwtToken');
            window.localStorage.removeItem('role');
            window.localStorage.removeItem('nickname');
            window.localStorage.removeItem('name');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;


