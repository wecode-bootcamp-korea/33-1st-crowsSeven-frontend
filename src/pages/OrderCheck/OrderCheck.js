import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCalendarAlt } from 'react-icons/fa';
import OrderEmpty from './OrderEmpty';
import OrderNotEmpty from './OrderNotEmpty';
import './OrderCheck.scss';

const OrderCheck = () => {
  const navigate = useNavigate();
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let day = `${year}-${month}-${date}`;

  const [calendar, setCalendar] = useState(day);
  const [orderList, setOrderList] = useState([]);
  const orderEmpty = orderList.length === 0;

  useEffect(() => {
    fetch('/data/cartListData.json', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setOrderList(data);
      });
  }, []);
  const oneWeek = e => {
    let threeM = new Date(today.setDate(today.getDate() - 7));
    let year = threeM.getFullYear();
    let month = threeM.getMonth() + 1;
    let date = threeM.getDate();
    setCalendar(`${year}-${month}-${date}`);
    e.preventDefault();
  };

  const monthAgo = agoMonth => {
    let newDate = new Date(today.setMonth(today.getMonth() - agoMonth));
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let date = newDate.getDate();
    setCalendar(`${year}-${month}-${date}`);
  };

  const goToDeleteOrder = () => {
    navigate('../deleteOrder');
  };

  return (
    <main className="orderCheck">
      <h1 className="title">주문 조회</h1>
      <section className="orderCheckBox">
        <div className="line1" />
        <div className="line2" />
        <div className="checkBtnBox">
          <div className="checkBtn1">
            주문내역조회({orderList && orderList.length})
          </div>
          <div className="checkBtn2" onClick={goToDeleteOrder}>
            취소/반품/교환내역(0)
          </div>
        </div>
      </section>
      <section className="dateBox">
        <select className="orderStatus">
          <option>전체 주문처리상태</option>
          <option>입금전</option>
          <option>배송준비중</option>
          <option>배송중</option>
          <option>배송완료</option>
          <option>취소</option>
          <option>교환</option>
          <option>반품</option>
        </select>
        <div className="divideLine">|</div>
        <form className="dayBtn">
          <button
            onClick={e => {
              setCalendar(day);
              e.preventDefault();
            }}
          >
            오늘
          </button>
          <button onClick={oneWeek}>1주일</button>
          <button
            onClick={e => {
              e.preventDefault();
              monthAgo(1);
            }}
          >
            1개월
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              monthAgo(3);
            }}
          >
            3개월
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              monthAgo(6);
            }}
          >
            6개월
          </button>
        </form>
        <div className="calendar1">{calendar}</div>
        <FaRegCalendarAlt className="calendarIcon" />
        <div className="dash">-</div>
        <div className="calendar1">{day}</div>
        <FaRegCalendarAlt className="calendarIcon" />
        <button className="inquire">조회</button>
      </section>
      <section className="orderDescription">
        <div>
          ㆍ기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 지난
          주문내역을 조회하실 수 있습니다.
        </div>
        <div>
          ㆍ주문번호를 클릭하시면 해당 주문에 대한 상세내역을 확인하실 수
          있습니다.
        </div>
        <div>ㆍ취소/교환/반품 신청은 주문 완료일 기준 7일까지 가능합니다.</div>
      </section>
      <div className="itemDescription">
        <p className="orderItemDescription">주문 상품 정보</p>
      </div>
      <div className="orderCart">
        <div className="orderCartWrapper">
          {orderEmpty ? (
            <OrderEmpty />
          ) : (
            <OrderNotEmpty orderList={orderList} />
          )}
        </div>
      </div>
    </main>
  );
};

export default OrderCheck;
