import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// import Layout from "./pages";
// import Home from "./home";

export default function App() {
  const [todosList, setTodosList] = useState([]);
  const { id: userId } = useParams();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then(response => response.json())
      .then((data) => {
        const list = data.filter((item) => item.userId === parseInt(userId));
        setTodosList(list);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [userId]);


  const updateElement = (id, isChecked) => {
    // console.time("timer1");

    const index = todosList.findIndex((item) =>
    item.id === id);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: isChecked,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // alert(JSON.stringify(data));
  const updatedList = todosList.toSpliced(index,1,data);
        setTodosList(updatedList);
        // console.timeEnd("timer1");

      })
      .catch((err) => {
        console.log(err);
      })
  };

  
  const handleChangeOrder = ()=>{
    const sortedAlbums = todosList.sort((a, b) => a.title.localeCompare(b.title));
    setTodosList(sortedAlbums);
  }

  return (
    <>
      <h1>Todos {userId} !</h1>
      <button onClick={handleChangeOrder}>Hi!!!</button>

      {todosList.map(item =>
      <div key={item.id}><ToDo 
      data={item}
      updateElement={updateElement}/>
      <br/>
      </div>
      )}
    </>
  )
}

const ToDo = ({ data, updateElement }) => {

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked ? true : false;
    updateElement(data.id, isChecked);
  };

  return (
    <label className='todos'>
      <input type="checkbox" checked={data.completed} onChange={handleCheckboxChange} />
      {data.title}
    </label>
  );
}

