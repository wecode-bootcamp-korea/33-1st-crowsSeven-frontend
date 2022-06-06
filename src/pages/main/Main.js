import React, { useEffect, useRef, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import Footer from './Footer';
import SectionImg from './SectionImg';
import MainButton from './MainButton';
import Carousel from './Carousel';
import './Main.scss';

const Main = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [throttle, setThrottle] = useState(false);
  const scrollRef = useRef();

  const moveSlide = index => {
    setSlideIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(prevIndex =>
        prevIndex !== IMG_URLS.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    const scroll = scrollRef.current;
    scroll.addEventListener('scroll', throttleScroll, false);

    return () => {
      scroll.removeEventListener('scroll', throttleScroll, false);
    };
  });

  const throttleScroll = e => {
    if (!throttle) {
      const { scrollTop, scrollHeight } = e.target;
      let height = Math.floor((scrollTop / scrollHeight) * 100);
      setScrollTop(height);
      setThrottle(true);
      setTimeout(() => {
        setThrottle(false);
      }, 300);
    }
  };

  return (
    <div ref={scrollRef} className="main">
      <section id="first" className="mainSection">
        {IMG_URLS.map(({ id, url }, index) => {
          return (
            <div
              className={slideIndex === index ? 'slideImg active' : 'slideImg'}
              key={id}
            >
              <img src={url} alt="배경 이미지" />
              <MainButton />
            </div>
          );
        })}
        <div className="containerDots">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              onClick={() => moveSlide(index)}
              className={slideIndex === index ? 'dot active' : 'dot'}
            />
          ))}
        </div>
      </section>
      <div className="rightContainerDots">
        {RIGHT_DOTS.map(({ id, text }) => (
          <HashLink className="rightDots" key={id} to={text}>
            {' '}
          </HashLink>
        ))}
      </div>
      <section id="second" className="mainSection">
        <SectionImg url={SECOND_IMG} />
        <h1 className={`${scrollTop > 19 && scrollTop < 30 ? 'moveText' : ''}`}>
          CrowSeven Membership
        </h1>
        <span
          className={`${scrollTop > 19 && scrollTop < 30 ? 'moveText' : ''}`}
        >
          크로우세븐의 멤버가 되시고 최대 50%의 추가 적립, 무로배송, 생일할인
          쿠폰 등 혜택을 받아가세요
        </span>
        <button
          className={`secondImgBtn ${
            scrollTop > 19 && scrollTop < 30 ? 'moveText' : ''
          }`}
        >
          자세히 보기
        </button>
      </section>
      <section id="third" className="mainSection">
        <SectionImg url={THIRD_IMG} />
        <h1 className={`${scrollTop > 41 && scrollTop < 52 ? 'moveText' : ''}`}>
          타임세일이 종료되었습니다.
        </h1>
        <span
          className={`${scrollTop > 41 && scrollTop < 52 ? 'moveText' : ''}`}
        >
          4월 재입고 맞이, 7일동안!!! {'\n'}
          유광케이스 균일가 타임세일!
        </span>
        <button
          className={`secondImgBtn ${
            scrollTop > 41 && scrollTop < 52 ? 'moveText' : ''
          }`}
        >
          자세히 보기
        </button>
      </section>
      <Carousel />
      <Footer />
    </div>
  );
};

const IMG_URLS = [
  {
    id: 1,
    url: 'https://velog.velcdn.com/images/yumjongeun/post/bc8e295b-1636-4827-9da1-7e0bc67fd60b/image.png',
  },
  {
    id: 2,
    url: 'https://velog.velcdn.com/images/yumjongeun/post/47625d90-41f6-4556-8d64-879566a91600/image.png',
  },
  {
    id: 3,
    url: 'https://velog.velcdn.com/images/yumjongeun/post/4748fbb8-07c2-4945-a5fb-3afd32ef7e6f/image.png',
  },
];

const RIGHT_DOTS = [
  {
    id: 1,
    text: '#first',
    status: true,
  },
  {
    id: 2,
    text: '#second',
    status: false,
  },
  {
    id: 3,
    text: '#third',
    status: false,
  },
  {
    id: 4,
    text: '#forth',
    status: false,
  },
  {
    id: 5,
    text: '#footer',
    status: false,
  },
];

const SECOND_IMG =
  'https://images.unsplash.com/photo-1613243555978-636c48dc653c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
const THIRD_IMG =
  'https://velog.velcdn.com/images/kimwanyoung/post/75c9e15a-29a5-467a-8bc2-6fe341d2d6f2/image.jpg';

export default Main;
