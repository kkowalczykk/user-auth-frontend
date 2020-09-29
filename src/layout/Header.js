import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthOptions from '../auth/AuthOptions';

const Wrapper = styled.div`
      display: flex;
      height: 70px;
      align-items: center;
      justify-content: space-between;
      background-color: rgb(68, 150, 227);
`

const StyledLink = styled(Link)`
      text-decoration: none;
`

const StyledH = styled.h1`
      font-size: 1.2em;
      color: white;
      margin:0 10px;
`

const Header = () => {
      return (
            <Wrapper>
                  <StyledLink to="/"><StyledH>User authentication system</StyledH></StyledLink>
                  <AuthOptions></AuthOptions>
            </Wrapper>
      );
}

export default Header;