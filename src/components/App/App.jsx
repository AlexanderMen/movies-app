import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import MoviedbService from '../../services/MoviedbService.js';
import MoviesList from '../MoviesList';

export default class App extends Component {
	
	state = {
		results: null,
	};
	
	constructor() {
		super();
		this.getSearchResults();
	}
	
	moviedbService = new MoviedbService();
	
	getSearchResults() {
		this.moviedbService.getMovies('return')
			.then((results) => {
				this.setState({
					results
				});
			});
	}
	
	render() {
		const { results } = this.state;
		
		return (
			<MoviesList
				results={results}
				overviewCutting={this.moviedbService.overviewCutting} />
		);
	}
};

