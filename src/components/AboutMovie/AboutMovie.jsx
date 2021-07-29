import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import { format } from 'date-fns';
import './AboutMovie.css';

const AboutMovie = ({ title, releaseDate, overview, setMovieRating, id, movieRating, movieGenreIds, genres }) => {
	let date = null;
	let ratingClass = 'rating';
	const onRateFilm = value => setMovieRating(value, id);
	
	if(releaseDate) date = format(new Date(releaseDate), 'MMMM dd, yyyy')
	
	if(movieRating < 5 && movieRating > 2) {
		ratingClass = `${ratingClass} rating_3-5`;
	} else if(movieRating < 7 && movieRating > 4) {
		ratingClass = `${ratingClass} rating_5-7`;
	} else if(movieRating > 6) {
		ratingClass = `${ratingClass} rating_7`;
	};
	
	let movieGenres = null;
	if(movieGenreIds.length) {
			const movieGenresName = genres.map(genre => {
			const movieGenre = movieGenreIds.find(movieId => movieId === genre.id);
			if(movieGenre) return movieGenre.name
			return null;
		});
		
		movieGenres = movieGenresName.map((movieGenre) => <span className='genre' key={Math.random()}>{movieGenre}</span>);
	};
	
	return (
		<div className='about_movie'>
			<div className='title_and_rating_wrapper'>
				<h1>{title}</h1>
				<div className={ratingClass}>{!movieRating ? 0 : movieRating}</div>
			</div>
			<p className='release-date'>{date}</p>
			<p>
				{movieGenres}
			</p>
			<p>{overview}</p>
			<Rate className='rate' allowHalf count={10} onChange={onRateFilm} value={movieRating} />
		</div>
	);
};

AboutMovie.defaultProps = {
	movieRating: null,
	releaseDate: null,
	genres: [],
};

AboutMovie.propTypes = {
  title: PropTypes.string.isRequired,
	releaseDate: PropTypes.string,
  overview: PropTypes.string.isRequired,
	setMovieRating: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	movieRating: PropTypes.number,
	movieGenreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
	genres: PropTypes.arrayOf(PropTypes.object),
};

export default AboutMovie;
