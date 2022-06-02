import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const TABLE_HEADER = [
  'Product',
  'Info',
  'Price',
  'Qty.',
  'Mileage',
  'Delivery',
  'Charge',
  'Total',
];

const CartNotEmpty = ({
  cartList,
  setCartList,
  checkedList,
  setCheckedList,
  fetchCartList,
}) => {
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    setIsAllChecked(cartList.every(cartItem => checkedList.includes(cartItem)));
  }, [cartList, checkedList]);

  const price = cartList
    .map(item => item.price * item.qty)
    .reduce((a, b) => a + b, 0);
  const shipping = price >= 50000 ? 0 : 3000;
  const total = price + shipping;

  const tableFooter = [
    { title: 'Price', amount: price },
    { title: 'Shipping', amount: shipping },
    { title: 'Total', amount: total },
  ];

  const onChecked = e => {
    if (e.target.checked) {
      setCheckedList(cartList);
      setIsAllChecked(true);
    } else {
      setCheckedList([]);
      setIsAllChecked(false);
    }
  };

  const navigate = useNavigate();

  const onSelectDelete = () => {
    const checkedIds = checkedList.map(checkedItem => checkedItem.id);

    fetch(`http://10.58.1.252:8000/carts/${checkedIds}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.status === 200) {
          fetchCartList();
        }
      })
      .catch(e => {
        alert('다시 시도해주세요.');
      });
  };

  const goToSelectOrder = () => {};

  const onDelete = () => {};

  const goToOrder = () => {
    navigate('/order');
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="checkBox">
              <input
                type="checkbox"
                onChange={onChecked}
                checked={isAllChecked}
              />
            </th>
            {TABLE_HEADER.map(row => (
              <th key={row} className={row.toLowerCase()}>
                {row}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cartList &&
            cartList.map(item => {
              return (
                <CartItem
                  key={cartList.id}
                  item={item}
                  total={total}
                  cartList={cartList && cartList}
                  setCartList={setCartList}
                  checkedList={checkedList}
                  setCheckedList={setCheckedList}
                />
              );
            })}
        </tbody>
        <tfoot>
          {tableFooter.map(row => {
            return (
              <tr key={row.title}>
                <td colspan="10">
                  <div className="priceRow">
                    <strong>{row.title}</strong>
                    <div className="pricebox">
                      <span>{row.amount}원</span>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tfoot>
      </table>
      <div className="bottomBtn">
        <div className="deleteBtn">
          <button onClick={onSelectDelete}>Select Delete</button>
          <button onClick={onDelete}>Delete</button>
        </div>
        <div className="orderBtn">
          <button onClick={goToSelectOrder}>Select Order</button>
          <button onClick={goToOrder}>Order</button>
        </div>
      </div>
    </>
  );
};

export default CartNotEmpty;
