import React, { useEffect, useState } from "react";
import instance from "../../axios";
import requests from "../../requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const requestData = await instance.get(requests.fetchNetflixOriginals);
      console.log(requestData.data.results.length);
      setMovie(
        requestData.data.results[
          Math.floor(Math.random() * requestData.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);
  console.log("From Banner", movie);
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.name || movie?.titile || movie?.original_name}
        </h1>
        <div className="banner__butttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">List</button>
        </div>
        <h1 className="banner__description">{movie?.overview}</h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
