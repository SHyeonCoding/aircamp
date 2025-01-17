import axios from "axios";
import { BACK } from "../config";
const RES = "/api/reservations";

// 새로운 예약을 등록하는 함수입니다.
// 예약 정보를 인자로 받습니다.
// 성공 시 true를 반환합니다.
// 실패 시 false를 반환합니다.
export const handleNewReservation = async (reservation) => {
  try {
    await axios.post(`${BACK}${RES}`, reservation);
    return true;
  } catch (error) {
    return false;
  }
};

// 특정 예약을 조회하는 함수빙니다.
// 예약 id를 인자로 받습니다.
// 성공 시 예약 정보를 반환합니다.
// 실패 시 null을 반환합니다.
export const handleReservation = async (reservationId) => {
  try {
    const response = await axios.get(`${BACK}${RES}/${reservationId}`);

    return response.data;
  } catch (error) {
    return null;
  }
};

// 특정 예약을 수정하는 함수입니다.
// 수정된 예약 정보를 인자로 받습니다.
// 성공 시 수정된 예약 정보를 반환합니다.
// 실패 시 null을 반환합니다.
export const handleUpdateReservation = async (updated, userInfo) => {
  const { reservationId } = updated;

  try {
    const response = await axios.patch(
      `${BACK}${RES}/${reservationId}`,
      updated,
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

// 특정 예약을 취소하는 함수입니다.
// 예약 id를 인자로 받습니다.
// 성공 시 true를 반환합니다.
// 실패 시 false를 반환합니다.
export const handleCancelReservation = async (reservationId, memberInfo) => {
  try {
    await axios.delete(`${BACK}${RES}/${reservationId}`, {
      headers: {
        Authorization: memberInfo.accessToken,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

// 해당 날짜에 예약이 존재하는지 확인하는 함수입니다.
export const handleCheckReservationDate = async (reservationInfo, userInfo) => {
  try {
    const response = await axios.post(
      `${BACK}/api/reservations/existence`,
      reservationInfo,
      {
        headers: {
          Authorization: userInfo.accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
