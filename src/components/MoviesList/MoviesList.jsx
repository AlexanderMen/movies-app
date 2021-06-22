import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spin, Pagination } from 'antd';
import 'antd/dist/antd.css';
import './MoviesList.css';

import SearchElem from '../SearchElem';
import Poster from '../Poster';
import AboutMovie from '../AboutMovie';
import ErrorMessage from '../ErrorMessage';

export default class MoviesList extends Component {
	
	state = {
		minValue: 0,
		maxValue: 6,
	};
	
	static defaultProps = {
		results: null,
	};
	
	static propTypes = {
		results: PropTypes.arrayOf(PropTypes.object),
		error: PropTypes.bool.isRequired,
		overviewCutting: PropTypes.func.isRequired,
		userInputValue: PropTypes.string.isRequired,
		onUserInput: PropTypes.func.isRequired,
	};
	
	handleChange = value => this.setState({
			minValue: value * 6 - 5,
			maxValue: value * 6 + 1,
		})
	
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
		const { onUserInput, userInputValue, results } = this.props;
		const noPagination = !results || (results && !results.length) || !userInputValue;
		const pagination = noPagination ? null : (<Col className="paginationWrapper"
																									 span={23}>
																								<Pagination defaultCurrent={1}
																														defaultPageSize={6}
																														onChange={this.handleChange}
																														total={results.length} />
																							</Col>);
		
		return (
			<div className='movie-list'>
				<Row>
					<SearchElem onUserInput={onUserInput} />
					{elems}
				</Row>
				<Row>
					{pagination}
				</Row>
			</div>
		);
	};
	
	render() {
		const { results, error, userInputValue, overviewCutting } = this.props;
		const badSearch = <ErrorMessage
											message="The search did't give any results..."
											description="The search did't give any results, try another one :)" />;
		const err = <ErrorMessage
								message="Something goes wrong..."
								description="Something goes wrong, but our cinema operator is already fixing it!" />;
		const { minValue, maxValue } = this.state;
		
		if(results && !results.length) return this.movieList(badSearch)

		let moviesResults = [1, 2, 3, 4, 5, 6];
		if(results) moviesResults = results.slice(minValue, maxValue)

		if(!userInputValue) return this.movieList(null)

		const moviesListElems = error ? err : moviesResults.map((movie, index) => {
			const spinner = (
				<div className='spinner-wrapper'>
					<Spin size='large' className='spinner' />
				</div>
			);

			if(!results) return this.getMovieItem(spinner, index)

			const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : '';
			const {title, overview} = movie;
			const releaseDate = movie.release_date;
			const movieItemContent = <MovieItemContent posterPath={posterPath} title={title} releaseDate={releaseDate} overview={overview} overviewCutting={overviewCutting} />;

			return this.getMovieItem(movieItemContent, movie.id);
		});

		return this.movieList(moviesListElems);
	}
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

