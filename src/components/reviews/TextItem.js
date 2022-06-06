import React from 'react';
import { useNavigate } from 'react-router-dom';

const TextItem = ({ postItem, isImgShow }) => {
  const {
    review_id,
    review_thumb_nail,
    review_product,
    review_title,
    review_name,
    review_date,
    review_view_count,
  } = postItem;

  const navigate = useNavigate();
  const goToPostPage = () => {
    navigate(`/review_post/${review_id}`);
  };
  return (
    <tr key={review_id} onClick={goToPostPage}>
      <td className="marginRight">{review_id} </td>

      <td className="productName tableLeft">
        <div>
          {isImgShow ? <img src={review_thumb_nail} alt="tableware" /> : null}
          {review_product}
        </div>
      </td>
      <td className="tableLeft">{review_title}</td>
      <td>{review_name}</td>
      <td>{review_date}</td>
      <td>{review_view_count}</td>
    </tr>
  );
};

// props isImgShow true img tag rendering
// IMG O, IMG X
// img property img tag rendering
export default TextItem;

// what
// ~~~
// fetch
// article, udemy, youtube,
// O

// Project
// fetch ~~~
// ~~~

//
