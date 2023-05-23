import React,{useState,useEffect} from 'react';
import { Outlet, useParams, useNavigate} from "react-router-dom";

import './styles/Albums.css'

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./pages";;


export default function App(){

  const [albums, setAlbums] = useState([]);
  const { id: userId } = useParams();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then(response => response.json())
      .then((json) => {
        setAlbums(json);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [userId]);  



  const handleChangeOrder = ()=>{
    const sortedAlbums = albums.sort((a, b) => a.title.localeCompare(b.title));
    setAlbums(sortedAlbums);
  }

  return(
    <>
      <h1>Albums</h1>
      <button onClick={handleChangeOrder}>Hi!!!</button>
      {albums.map(item=>
       <AlbumComponent
        key={item.id}
        album={item}
        />
      )}
      <Outlet/>
    </>
  );
}

const AlbumComponent = ({album}) => {
  const navigate = useNavigate();
  const [albumImage, setAlbumImage] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`)
      .then(response => response.json())
      .then((photos) => {
        setAlbumImage(photos[0]);
      })
      .catch((err) => {
        console.log(err);
      })
  }, );  

    const handleNavigation = () => {
    navigate(`/users/${album.userId}/albums/${album.id}`);
  };


  return (
    <div className="gallery" onClick={handleNavigation}>
      <img src={albumImage.thumbnailUrl} alt="Illustrative img" width="600" height="400"/>
    <div className="desc">{album.title}</div>
  </div>
  );
}

//Illustrative image
//https://reactjsexample.com/react-photo-album-a-responsive-photo-gallery-component-for-react/