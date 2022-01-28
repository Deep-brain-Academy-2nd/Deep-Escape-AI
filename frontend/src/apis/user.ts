import axios from "axios";
import { API } from "constants/constants";

// 유저 정보 받아오기 API
export const getUserinfo = async () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const checkAccessToken = accessToken !== null ? accessToken : '';

  const res = await axios.get(API + '/user/profile', { 
    headers: { 'x-access-token': checkAccessToken }
  })
  
  return res.data;
}

// 로그인 API
export const login = async ({email, password}:{email: string, password: string}) => {
  const res = await axios.post(API + '/user/login', {
    email: email, password: password
  });

  if(res.data) {
    let token: string = res.data['token'];

    sessionStorage.setItem("accessToken", token);
  }

  return res.data
}

// 회원가입 API
export const register = async (email: string, nickname: string, password: string, admin: boolean) => {
  const res = await axios.post(API + '/user/register', {
    email: email,
    nickname: nickname,
    password: password,
    admin: admin
  })

  return res.data
}