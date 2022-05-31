import { CgViewSplit } from 'react-icons/cg';
import { useState, useEffect } from 'react';
import { MdCalendarViewMonth } from 'react-icons/md';
import PageList from '../store/PageList';
import Items from '../store/Items';
import '../store/Store.scss';

const SearchResult = () => {
  const [items, setItems] = useState([]);
  const [listType, setListType] = useState('small');

  useEffect(() => {
    fetch('/data/ITEM_LIST.json')
      .then(res => res.json())
      .then(result => setItems(result));
  }, []);

  const changeBigList = () => {
    setListType('big');
  };

  const changeSmallList = () => {
    setListType('small');
  };

  return (
    <div className="store">
      <section>
        <h2>Search</h2>
        <div className="itemCategory">
          <div className="itemAmount">
            <b>{items.length}</b>
            <span>개의 상품이 있습니다.</span>
          </div>
          <div className="itemSort">
            <button>신상품</button>
            <button>상품명</button>
            <button>낮은가격</button>
            <button>높은가격</button>
            <button onClick={changeSmallList} className="icon">
              <MdCalendarViewMonth />
            </button>
            <button onClick={changeBigList} className="icon">
              <CgViewSplit />
            </button>
          </div>
        </div>
        <div className="itemList">
          {items.map(({ id, state, itemThumbnail, itemName, price }) => {
            return (
              <Items
                listType={listType}
                key={id}
                state={state}
                img={itemThumbnail}
                name={itemName}
                itemPrice={price}
              />
            );
          })}
        </div>
        <PageList />
      </section>
    </div>
  );
};

export default SearchResult;