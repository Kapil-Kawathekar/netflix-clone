import axios from "axios";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import instance from "../../axios";
import "./Row.css";
import movieTrailer from "movie-trailer"
const baseImageUrl = "https://image.tmdb.org/t/p/original/";
const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      'origin': 'http://localhost:3000' 
    },
  };

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('')

  useEffect(() => {
    async function fetchData() {
      const requestsData = await instance.get(fetchUrl);
      //   console.log("Request Data", requestsData.data.results);
      setMovies(requestsData.data.results);
    }
    fetchData();
  }, [fetchUrl]);
  console.log("Movies : ", movies);

  const handleClick=(movie)=>{
      if(trailerUrl){
          setTrailerUrl('')
      }else{
          movieTrailer(movie?.name || movie?.title || movie?.original_title || "").then((url)=>{
              console.log("Yout tube url",url)
              const urlParams=new URLSearchParams(new URL(url).search)
              setTrailerUrl(urlParams.get('v'))
          }).catch(error=>console.log("Error in URL :",error))
      }

  }


  return (
    <div className="row">
      {/* title=Netflix Orginals */}
      <h2>{title}</h2>

      {/* container->posters */}

      <div className="row__posters">
        {/* several row posters */}

        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
            onClick={()=>{handleClick(movie)}}
            src={`${baseImageUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          ></img>
        ))}
      </div>
      {trailerUrl &&<YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}

export default Row;
