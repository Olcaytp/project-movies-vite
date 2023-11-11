import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ThreeDots } from 'react-loading-icons';

import { MovieCard } from "../MovieCard/MovieCard.jsx";

import styles from "./MovieDetails.module.css";

export const MovieDetails = () => {
  const { id } = useParams(null);
  const api_key = import.meta.env.VITE_API_KEY;

  const OurMovieDetailAPI = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`;
  const [movie, setMovie] = useState();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(OurMovieDetailAPI);
        if (!response.ok) {
          throw new Error("Network Response Error");
        }
        const json = await response.json();
        setMovie(json);
        console.log("Updated movie state:", movie);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return (
      <div className={styles.loading}>
        <ThreeDots className={styles.loadingIcon} />
      </div>
    );
  }

  return (
    <>
      <div
        className={styles.movieContainer}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        }}
      >
        <div className={styles.movieContainerMovbtn}>
          <p className={styles.homelink}>
            <NavLink to="/">
              <AiOutlineArrowLeft className={styles.backArrow} />
              <span className={styles.moviesText}>Movies</span>
            </NavLink>
          </p>
        </div>
        <div>
          <MovieCard movie={movie} />
        </div>
      </div>
    </>
  );
};
