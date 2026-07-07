import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { useMovieContext } from '../contexts/MovieContext';
import '../css/MovieDetails.css';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                console.error("Failed to load movie details", err);
                setError("Failed to load movie details");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div className="movie-details-loading">Loading...</div>;
    if (error) return <div className="movie-details-error">{error}</div>;
    if (!movie) return <div className="movie-details-error">Movie not found</div>;

    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    return (
        <div className="movie-details-container">
            <div className="movie-details-backdrop" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                <div className="movie-details-overlay"></div>
            </div>
            
            <div className="movie-details-content">
                <div className="movie-details-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </div>
                
                <div className="movie-details-info">
                    <h1>{movie.title} <span className="movie-details-year">({movie.release_date?.split("-")[0]})</span></h1>
                    <p className="movie-details-tagline">{movie.tagline}</p>
                    
                    <div className="movie-details-meta">
                        <span className="movie-details-rating">⭐ {movie.vote_average?.toFixed(1)} / 10</span>
                        <span className="movie-details-runtime">{movie.runtime} min</span>
                        <span className="movie-details-genres">
                            {movie.genres?.map(genre => genre.name).join(', ')}
                        </span>
                    </div>

                    <div className="movie-details-overview">
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                    </div>

                    <button className={`favorite-btn-large ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        {favorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
