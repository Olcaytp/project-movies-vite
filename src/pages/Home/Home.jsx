import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loading-icons';


import styles from "./Home.module.css";

export const Home = () => {
  const api_key = import.meta.env.VITE_API_KEY;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const OurMovieAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;

  useEffect(() => {
    const fetchMoviesList = async () => {
      try {
        const response = await fetch(OurMovieAPI);
        if (!response.ok) {
          throw new Error("Network Reponse Error");
        }
        const json = await response.json();
        setMovies(json);
        setLoading(false);
        console.log(json);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchMoviesList();
  }, []);

  //This will show "Loading..." to the user while data is being fetched from the API.
  if (loading) {
    return (
      <div className={styles.loading}>
        <ThreeDots className={styles.loadingIcon} />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.movielistContainer}>
        {movies &&
          movies.results &&
          movies.results.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className={styles.movielistBox}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
                <div className={styles.movieText}>
                  <h1> {movie.title}</h1>
                  <p>Released: {movie.release_date}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
