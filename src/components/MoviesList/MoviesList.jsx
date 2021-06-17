import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spin } from 'antd';
import 'antd/dist/antd.css';
import './MoviesList.css';

import Poster from '../Poster';
import AboutMovie from '../AboutMovie';
import ErrorMessage from '../ErrorMessage';

const MoviesList = ({ results, error, overviewCutting }) => {
	let firstPageResults = [1, 2, 3, 4, 5, 6];
	if(results) firstPageResults = results.slice(0, 6)
	
	const getMovieItem = (content, id) => (
			<Col
				span={12}
				key={id}>
				<div className='movie-item'>
					{content}
				</div>
			</Col>
		)
	
	const moviesListElems = error ? <ErrorMessage /> : firstPageResults.map((movie, index) => {
		const spinner = (
			<div className='spinner-wrapper'>
				<Spin size="large" />
			</div>
		);
		
		if(!results) return getMovieItem(spinner, index)
		
		const posterPath = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
		const {title, overview} = movie;
		const releaseDate = movie.release_date;
		const movieItemContent = !results ? <Spin /> : <MovieItemContent posterPath={posterPath} title={title} releaseDate={releaseDate} overview={overview} overviewCutting={overviewCutting} />;
		
		return getMovieItem(movieItemContent, movie.id);
	});
	
	return (
		<div className='movie-list'>
			<Row>
				{moviesListElems}
			</Row>
		</div>
	);
};

MoviesList.defaultProps = {
	results: null,
};

MoviesList.propTypes = {
	results: PropTypes.arrayOf(PropTypes.object),
	error: PropTypes.bool.isRequired,
	overviewCutting: PropTypes.func.isRequired,
};

const MovieItemContent = ({ posterPath, title, releaseDate, overview, overviewCutting}) => (
	<Row>
		<Col span={10}>
			<Poster posterPath={posterPath} />
		</Col>

		<Col span={14}>
			<AboutMovie 
				title={title}
				releaseDate={releaseDate}
				overview={overviewCutting(overview)}
			/>
		</Col>
	</Row>);

MovieItemContent.propTypes = {
	posterPath: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	releaseDate: PropTypes.string.isRequired,
	overview: PropTypes.string.isRequired,
	overviewCutting: PropTypes.func.isRequired,
};

export default MoviesList;

