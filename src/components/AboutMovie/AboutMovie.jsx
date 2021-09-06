import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import { format } from 'date-fns';
import './AboutMovie.css';

export default class AboutMovie extends Component {
	
	static defaultProps = {
		releaseDate: null,
		movieGenreIds: [],
		movieRating: null,
	};
	
	static propTypes = {
		title: PropTypes.string.isRequired,
		releaseDate: PropTypes.string,
		overview: PropTypes.string.isRequired,
		setMovieRating: PropTypes.func.isRequired,
		id: PropTypes.number.isRequired,
		movieGenreIds: PropTypes.arrayOf(PropTypes.number),
		genres: PropTypes.arrayOf(PropTypes.object).isRequired,
		movieRating: PropTypes.number,
	};
	
	state = {
		movieRatingFromState: 0,
	};
	
	onRateFilm = value => {
		const { setMovieRating, id } = this.props;
		
		this.setState({movieRatingFromState: value});
		setMovieRating(value, id);
	};
		
	render() {
		const { title, releaseDate, overview, movieGenreIds, genres, movieRating } = this.props;
		const { movieRatingFromState } = this.state;
		let date = null;
		let ratingClass = 'rating';
		
		if(releaseDate) date = format(new Date(releaseDate), 'MMMM dd, yyyy')
		
		let movieGenres = null;
		if(movieGenreIds && movieGenreIds.length) {
				const movieGenresName = movieGenreIds.map(movieId => {
				const movieGenre = genres.find(genre => movieId === genre.id);
				return movieGenre.name;
			});
			
			movieGenres = movieGenresName.map(movieGenre => <span className='genre' key={Math.random()}>{movieGenre}</span>);
		};
		
		let rating = null;
		if(!movieRatingFromState && !movieRating) rating = 0
		if(movieRatingFromState > 0) rating = movieRatingFromState
		if(!movieRatingFromState && movieRating) rating = movieRating
		
		if(rating < 5 && rating > 2) {
			ratingClass = `${ratingClass} rating_3-5`;
		} else if(rating < 7 && rating > 4) {
			ratingClass = `${ratingClass} rating_5-7`;
		} else if(rating > 6) {
			ratingClass = `${ratingClass} rating_7`;
		};
																				
		return (
			<div className='about_movie'>
				<div className='title_and_rating_wrapper'>
					<h1>{title}</h1>
					<div className={ratingClass}>{!rating ? 0 : rating}</div>
				</div>
				<p className='release-date'>{date}</p>
				<p className='genres_wrapper'>
					{movieGenres}
				</p>
				<p>{overview}</p>
				<Rate className='rate' allowHalf count={10} onChange={this.onRateFilm} value={rating} />
			</div>
		);
	}	
};
	
