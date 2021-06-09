import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Space } from 'antd';
import 'antd/dist/antd.css';
import './MoviesList.css';

import Poster from '../Poster';
import AboutMovie from '../AboutMovie';

const MoviesList = ({ results, overviewCutting }) => {
	if(!results) return '...loading'
	
	const firstPageResults = results.slice(0, 6);
	const moviesListElems = firstPageResults.map((movie) => {
		const posterPath = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
		
		return (
			<Col
				span={12}
				key={movie.id}>
				<div className='movie-item'>
					<Row>
						<Col span={10}>
							<Poster posterPath={posterPath} />
						</Col>

						<Col span={14}>
							<AboutMovie 
								title={movie.title}
								releaseDate={movie.release_date}
								overview={overviewCutting(movie.overview)}
							/>
						</Col>
					</Row>
				</div>
			</Col>
		);
	});
	
	return (
		<div className='movie-list'>
			<Row>
				{moviesListElems}
			</Row>
		</div>
	);
};

export default MoviesList;

