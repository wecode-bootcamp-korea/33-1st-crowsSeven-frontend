import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    id: '',
    pw: '',
  });

  const { id, pw } = inputValue;

  const handleInput = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const goToMain = () => {
    fetch('http://10.58.2.129:8000/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: id,
        password: pw,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.access_token) {
          localStorage.setItem('Authorization', result.access_token);
          navigate('../');
        } else {
          alert('아이디와 비밀번호를 확인해주세요');
        }
      });
  };
  const goToSignup = () => {
    navigate('../signup');
  };

  return (
    <div>
      <section className="login">
        <div className="loginTitle">CROWS SEVEN</div>
        <div className="inputArea">
          <form className="idLine">
            <span className="idInputLine">Id</span>
            <input
              className="idInput"
              type="text"
              name="id"
              onChange={handleInput}
            />
          </form>
          <form className="pwLine">
            <span className="pwInputLine">Password</span>
            <input
              className="pwInput"
              type="password"
              name="pw"
              onChange={handleInput}
            />
          </form>
        </div>
        <button
          className="signBtn"
          disabled={!(id.length > 4 && pw.length >= 4)}
          onClick={goToMain}
        >
          SIGN IN
        </button>
        <div className="loginFooter">
          <div className="findUser">
            <div className="forgotId">Forgot Your Id?</div>
            <div>or</div>
            <div className="forgotPw">Password</div>
          </div>
          <div className="createAccount" onClick={goToSignup}>
            CreateAccount
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
