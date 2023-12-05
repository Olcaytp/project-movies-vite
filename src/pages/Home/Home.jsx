import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loading-icons';


import styles from "./Home.module.css";

export const Home = () => {
  const api_key = import.meta.env.VITE_API_KEY;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listType, setListType] = useState("popular"); // New state for list type
  const [loadedImages, setLoadedImages] = useState([]); // Initialize loadedImages state

  // Object mapping list types to their API endpoints
  const apiEndpoints = {
    popular: "popular",
    now_playing: "now_playing",
    top_rated: "top_rated",
    upcoming: "upcoming",
  };

  useEffect(() => {
    const fetchMoviesList = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${apiEndpoints[listType]}?api_key=${api_key}&language=en-US&page=1`
        );
        if (!response.ok) {
          throw new Error("Network Reponse Error");
        }
        const json = await response.json();
        setMovies(json);
        console.log(json);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching data:", error);
      }
    };

    fetchMoviesList();
  }, [api_key, listType]); // Adding listType as a dependency

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
    
    <div className={styles.Header}>
        <h1 className="Logo">Movies To Watch</h1>
        <select
          value={listType}
          onChange={(e) => setListType(e.target.value)}
          className={styles.MovieListDropdown}
        >
          <option value="popular">Popular</option>
          <option value="now_playing">Now Playing</option>
          <option value="top_rated">Top Rated</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

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
