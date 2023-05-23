import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './App.css'

export default function Info() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`)
      .then(response => response.json())
      .then(json => setItem(json[0])) // Utilisez json[0] pour récupérer le premier élément de la réponse JSON
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h2>Info</h2>
      <div className='info'>
        <div className="info-item">
          <span className="info-label">name:</span>
          <span className="info-value">{item.name}</span>
        </div>
        <div className="info-item">
          <span className="info-label">username:</span>
          <span className="info-value">{item.username}</span>
        </div>
        <div className="info-item">
          <span className="info-label">email:</span>
          <span className="info-value">{item.email}</span>
        </div>
        <div className="address">
          <span className="address-label">address:</span>
          <div className="address-value">
            <div>
              <span className="info-label">street:</span>
              <span className="info-value">{item.address?.street}</span>
            </div>
            <div>
              <span className="info-label">suite:</span>
              <span className="info-value">{item.address?.suite}</span>
            </div>
            <div>
              <span className="info-label">city:</span>
              <span className="info-value">{item.address?.city}</span>
            </div>
            <div>
              <span className="info-label">zipcode:</span>
              <span className="info-value">{item.address?.zipcode}</span>
            </div>
            <div>
              <span className="info-label">geo lalitude:</span>
              <span className="info-value">{item.address?.geo?.lat}</span>
            </div>
            <div>
              <span className="info-label">geo longitude:</span>
              <span className="info-value">{item.address?.geo?.lng}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}