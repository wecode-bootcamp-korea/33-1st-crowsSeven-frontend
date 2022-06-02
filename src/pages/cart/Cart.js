import React, { useState, useEffect } from 'react';
import CartNotEmpty from './CartNotEmpty';
import CartEmpty from './CartEmpty';
import './Cart.scss';

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  const cartEmpty = cartList.length === 0;

  const fetchCartList = () => {
    fetch('http://10.58.1.252:8000/carts/', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setCartList(res.results);
      })
      .catch(e => {});
  };

  useEffect(() => {
    fetchCartList();
  }, []);

  return (
    <div className="cart">
      <h1 className="basket">장바구니</h1>
      <div className="tableWrapper">
        <p>국내배송({cartList && cartList.length})</p>
        {cartEmpty ? (
          <CartEmpty />
        ) : (
          <CartNotEmpty
            cartList={cartList && cartList}
            setCartList={setCartList}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
            fetchCartList={fetchCartList}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
