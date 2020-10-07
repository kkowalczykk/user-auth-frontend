import Axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from './context/UserContext';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
`

const TodoBox = styled.div`
      width: 90%;
      margin: 10px 0;
      height: 60px;
      background-color: rgb(245, 251, 255);
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media screen and (min-width: 768px){
            width: 60%;
      }

      p{
            margin: 5px 10px;
            margin: 10px 0;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
      }
`

const PostButton = styled.button`
      box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 80px;
      padding: 5px;
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

const NewTodoBox = styled.div`
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: center;
      input{
            outline: none;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            width: calc(90% - 80px);
            height: 100%;
            background: #fff;
            border: 1px solid #ccc;
            padding: 5px;
            color: #555; 
      }

      input:focus{
            box-shadow: 0 0 5px #4196f2;
	      border: 1px solid #4196f2;
      }
`

const rotate = keyframes`
      from {
            transform: rotate(0deg);
      }
      to{
            transform: rotate(360deg);
      }
`;

const Loader = styled.div`
      width: 50px;
      height: 50px;
      border: 2px solid blue;
      border-radius: 50%;
      position: relative;
      animation: ${rotate} 1.5s linear infinite;
      &::after{
            width: 25px;
            height: 25px;
            background-color: white;
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
      }
      
`

const DoneButton = styled.button`
      width: 50px;
      height: 25px;
      background-color: rgb(45, 82, 207);
      margin-right: 10px;
      color: white;
      border: none;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover{
            background-color: rgb(19, 50, 156);
      }
`

const Home = () => {

      const { userData } = useContext(UserContext);
      const history = useHistory();
      const [todos, setTodos] = useState('loading');
      const [newTodo, setNewTodo] = useState('');

      useEffect(() => {
            if (!userData.user) history.push('/login');
            else {
                  setTimeout(() => loadTodos(), 800);

            }
      }, [userData]);

      const loadTodos = async () => {
            try {
                  const todosResponse = await Axios.get('http://localhost:5000/todos/all', {
                        headers: {
                              "x-auth-token": userData.token
                        }
                  });
                  setTodos(todosResponse.data);

            } catch (err) {
                  console.log(err);
            }
      }

      const postTodo = async () => {
            try {
                  const todosResponse = await Axios.post('http://localhost:5000/todos/', { "title": newTodo }, {
                        headers: {
                              "x-auth-token": userData.token
                        }
                  });
                  loadTodos();

            } catch (err) {
                  console.log(err);
            }
      }

      const deleteTodo = async (todo) => {
            try {
                  const todosResponse = await Axios.delete(`http://localhost:5000/todos/${todo._id}`, {
                        headers: {
                              "x-auth-token": userData.token
                        }
                  });
                  loadTodos();

            } catch (err) {
                  console.log(err);
            }
      }



      return (
            <Wrapper>
                  {userData.user ? <h1>Welcome <span style={{ color: 'blue' }}>{userData.user.displayName}</span></h1> : null}
                  {userData.user ? <NewTodoBox><input value={newTodo} onChange={e => setNewTodo(e.target.value)}></input><PostButton onClick={postTodo}> Add Todo</PostButton></NewTodoBox> : null}
                  {todos === 'loading' ? <Loader></Loader> :
                        todos.map((todo, id) =>
                              <TodoBox key={id}>
                                    <p>{todo.title}</p>
                                    <DoneButton onClick={() => deleteTodo(todo)}>Done</DoneButton>
                              </TodoBox>
                        )
                  }
            </Wrapper>
      );
}

export default Home;