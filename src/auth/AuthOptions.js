import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../context/UserContext';


const Wrapper = styled.div`
      display: flex;
`
const Button = styled.button`
      background-color: rgb(45, 82, 207);
      color: white;
      width: 100px;
      height: 40px;
      border: none;
      margin-right: 10px;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover{
            background-color: rgb(19, 50, 156);
      }

      &:focus{
            outline: none;
      }

      @media screen and (max-width: 820px) {
            width: 70px;
            height: 30px;
      }
`


const AuthOptions = () => {

      const { userData, setUserData } = useContext(UserContext);

      const history = useHistory();

      const register = () => history.push('/register');
      const login = () => history.push('/login');
      const logout = () => {
            setUserData({
                  token: undefined,
                  user: undefined,
            });
            localStorage.setItem("auth-token", '');
      }

      return (
            <Wrapper>
                  {userData.user ?
                        <Button onClick={logout}> Log out</Button> :
                        <>
                              <Button onClick={login}>Log in</Button>
                              <Button onClick={register}>Register</Button>
                        </>
                  }
            </Wrapper>
      );
}

export default AuthOptions;