import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Album = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id: albumId } = useParams();
  const [start, setStart] = useState(0);

  const fetchMorePhotos = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_start=${start}&_limit=10`);
      const data = await response.json();

      setPhotos((prevPhotos) => {
        const filteredData = data.filter((photo) => !prevPhotos.some((prevPhoto) => prevPhoto.id === photo.id));
        return [...prevPhotos, ...filteredData];
      });

      setStart(photos.slice(-1)[0]?.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        fetchMorePhotos();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },);

  useEffect(() => {
    const fetchInitialPhotos = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_start=0&_limit=10`);
        const data = await response.json();

        setPhotos(data);
        setIsLoading(false);
        setStart(photos.slice(-1)[0]?.id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialPhotos();
  }, [albumId]);

  return (
    <div>
      <h1>Photo Gallery</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {photos.map((photo) => (
            <React.Fragment key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.albumId} + {photo.id}</p>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Album;

//work!