import axios from "axios";
import { BACK } from "../config";
import { toast } from "react-toastify";

// 이메일 인증 코드를 받아오는 함수입니다.
// 이메일을 인자로 받습니다.
// 성공 시 인증 코드를 반환합니다.
// 실패 시 null을 반환합니다.
export const getEmailCode = async (email) => {
  try {
    const response = await axios.post(
      `${BACK}/api/members/email-verify?email=${email}`
    );

    const code = response.data.data;

    return code;
  } catch (error) {
    return null;
  }
};

// 회원가입을 하는 함수입니다.
// 회원가입에 필요한 정보들을 인자로 받습니다.
// 성공 시 treu를 반환합니다.
// 실패 시 false를 반환합니다.
export const handleJoin = async (joinInfo) => {
  try {
    await axios.post(`${BACK}/api/members`, joinInfo);

    return true;
  } catch (error) {
    return false;
  }
};

// 특정 멤버 정보를 업데이트 하는 함수입니다.
// 기존의 멤버 정보와 업데이트된 정보를 인자로 받습니다.
// 성공 시 업데이트된 회원의 정보를 반환합니다.
// 실패 시 false를 반환합니다.
export const handleUpdateMemberInfo = async (memberInfo, updatedInfo) => {
  try {
    const response = await axios.patch(
      `${BACK}/api/members/${memberInfo.memberId}`,
      updatedInfo,
      {
        headers: {
          Authorization: memberInfo.accessToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 특정 멤버의 정보를 조회하는 함수입니다.
// 유저 id를 인자로 받습니다.
// 성공 시 user의 정보를 반환합니다.
// 실패 시 null을 반환합니다.
export const getMemberInfo = async (memberInfo) => {
  try {
    const response = await axios.get(
      `${BACK}/api/members/${memberInfo.memberId}`,
      {
        headers: {
          Authorization: memberInfo.accessToken,
        },
      }
    );
    const userInfo = response.data;

    return userInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 모든 멤버의 정보를 받아오는 함수입니다.
// 성공 시 모든 유저 정보가 담긴 배열을 반환합니다.
// 실패 시 null을 반환합니다.
export const getAllMemberInfo = async (memberInfo) => {
  try {
    const response = await axios.get(`${BACK}/api/members`, {
      headers: {
        Authorization: memberInfo.accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 특정 회원 정보를 삭제(탈퇴)하는 함수입니다.
// 멤버 정보를 인자로 받습니다.
// 성공 시 true를 반환합니다.
// 실패 시 false를 반환합니다.
export const handleUserWithdrawal = async (deletedId, memberInfo) => {
  try {
    await axios.delete(`${BACK}/api/members/${deletedId}`, {
      headers: {
        Authorization: memberInfo.accessToken,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 로그인을 위한 함수입니다.
// 이메일, 비밀번호로 구성된 객체를 인자로 받습니다.
// 로그인 성공 시 유저 정보를 반환합니다.
// 로그인 실패 시 null을 반환합니다.
export const handleStartLogin = async (data) => {
  const { email, password } = data;
  const loginInfo = { email, password };

  try {
    const response = await axios.post(`${BACK}/api/login`, loginInfo);

    const data = response.headers;

    const authToken = data.authorization;
    const refreshToken = data.Refresh;
    const validToken = authToken.slice(7);

    const decoded = JSON.parse(atob(validToken.split(".")[1]));

    const userInfo = { ...decoded, accessToken: authToken };

    return userInfo;
  } catch (error) {
    console.log(error);

    return null;
  }
};

// 카카오 로그인을 진행하는 함수입니다.
// 카카오 인게 코드를 인자로 받습니다.
// 성공 시 유저 정보를 반환합니다.
// 실패 시 null을 반환합니다.
export const handleKakaoLogin = async (KAKAO_CODE) => {
  const state = "state";
  try {
    const response = await axios.get(
      `${BACK}/login/oauth2/code/kakao?code=${KAKAO_CODE}&state=${state}`
    );
    const data = response.headers;

    const authToken = data.Authorization;
    const refreshToken = data.Refresh;
    const validToken = authToken.slice(7);

    const decoded = JSON.parse(atob(validToken.split(".")[1]));

    return decoded;
  } catch (error) {
    return null;
  }
};

// 일반 계정을 판매자 계정으로 등록하는 함수입니다.
// 멤버 id와 판매자 등록 정보를 인자로 받습니다.
// 성공 시 멤버 정보를 반환합니다.
// 실패 시 null을 반환합니다.
export const registerSellerAccount = async (userInfo, registratonInfo) => {
  try {
    const response = await axios.post(
      `${BACK}/api/sellers/${userInfo.memberId}`,
      registratonInfo,
      {
        headers: {
          Authorization: userInfo.accessToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 일반 계정을 판매자 계정으로 등록하는 함수입니다.
// 멤버 id와 판매자 등록 정보를 인자로 받습니다.
// 성공 시 멤버 정보를 반환합니다.
// 실패 시 null을 반환합니다.
export const updateSellerAccount = async (userInfo, registratonInfo) => {
  try {
    const response = await axios.patch(
      `${BACK}/api/sellers/${userInfo.memberId}`,
      registratonInfo,
      {
        headers: {
          Authorization: userInfo.accessToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
