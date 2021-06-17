import React, { Component } from 'react';
import './App.css';

import MoviedbService from '../../services/MoviedbService';
import MoviesList from '../MoviesList';

export default class App extends Component {
	
	state = {
		results: null,
		error: false,
	};
	
	moviedbService = new MoviedbService();
	
	constructor() {
		super();
		this.getSearchResults();
	}
	
	getSearchResults() {
		this.moviedbService.getMovies('return')
			.then((results) => {
				this.setState({
					results
				});
			})
			.catch(this.errorCase);
	}
	
	errorCase = () => this.setState({error: true});
	
	render() {
		const { results, error } = this.state;
		
		return (
			<MoviesList
				results={results}
				error={error}
				overviewCutting={this.moviedbService.overviewCutting} />
		);
	}
};

