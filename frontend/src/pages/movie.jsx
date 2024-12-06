import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from '../components/yt';
import Loading from '../components/loading';

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error loading data:", error));
  }, [id]);

  if (!movie) {
    return <Loading />;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div onClick={openModal} className="relative w-full h-[60vh] cursor-pointer">
        <iframe
          width="100%"
          height="100%"
          src={movie.trailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full object-cover"
        ></iframe>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="absolute bottom-8 left-8 text-white text-5xl font-bold">{movie.title}</h1>
      </div>

      <div className="max-w-5xl mx-auto p-4">
        <div className="flex justify-between text-lg font-medium mt-4">
          <div>{movie.genre.join(' | ')}</div>
          <div>{movie.language}</div>
          <div>{formatDate(movie.date)}</div>
          <div>{movie.duration}</div>
        </div>

        <p className="text-gray-700 text-center mt-6 text-lg">{movie.description}</p>

        <div className="flex justify-center mt-8">
          <Link to={'/buy/'+ id} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg">
            Book Tickets
          </Link>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <iframe
          width="100"
          height="100"
          src={movie.trailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </Modal>
    </>
  );
}

export default Movie;