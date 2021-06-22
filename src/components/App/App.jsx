import React, { Component } from 'react';
import './App.css';

import MoviedbService from '../../services/MoviedbService';
import MoviesList from '../MoviesList';

export default class App extends Component {
	
	state = {
		results: null,
		error: false,
		userInputValue: '',
	};
	
	moviedbService = new MoviedbService();
	
	componentDidMount() {
	}
	
	componentDidUpdate(prevProps, prevState) {
		const { userInputValue } = this.state;
		if(prevState.userInputValue !== userInputValue && userInputValue) this.getSearchResults()
	}
	
	onUserInput = value => this.setState({ userInputValue: value });
	
	getSearchResults() {
		const { userInputValue } = this.state;
		
		this.moviedbService.getMovies(userInputValue)
			.then((results) => {
				this.setState({
					results
				});
			})
			.catch(this.errorCase);
	}
	
	errorCase = () => {
		this.setState({ error: true });
	};
	
	render() {
		const { results, error, userInputValue } = this.state;
		
		return (
			<MoviesList
				results={results}
				error={error}
				overviewCutting={this.moviedbService.overviewCutting}
				onUserInput={this.onUserInput}
				userInputValue={userInputValue} />
		);
	}
};

