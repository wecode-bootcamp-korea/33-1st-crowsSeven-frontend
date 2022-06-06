import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderModal.scss';

const result = { date: '2022-06-03', orderNumber: '970221 - 991104' };

const Ordermodal = ({ orderResult }) => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  return (
    <div className="orderModalBackground">
      <div className="modalContainer">
        <span className="title">💸 Thank you for your order!</span>
        <div className="body">
          <p>주문일자 : {result.date}</p>
          <p>주문번호 : {result.orderNumber}</p>
        </div>
        <button onClick={goToMain}>Go to Main</button>
      </div>
    </div>
  );
};

export default Ordermodal;
