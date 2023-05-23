import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";

import './App.css'

export default function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedItemComments, setSelectedItemComments] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("current user"));
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${currentUser.id}`)
      .then(response => response.json())
      .then(json => setItems(json))
  }, []);

  const handleClick = (item) => {
    if (selectedItem === item) {
      setSelectedItem('');
    } else {
      setSelectedItem(item);
    }
  };

  const handleClickComments = (item) => {
    if (selectedItemComments === item) {
      setSelectedItemComments(null);
      navigate(`/users/${item.userId}/posts`);
    } else {
      setSelectedItemComments(item);
      navigate(`/users/${item.userId}/posts/${item.id}/comments`);
    }
  };

  return (
    <>
      <h2>Posts</h2>
      {items.map(item => (
        <div className='post' key={item.id}>
          <div className={selectedItem === item ? 'selected' : ''}>
            <div className="post-title" onClick={() => handleClick(item)}>
              <strong>{item.title}</strong> <br /> <br />
              <span>{item.body}</span>
            </div>
          </div>

          <button className='post-buttons' onClick={() => handleClickComments(item)}>Comments</button>
          {item === selectedItemComments ? <Outlet /> : null}
        </div>
      ))}
    </>
  );
}