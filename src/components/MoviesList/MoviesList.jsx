import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spin, Pagination } from 'antd';
import 'antd/dist/antd.css';
import './MoviesList.css';

import ShowingContentType from '../ShowingContentType';
import SearchElem from '../SearchElem';
import Poster from '../Poster';
import AboutMovie from '../AboutMovie';
import ErrorMessage from '../ErrorMessage';
import { GenresConsumer } from '../GenresContext';

export default class MoviesList extends Component {
	
	static defaultProps = {
		results: null,
		totalPages: null,
		totalResults: null,
		ratedResults: null,
		totalRatedPages: null,
		guestSessionId: null,
	};
	
	static propTypes = {
		results: PropTypes.arrayOf(PropTypes.object),
		totalPages: PropTypes.number,
		totalResults: PropTypes.number,
		ratedResults: PropTypes.arrayOf(PropTypes.object),
		totalRatedPages: PropTypes.number,
		error: PropTypes.bool.isRequired,
		overviewCutting: PropTypes.func.isRequired,
		setMovieRating: PropTypes.func.isRequired,
		userInputValue: PropTypes.string.isRequired,
		onUserInput: PropTypes.func.isRequired,
		handleChange: PropTypes.func.isRequired,
		changeContentType: PropTypes.func.isRequired,
		rateFilm: PropTypes.func.isRequired,
		pageContent: PropTypes.string.isRequired,
		minValue: PropTypes.number.isRequired,
		maxValue: PropTypes.number.isRequired,
		minValueRated: PropTypes.number.isRequired,
		maxValueRated: PropTypes.number.isRequired,
		guestSessionId: PropTypes.string,
	};
	
	getMovieItem = (content, id) => (
			<Col
				span={12}
				key={id}>
				<div className='movie-item'>
					{content}
				</div>
			</Col>
		)
	
	movieList = (elems) => {
		const { onUserInput, userInputValue, results, ratedResults, totalPages, totalRatedPages, handleChange, changeContentType, pageContent } = this.props;
		const noPaginationSearch = () => !results || (results && !results.length) || !userInputValue;
		const noPaginationRated = () => !ratedResults;
		const isRatedPageContent = pageContent === 'rated';
		
		const noPagination = isRatedPageContent ? noPaginationRated() : noPaginationSearch();
		
		const searchElem = isRatedPageContent ? null : (<SearchElem prevValue={userInputValue} onUserInput={onUserInput} />);
		
		const sumPages = isRatedPageContent ? totalRatedPages : totalPages;
		
		const pagination = noPagination ? null : (<Col className="paginationWrapper"
																									 span={23}>
																								<Pagination defaultCurrent={1}
																														onChange={handleChange}
																														total={sumPages * 10} />
																							</Col>);
		
		return (
			<div className='movie-list'>
				<Row>
					<ShowingContentType
						pageContent={pageContent}
						onChangeContentType={changeContentType} />
				</Row>
				<Row>
					{searchElem}
					{elems}
				</Row>
				<Row>
					{pagination}
				</Row>
			</div>
		);
	};
	
	showMovieListSearch = () => {
		const { results, ratedResults, error, userInputValue, overviewCutting, setMovieRating, totalResults, minValue, maxValue, rateFilm, guestSessionId } = this.props;
		const badSearch = <ErrorMessage
											message="The search did't give any results..."
											description="The search did't give any results, try another one :)" />;
		const err = <ErrorMessage
								message="Something goes wrong..."
								description="Something goes wrong, but our cinema operator is already fixing it!" />;
		
		if(totalResults === 0) return this.movieList(badSearch)

		let moviesResults = [1, 2, 3, 4, 5, 6];
		if(results) {
			moviesResults = results.slice(minValue, maxValue);
			};

		if(!userInputValue) return this.movieList(null)

		const moviesListElems = error ? err : moviesResults.map((movie, index) => {
			const spinner = (
				<div className='spinner-wrapper'>
					<Spin size='large' className='spinner' />
				</div>
			);

			if(!results) return this.getMovieItem(spinner, index)

			const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : '';
			const {title, overview, id} = movie;
			const releaseDate = movie.release_date;
			const movieGenreIds = movie.genre_ids;
			const ratedMovie = ratedResults ? ratedResults.find(item => item.id === id) : null;
			const movieRating = !ratedMovie ? null : ratedMovie.rating;
			
			const movieItemContent = <MovieItemContent posterPath={posterPath} title={title} releaseDate={releaseDate} overview={overview} overviewCutting={overviewCutting} setMovieRating={setMovieRating} rateFilm={rateFilm} id={id} guestSessionId={guestSessionId} movieRating={movieRating}  movieGenreIds={movieGenreIds} />;

			return this.getMovieItem(movieItemContent, id);
		});

		return this.movieList(moviesListElems);
	};
	
	showMovieListRated = () => {
		const { ratedResults, error, overviewCutting, setMovieRating, minValueRated, maxValueRated, rateFilm, guestSessionId } = this.props;
		const err = <ErrorMessage
								message="Something goes wrong..."
								description="Something goes wrong, but our cinema operator is already fixing it!" />;
		
		let moviesResults = null;
		if(ratedResults) {
			moviesResults = ratedResults.slice(minValueRated, maxValueRated);
			};
		
		if(!moviesResults) return this.movieList(null)
		
		const moviesListElems = error ? err : moviesResults.map((movie) => {
			const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : '';
			const {title, overview, rating } = movie;
			const releaseDate = movie.release_date;
			const movieGenreIds = movie.genre_ids;
			
			const movieItemContent = <MovieItemContent posterPath={posterPath} title={title} releaseDate={releaseDate} overview={overview} overviewCutting={overviewCutting} setMovieRating={setMovieRating} rateFilm={rateFilm} id={movie.id} guestSessionId={guestSessionId} movieGenreIds={movieGenreIds} movieRating={rating}/>;

			return this.getMovieItem(movieItemContent, movie.id);
		});

		return this.movieList(moviesListElems);
	};
	
	render() {
		const { pageContent } = this.props;
		const movieList = pageContent === 'search' ? this.showMovieListSearch() : this.showMovieListRated();
		
		return movieList;
	}
};


const MovieItemContent = ({ posterPath, title, releaseDate, overview, overviewCutting, setMovieRating, id, movieGenreIds, movieRating }) => (
	<Row>
		<Col span={10}>
			<Poster posterPath={posterPath} />
		</Col>

		<Col span={14}>
			<GenresConsumer>
				{
					(genres) => (
						<AboutMovie 
							title={title}
							releaseDate={releaseDate}
							overview={overviewCutting(overview)}
							setMovieRating={setMovieRating}
							id={id}
							movieGenreIds={movieGenreIds}
							genres={genres}
							movieRating={movieRating} />
					)
				}
			</GenresConsumer>
		</Col>
	</Row>);

MovieItemContent.defaultProps = {
	releaseDate: null,
	movieGenreIds: [],
	movieRating: null,
};

MovieItemContent.propTypes = {
	posterPath: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	releaseDate: PropTypes.string,
	overview: PropTypes.string.isRequired,
	overviewCutting: PropTypes.func.isRequired,
	setMovieRating: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	movieGenreIds: PropTypes.arrayOf(PropTypes.number),
	movieRating: PropTypes.number,
};

