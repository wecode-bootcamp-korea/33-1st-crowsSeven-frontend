import React, { useState } from 'react';
import Ordermodal from '../../components/OrderModal/OrderModal';

import './OrderInfo.scss';

const CreditCard = () => {
  return (
    <div className="creditCard">
      <p>
        소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.
      </p>
      <div className="inputBox">
        <input type="checkbox" id="check" />
        <label for="check">결제수단과 입력정보를 다음에도 사용</label>
      </div>
    </div>
  );
};

const AccountTransfer = () => {
  return (
    <div className="accountTransfer">
      <div className="inputBox">
        <p>예금주명</p>
        <input type="text" />
      </div>
      <p>
        ❗️ 소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.
      </p>
    </div>
  );
};

const Deposit = () => {
  return (
    <div className="deposit">
      <div className="inputBox">
        <p>입금자명</p>
        <input type="text" />
      </div>

      <div className="selectBox">
        <p>입금은행</p>
        <select className="bank">
          <option value="1">선택해 주세요</option>
          <option value="2">국민은행</option>
          <option value="3">우리은행</option>
          <option value="4">하나은행</option>
        </select>
      </div>
    </div>
  );
};

const OrderInfo = ({ orderItemList, shipping, total }) => {
  const [orderResult, setOrderResult] = useState([]);

  const [inputValue, setInputValue] = useState({
    selected_product_ids: '',
    recipient: '',
    zipcode: '',
    delivery_address: '',
    receive_phonenumber: '',
    delivery_email: '',
    delivery_message: '',
    shopping_fee: '',
    paymentmethod: '',
  });

  const [payment, setPayment] = useState();

  const handleInput = e => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();

    const isValid =
      inputValue.recipient &&
      inputValue.zipcode &&
      inputValue.delivery_address &&
      inputValue.receive_phonenumber &&
      inputValue.delivery_email &&
      payment;

    const orderItemIds = orderItemList.map(orderItem => orderItem.id);

    if (isValid) {
      fetch('http://10.58.1.252:8000/orders/', {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
        body: JSON.stringify({
          ...inputValue,
          paymentmethod: Number(payment),
          shopping_fee: Number(shipping),
          selected_product_ids: orderItemIds,
        }),
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 400) {
            alert('주문할 상품이 없습니다.');
          } else {
            alert('주문을 실패했습니다. 다시 요청해주세요');
          }
        })
        .then(res => setOrderResult(res));
    } else {
      window.alert('주문서를 작성해 주세요.');
    }
  };

  return (
    <div className="orderInfo">
      <form action="" autocomplete="off">
        <div className="destinationBox">
          <div className="title">배송지 선택</div>
          <div className="radiobox">
            <div className="radio">
              <input type="radio" name="destination" id="optional1" />
              <label for="optional1">회원 정보와 동일</label>
            </div>

            <div className="radio">
              <input type="radio" name="destination" id="optional2" />
              <label for="optional2">새로운 배송지</label>
            </div>

            <div className="radio">
              <input type="radio" name="destination" id="optional3" />
              <label for="optional3">최근배송지</label>
            </div>
          </div>

          <button className="addressBookBtn">주소록 보기</button>
        </div>

        <div className="addressInputBox">
          <div className="row">
            <div className="title">받으시는 분</div>
            <input type="text" onChange={handleInput} name="recipient" />
          </div>

          <div className="row">
            <div className="title">주소</div>
            <div className="addressBox">
              <div>
                <input type="text" onChange={handleInput} name="zipcode" />
                <span>우편주소</span>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleInput}
                  name="delivery_address"
                />
                <span>기본주소</span>
              </div>
              <div>
                <input type="text" />
                <span>나머지주소(선택입력가능)</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="title">휴대전화</div>
            <input
              type="text"
              onChange={handleInput}
              name="receive_phonenumber"
            />
          </div>

          <div className="row">
            <div className="title">이메일</div>
            <div>
              <input
                type="email"
                onChange={handleInput}
                name="delivery_email"
              />
              <div className="emailText">
                <p>
                  이메일을 통해 주문처리과정을 보내드립니다. <br /> 이메일
                  주소란에는 반드시 수신가능한 이메일주소를 입력해 주세요.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="title">배송메세지</div>
            <textarea
              type="text"
              onChange={handleInput}
              name="delivery_message"
            />
          </div>
        </div>

        <div className="paymentInputBox">
          <div
            className="paymentBox"
            onChange={e => setPayment(e.target.value)}
          >
            <div className="title">결제수단</div>
            <div className="radiobox">
              <div className="radio">
                <input type="radio" name="payment" id="creditCard" value={1} />
                <label for="creditCard">카드 결제</label>
              </div>

              <div className="radio">
                <input
                  type="radio"
                  name="payment"
                  id="accountTransfer"
                  value={2}
                />
                <label for="accountTransfer">실시간 계좌이체</label>
              </div>

              <div className="radio">
                <input type="radio" name="payment" id="deposit" value={3} />
                <label for="deposit">무통장 입금</label>
              </div>
            </div>
          </div>
          {payment === '1' && <CreditCard />}
          {payment === '2' && <AccountTransfer />}
          {payment === '3' && <Deposit />}

          <div className="orderFooter">
            <p>
              Total <span>{total}</span>원
            </p>
            <button
              className="paymentBtn"
              onClick={e => {
                onSubmit(e);
              }}
            >
              Payment
            </button>
          </div>
        </div>
      </form>
      {orderResult.length > 0 && <Ordermodal orderResult={orderResult} />}
    </div>
  );
};

export default OrderInfo;
