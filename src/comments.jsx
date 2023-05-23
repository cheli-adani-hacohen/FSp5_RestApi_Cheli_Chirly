import { useParams ,useLocation} from "react-router-dom";
import React, { useState, useEffect  } from 'react';
import './App.css'

export default function Comments() {
  const { id, postid } = useParams();
  const [items, setItems] = useState([]);
  const location = useLocation();

  const selectedItem = location.state && location.state.selectedItem;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postid}`)
      .then(response => response.json())
      .then(json => setItems(json))
  }, []);
 
  const filteredItems = items.filter(item => {
    return item.postId === parseInt(postid);
  });

  return (
    <div>
      <h1>Comments for post {postid} by user {id}</h1>
      {selectedItem && <pre>{selectedItem.title}</pre>}
      {filteredItems.map(item => {
        return (
        <>
          <strong>name:</strong> {item.name}
          <pre>{item.body}</pre>
        </>)
      })}
    </div>
  );
};

// export default Comments;