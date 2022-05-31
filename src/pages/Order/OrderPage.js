import React, { useState, useEffect } from 'react';
import CartTable from './CartTable';
import Orderinfo from './OrderInfo';

import './OrderPage.scss';

const OrderPage = () => {
  const [orderItemList, setOrderItem] = useState([]);

  useEffect(() => {
    fetch('/data/cartListData.json')
      .then(res => res.json())
      .then(data => {
        setOrderItem(data);
      });
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
      <Orderinfo total={total} />
    </div>
  );
};

export default OrderPage;