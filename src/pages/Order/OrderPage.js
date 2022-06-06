import React, { useState, useEffect } from 'react';
import CartTable from './CartTable';
import Orderinfo from './OrderInfo';

import './OrderPage.scss';

const OrderPage = () => {
  const [orderItemList, setOrderItem] = useState([]);

  const fetchCartList = () => {
    fetch('http://10.58.2.129:8000/carts/', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setOrderItem(res.results);
      })
      .catch(e => {});
  };

  useEffect(() => {
    fetchCartList();
  }, []);

  const price = orderItemList
    .map(item => item.price * item.qty)
    .reduce((a, b) => a + b, 0);
  const shipping = price >= 50000 ? 0 : 3000;
  const total = price + shipping;

  return (
    <div className="orderPage">
      <h1>주문서작성</h1>
      <CartTable orderItemList={orderItemList} />
      <Orderinfo
        shipping={shipping}
        total={total}
        orderItemList={orderItemList}
      />
    </div>
  );
};

export default OrderPage;
