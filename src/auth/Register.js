import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import styled from 'styled-components';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
      padding-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
`
const Title = styled.h2`
      width: 80vw;
      max-width: 400px;
      text-align: center;
      padding: 0 16px;
      margin: 0 ;
`
const Form = styled.form`
      width: 80vw;
      max-width: 400px;
	margin: 0px auto;
	padding: 16px;
      background: #F7F7F7;
      
      input{
            outline: none;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            width: 100%;
            background: #fff;
            margin-bottom: 4%;
            border: 1px solid #ccc;
            padding: 3%;
            color: #555; 
      }

      input:focus{
            box-shadow: 0 0 5px #4196f2;
	      padding: 3%;
	      border: 1px solid #4196f2;
      }
`

const Submit = styled.button`
      box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 100%;
	padding: 3%;
	background: #43D1AF;
	border-bottom: 2px solid #30C29E;
	border-top-style: none;
	border-right-style: none;
	border-left-style: none;	
      color: #fff;
      transition: ease-in-out 0.2s;
      cursor: pointer;
      &:hover{
            background: #2EBC99;
      }
`
const Error = styled.div`
      color: tomato;
      width: 100%;
      padding: 3%;
      text-align: center;
      
      .clearError{
            margin-left: 10px;
            background: none;
            color: tomato;
            cursor: pointer;
            border: 1px solid black;
            border-radius: 3px;
      }
`

const Register = () => {
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();
      const [passwordCheck, setPasswordCheck] = useState();
      const [displayName, setDisplayName] = useState();
      const history = useHistory();
      const { setUserData } = useContext(UserContext);
      const [error, setError] = useState();

      const submit = async (e) => {
            e.preventDefault();

            try {
                  const newUser = { email, password, passwordCheck, displayName };
                  const registerResponse = await Axios.post(
                        'http://localhost:5000/users/register',
                        newUser
                  );
                  const loginResponse = await Axios.post('http://localhost:5000/users/login', {
                        email,
                        password,
                  });
                  setUserData({
                        token: loginResponse.data.token,
                        user: loginResponse.data.user,
                  });
                  localStorage.setItem("auth-token", loginResponse.data.token);
                  history.push("/");
            } catch (err) {
                  err.response.data.msg && setError(err.response.data.msg);
            }
      }
      return (
            <Wrapper>
                  <Title>Register</Title>

                  <Form>
                        <label htmlFor="register-email">Email</label>
                        <input id="register-email" type="text" onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />

                        <label htmlFor="verifyPassword">Verify Password</label>
                        <input id="verifyPassword" type="password" onChange={(e) => setPasswordCheck(e.target.value)} />

                        <label htmlFor="displayName">Display Name</label>
                        <input id="displayName" type="text" onChange={(e) => setDisplayName(e.target.value)} />
                        {error && <Error>{error} <button className="clearError" onClick={() => setError(undefined)}>X</button></Error>}
                        <Submit type="submit" onClick={submit}>Register</Submit>
                  </Form>
            </Wrapper>
      );
}

export default Register;