import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";
import "../../Style/Picker.css";

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 300px;
  height: 48px;
  margin-left: 100px;
  font-size: 16px;
  padding: 15px 20px;
  background-color: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  @media (max-width: 900px) {
    margin-left: 0;
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 3px rgba(255, 90, 95, 0.4);
    border-color: #ff5a5f;
  }

  &::placeholder {
    color: #999;
  }

  @media screen and (max-width: 868px) {
    margin-left: 0px;
  }

  @media screen and (max-width: 400px) {
    margin-left: 0px;
  }
`;

const CustomDatePicker = styled(DatePicker)``;

function Picker({ startDate, setStartDate }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setShowDatePicker(false);
  };
  return (
    <Container>
      <Input
        type="text"
        placeholder="날짜를 선택하세요."
        onClick={handleInputClick}
        value={startDate ? startDate.toLocaleDateString() : ""}
        readOnly
      />
      {showDatePicker && (
        <CustomDatePicker
          selected={startDate}
          onChange={handleDateChange}
          minDate={new Date()}
          inline
        />
      )}
    </Container>
  );
}
export default Picker;
