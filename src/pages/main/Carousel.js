import { useState, useEffect, useRef } from 'react';
import CarouselCard from './CarouselCard';
import './Carousel.scss';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const handleSlideButtonClick = index => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <section id="forth" className="carousel">
      <h1>Magazine</h1>
      <div className="carouselWrapper" ref={slideRef}>
        {CAROUSEL_DATA.map(({ id, src, title }) => (
          <CarouselCard key={id} src={src} title={title} />
        ))}
      </div>
      <div className="buttonContainer">
        {Array.from({ length: 4 }).map((_, index) => (
          <button
            className={`${currentSlide === index ? 'active' : ''}`}
            key={index}
            onClick={() => handleSlideButtonClick(index)}
          />
        ))}
      </div>
    </section>
  );
};

const CAROUSEL_DATA = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1533323836708-9ed67edee77f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    title: 'CREATE YOUR HOME',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1526250000311-b8f091ec8cac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    title: '크로우세븐과 함꼐하는 캠핑',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1756&q=80',
    title: '크로우세븐 시네마 오픈!',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1588253137707-3eca729129e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGN1cHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    title: '제품 관리 요령',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1593055454503-531d165c2ed8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmUlMjBjYXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    title: '크로우 세븐 휴대폰 케이스 출시!',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hvdyUyMHJvb218ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    title: '선릉 쇼룸 오픈',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1581067721837-e4809b29692d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvcHBpbmclMjBiYWd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    title: '업사이클링 프로젝트 #쇼핑백',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    title: '크로우세븐과 함꼐하는 독서회',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1632933168044-8ae5c39c949d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNoaXJzdG1hcyUyMHRyZWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    title: '크리스마스 이벤트!',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1606394784708-a6b133dd9ade?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoaXJzdG1hcyUyMHRyZWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    title: '성탄절 경품 추첨',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1587022369615-2468edb6f31a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzh8fGZsb3dlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    title: '크로우세븐과 함꼐하는 꽃꽂이!',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1627618999952-6d9ea355d679?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxldHRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    title: '주변지인에게 안부를 전해보세요',
  },
];

export default Carousel;
