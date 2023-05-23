import { Outlet, Link, useParams } from "react-router-dom";
import React,{useState,createContext, useEffect} from 'react';
import {  useNavigate } from "react-router-dom";
import SignIn from "./signIn";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser=JSON.parse(localStorage.getItem("current user"));
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link key="info" to={`/users/${id}/info`}>Info</Link>
          </li>
          <li>
            <Link key="todos" to={`/users/${id}/todos`}>Todos</Link>
          </li>
          <li>
            <Link key="posts" to={`/users/${id}/posts`}>Posts</Link>
          </li>
          <li>
            <Link key="albums" to={`/users/${id}/albums`}>Albums</Link>
          </li>
          <li>
            <Link key="login" to="/login" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </nav>

      {currentUser.name}

      <Outlet />


    </>
  )
};

export default Layout;
