import React, { useEffect, useState } from 'react';
import './Signup.scss';
import Agreement from './Agreement';
import { Catalogues } from './mock';

const Signup = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(Catalogues);
  }, []);

  return (
    <div>
      <main className="signup">
        <h1 className="title">SIGN UP</h1>
        <title className="information">
          <h2>기본정보</h2>
          <div>*필수입력사항</div>
        </title>
        <section className="memberLine">
          <div className="memberTitle"> Member Type</div>
          <div className="memberRadio">
            <input type="radio" name="member" />
            <label>개인회원</label>
            <input type="radio" name="member" />
            <label>사업자 회원</label>
            <input type="radio" name="member" />
            <label>외국인 회원</label>
          </div>
        </section>

        <section className="idLine">
          <div className="id">ID</div>
          <input type="text" className="idInput" />
          <div className="idDescription">
            아이디를 입력해 주세요(영문소문자/숫자,4~16자)
          </div>
        </section>

        <section className="pwLine">
          <div className="pw">Password</div>
          <input type="password" className="pwInput" />
          <div className="pwDescription">(영문 대소문자/숫자 4자~16자)</div>
        </section>

        <section className="pwCheckLine">
          <div className="pwCheck">Password Check</div>
          <input type="password" className="pwInputCheck" />
        </section>

        <section className="nameLine">
          <div className="name">Name</div>
          <input type="text" className="nameInput" />
        </section>

        <section className="addressLine">
          <div className="address">Address</div>
          <input type="text" className="addressInput" />
          <div className="addressDescription">기본주소</div>
        </section>

        <section className="addressLine">
          <div className="address" />
          <input type="text" className="addressInput" />
          <div className="addressDescription">나머지 주소</div>
        </section>

        <section className="phoneLine">
          <div className="phone">Phone</div>
          <select name="phone" className="phoneSelect">
            <option>02</option>
            <option>070</option>
            <option>031</option>
            <option>032</option>
            <option>033</option>
            <option>034</option>
          </select>
          <input type="text" className="phoneSecond" />-
          <input type="text" className="phoneThird" />
        </section>

        <section className="phoneLine">
          <div className="phone">Mobile Phone</div>
          <select name="phone" className="phoneSelect">
            <option>010</option>
            <option>011</option>
            <option>016</option>
            <option>017</option>
            <option>018</option>
            <option>019</option>
          </select>
          <input type="text" className="phoneSecond" />-
          <input type="text" className="phoneThird" />
        </section>

        <section className="emailLine">
          <div className="email">E-Mail</div>
          <input type="text" className="emailInput" />
        </section>

        <title className="addInformation">
          <h2>추가정보</h2>
        </title>
        <section className="birthdayLine">
          <div className="birthday">E-Mail</div>
          <input type="text" className="birthdayYear" />
          년
          <input type="text" className="birthdayMonth" />
          월
          <input type="text" className="birthdayDate" />일
          <div className="birthdayRadio">
            <input type="radio" name="birthday" />
            <label>양력</label>
            <input type="radio" name="birthday" />
            <label>음력</label>
          </div>
        </section>

        <title className="agreement">
          <h2>전체 동의</h2>
        </title>
        <section className="agreementBox">
          <div className="allAgreement">
            <input type="checkbox" />
            <div>
              이동약관 및 개인정보수집 및 이용,쇼핑정보 수신(선택)에 모두 동의
              합니다.
            </div>
          </div>
          {list.map((item, i) => {
            return <Agreement key={i} item={item} />;
          })}
          {/* <Agreement
            description="[필수]이용약관 동의"
            agreeCheck="이용약관에 동의하십니까?"
          />
          <Agreement
            description="[필수]개인정보 수집 및 이용 동의"
            agreeCheck="개인정보 수집 및 이용에 동의하십니까?"
          />
          <Agreement
            description="[선택]쇼핑정보 수신 동의"
            agreeCheck="이메일 수신을 동의하십니까?"
          /> */}
        </section>
        <button className="signupBtn">회원가입</button>
      </main>
    </div>
  );
};

export default Signup;