import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderStatus from './OrderStatus';
import LinkPage from './LinkPage';
import STATUS_LIST from './orderStatusData';
import LINK_LIST from './linkData';
import './MyPage.scss';

const MyPage = () => {
  let navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/data/mypageData.json', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserList(data);
      });
  }, []);

  return (
    <main className="MyPage">
      <h1 className="title">마이 페이지</h1>
      <section className="myPageBox">
        <img
          alt=""
          src="https://img.echosting.cafe24.com/skin/base_ko_KR/member/img_member_default.gif"
        />
        <div className="userBoxDescription">
          <p className="userBoxFirstLine">
            저희 쇼핑몰을 이용해 주셔서 감사합니다.
            <span style={{ color: 'blue' }}>
              {userList[0] && userList[0].User_name}
            </span>
            님은 [일반회원] 회원이십니다.
          </p>
          <p>
            <span style={{ color: 'blue' }}>￦10,000 이상</span> 이상 구매시
            <span style={{ color: 'blue' }}>1%</span>을 추가적립 받으실 수
            있습니다. (최대 ￦999,999)
          </p>
        </div>
      </section>
      <section className="reserveFundBox">
        <article className="reserveFundBox1">
          <div className="useableFund">
            <span>가용적립금</span>
            <div className="inquiry">
              <span style={{ color: 'blue' }}>1000원</span>
              <button>조회</button>
            </div>
          </div>
          <div className="useableFund">
            <span>사용적립금</span>
            <span className="useFund">0원</span>
          </div>
          <div className="useableFund">
            <span>쿠폰</span>
            <div className="inquiry">
              <span>0개</span>
              <button>조회</button>
            </div>
          </div>
        </article>
        <article className="reserveFundBox2">
          <div className="allReserveFund">
            <span>가용적립금</span>
            <span className="allFund">1000원</span>
          </div>
          <div className="allReserveFund">
            <span>총주문</span>
            <span className="allFund">￦0(0회)</span>
          </div>
        </article>
      </section>
      <section className="orderStateBox">
        <article className="orderStateTitle">
          <span>나의 주문처리 현황</span>
          <span className="titleAlert">
            (최근 <span style={{ color: 'blue' }}>3개월</span> 기준)
          </span>
        </article>
        <article className="orderState">
          {STATUS_LIST.map((item, i) => {
            return <OrderStatus key={i} item={item} />;
          })}

          <div className="stateBox">
            <div className="allState">
              <span>ㆍ 취소:</span>
              <span style={{ color: 'blue' }}>0</span>
            </div>
            <div className="allState">
              <span>ㆍ 교환:</span>
              <span style={{ color: 'blue' }}>0</span>
            </div>
            <div className="allState">
              <span>ㆍ 반품:</span>
              <span style={{ color: 'blue' }}>0</span>
            </div>
          </div>
        </article>
      </section>
      {LINK_LIST.map((item, i) => {
        return <LinkPage key={i} item={item} navigate={navigate} />;
      })}
    </main>
  );
};

export default MyPage;
