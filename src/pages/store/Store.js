import { CgViewSplit } from 'react-icons/cg';
import { MdCalendarViewMonth } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StoreModal from '../../components/storeModal/StoreModal';
import PageList from './PageList';
import Items from './Items';
import './Store.scss';

const Store = () => {
  const [items, setItems] = useState([]);
  const [listType, setListType] = useState('small');
  const [openModal, setOpenModal] = useState(false);
  const [itemData, setItemData] = useState({});
  const [totalCounts, setTotalCounts] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const urlCategory = params.get('category');
  const urlMaterial = params.get('material');
  const urlOffset = params.get('offset');
  const categoryString = `category=${urlCategory}`;
  const materialString = `material=${urlMaterial}`;

  useEffect(() => {
    fetch(`http://54.174.216.108:8000/products/list${location.search}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(result => {
        setItems(result.product_list.products);
        setTotalCounts(result.product_list.total_count);
      });
  }, [location.search]);

  const handleURL = name => {
    if (urlMaterial) {
      navigate(`?${categoryString}&${materialString}&${name}`);
    }
    if (!urlMaterial && urlCategory) {
      navigate(`?${categoryString}&${name}`);
    }
    if (!urlMaterial && !urlCategory) {
      navigate(`?${name}`);
    }
  };

  const pageLimit = 8;

  const goToPage = btnIndex => {
    // console.log('btnIndex', btnIndex);
    const offset = btnIndex * pageLimit;
    const pageString = `offset=${offset}&limit=${pageLimit}`;
    handleURL(pageString);
  };

  const goToMaterial = e => {
    navigate(`?${categoryString}&material=${e.target.innerHTML}`);
  };

  const sortNewest = () => {
    const newestString = 'sort_method=-the_newest';
    handleURL(newestString);
  };

  const sortName = () => {
    const nameString = 'sort_method=name';
    handleURL(nameString);
  };

  const sortHighPrice = () => {
    const highPriceString = 'sort_method=price';
    handleURL(highPriceString);
  };

  const sortLowPrice = () => {
    const lowPriceString = 'sort_method=-price';
    handleURL(lowPriceString);
  };

  const firstPage = () => {
    const firstPageString = 'offset=0&limit=8';
    Number(urlOffset) > 0
      ? handleURL(firstPageString)
      : alert('?????? ????????? ????????? ?????????.');
    handleURL(firstPageString);
  };

  const previousPage = () => {
    const calculateOffset = urlOffset - pageLimit;
    const pageChangerString = `offset=${calculateOffset}&limit=8`;
    handleURL(pageChangerString);
    if (Number(urlOffset) <= 0) {
      firstPage();
    }
  };

  const nextPage = calculateBtn => {
    const calculateOffset = Number(urlOffset) + Number(pageLimit);
    const pageChangerString = `offset=${calculateOffset}&limit=8`;
    handleURL(pageChangerString);
    if (totalCounts - pageLimit < urlOffset) {
      lastPage(calculateBtn);
    }
  };

  const lastPage = calculateBtn => {
    const calculateLast = (calculateBtn - 1) * pageLimit;
    const lastPageString = `offset=${calculateLast}&limit=8`;
    Number(urlOffset) === Number(calculateLast)
      ? alert('?????? ????????? ????????? ?????????.')
      : handleURL(lastPageString);
    handleURL(lastPageString);
  };

  const changeBigList = () => {
    setListType('big');
  };

  const changeSmallList = () => {
    setListType('small');
  };

  const getItemData = ItemData => {
    setOpenModal(true);
    setItemData(ItemData);
  };

  const CATEGORY = {
    ???: [
      { id: 1, name: '??????' },
      { id: 2, name: '?????????' },
      { id: 3, name: '?????????' },
    ],
    ????????????: [
      { id: 1, name: '??????' },
      { id: 2, name: '?????????' },
      { id: 3, name: '?????????' },
    ],
    ??????: [
      { id: 1, name: '??????' },
      { id: 3, name: '?????????' },
    ],
    ????????????: [{ id: 1, name: '??????' }],
    ??????: [
      { id: 1, name: '??????????????????' },
      { id: 2, name: '??????????????????' },
      { id: 3, name: '??????' },
    ],
  };

  return (
    <>
      {openModal && <StoreModal items={itemData} closeModal={setOpenModal} />}
      <div className="store">
        <section>
          <h2>{location.search ? urlCategory : '????????????'}</h2>
          {urlCategory && (
            <div className="category">
              {CATEGORY[urlCategory].map(({ id, name }) => {
                return (
                  <button key={id} onClick={goToMaterial}>
                    {name}
                  </button>
                );
              })}
            </div>
          )}
          <div className="itemCategory">
            <div className="itemAmount">
              <b>{items.length && totalCounts}</b>
              <span>?????? ????????? ????????????.</span>
            </div>
            <div className="itemSort">
              <button onClick={sortNewest}>?????????</button>
              <button onClick={sortName}>?????????</button>
              <button onClick={sortHighPrice}>????????????</button>
              <button onClick={sortLowPrice}>????????????</button>
              <button onClick={changeSmallList} className="icon">
                <MdCalendarViewMonth />
              </button>
              <button onClick={changeBigList} className="icon">
                <CgViewSplit />
              </button>
            </div>
          </div>
          <div className="itemList">
            {items.map(({ id, itemThumbnail, itemName, price }) => {
              return (
                <Items
                  getItemData={getItemData}
                  id={id}
                  listType={listType}
                  key={id}
                  img={itemThumbnail}
                  itemName={itemName}
                  price={price}
                />
              );
            })}
          </div>
          <PageList
            pageLimit={pageLimit}
            totalCounts={totalCounts}
            goToPage={goToPage}
            firstPage={firstPage}
            previousPage={previousPage}
            nextPage={nextPage}
            lastPage={lastPage}
          />
        </section>
      </div>
    </>
  );
};

export default Store;
