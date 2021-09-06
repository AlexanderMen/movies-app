import React, { Component } from 'react';
import './App.css';

import MoviedbService from '../../services/MoviedbService';
import MoviesList from '../MoviesList';
import { GenresProvider } from '../GenresContext';

export default class App extends Component {
	
	state = {
		guestSessionId: null,
		results: null,
		totalPages: null,
		totalResults: null,
		minValue: 0,
		maxValue: 6,
		ratedResults: null,
		totalRatedPages: null,
		totalRatedResults: null,
		minValueRated: 0,
		maxValueRated: 6,
		error: false,
		userInputValue: '',
		pageContent: 'search',
	};
	
	moviedbService = new MoviedbService();
	
	componentDidMount() {
		this.moviedbService.startGuestSession()
			.then(({guest_session_id: guestSessionId}) => {
				this.setState({guestSessionId});
				return this.moviedbService.getGenresList();
			})
			.then((genres) => this.setState({genres}))
			.catch(this.errorCase)
	}
	
	componentDidUpdate(prevProps, prevState) {
		const { results, ratedResults, totalResults, totalRatedResults, userInputValue, minValue, maxValue, minValueRated, maxValueRated } = this.state;
		
		if(prevState.userInputValue !== userInputValue && userInputValue) this.getResults(this.getSearchResults, 1, 0, 6)
		
		if(prevState.minValue !== minValue && results) {
			const moviesResults = results.slice(minValue, maxValue);
			
			if(moviesResults.length < 6 && results.length < totalResults) {
				const page = Math.trunc((maxValue / 20) + 1);
				const lastReceivedPage = Math.ceil(results.length / 20);
				
				if(lastReceivedPage + 1 !== page) {
					this.receivingPages(page, lastReceivedPage, minValue, maxValue);
				} else {
					this.getResults(this.getSearchResults, page, minValue, maxValue)
				};
			};
		};
		
		if(prevState.minValueRated !== minValueRated && ratedResults) {
			const moviesResults = ratedResults.slice(minValueRated, maxValueRated);
			
			if(moviesResults.length < 6 && ratedResults.length < totalRatedResults) {
				const page = Math.trunc((minValueRated / 20) + 1);
				this.getResults(this.getRatedResults, page, minValueRated, maxValueRated, true);
			};
		};
	}
	
	receivingPages = async (page, lastReceivedPage, minValue, maxValue) => {
		const currentReceivingPage = lastReceivedPage + 1;
		await this.getResults(this.getSearchResults, currentReceivingPage, minValue, maxValue);
		
		if(currentReceivingPage !== page) this.receivingPages(page, currentReceivingPage, minValue, maxValue)
	};
	
	getSearchResults = (page) => {
		const { userInputValue } = this.state;
		
		return this.moviedbService.getMovies(userInputValue, page)
	};
	
	getRatedResults = (page) => {
		const { guestSessionId } = this.state;
		
		return this.moviedbService.getMoviesRated(guestSessionId, page)
	};
	
	changeContentType = value => this.setState({pageContent: value});
	
	rateFilm = () => {
		const { guestSessionId, minValueRated, maxValueRated } = this.state;
		
		if(guestSessionId) this.getResults(this.getRatedResults, 1, minValueRated, maxValueRated, true)
	};
	
	onUserInput = value => {
		this.setState({
			userInputValue: value,
			results: null,
			minValue: 0,
			maxValue: 6,
		});
	};
	
	setMovieRating = async (value, id) => {
		const { guestSessionId } = this.state;
		
		await this.moviedbService.setMovieRating(value, id, guestSessionId);
		this.rateFilm();
	};
	
	getResults = (func, page, minValue, maxValue, isRated) => {
		func(page)
			.then((searchResults) => {
				this.setState((state) => {
					const getNewResults = () => {
						const newResults = searchResults.results;
						if(isRated) return newResults
						
						const oldResults = state.results;
						return !oldResults ? newResults : oldResults.concat(newResults);
					};
					
					const results = getNewResults();
					
					if(isRated) {return {ratedResults: results,
															 totalRatedPages: Math.ceil(searchResults.total_results / 6),
															 totalRatedResults: searchResults.total_results,
															 minValueRated: minValue,
															 maxValueRated: maxValue,
															};
											};
					
					return {results,
									totalPages: Math.ceil(searchResults.total_results / 6),
									totalResults: searchResults.total_results,
									minValue,
									maxValue,
								 };
				});
			})
			.catch(this.errorCase);
	};
	
	handleChange = value => {
		this.setState((state) => {
			if(state.pageContent === 'rated') {
				return {
					minValueRated: value * 6 - 6,
					maxValueRated: value * 6,
				};
			};
			
			return {
				minValue: value * 6 - 6,
				maxValue: value * 6,
			};
		});
	};
	
	errorCase = () => {
		this.setState({ error: true });
	};
	
	render() {
		const { results, error, userInputValue, totalPages, totalResults, ratedResults, totalRatedPages, totalRatedResults, pageContent, minValue, maxValue, minValueRated, maxValueRated, guestSessionId, genres } = this.state;
		
		return (
			<GenresProvider value={genres}>
				<MoviesList
					results={results}
					totalPages={totalPages}
					totalResults={totalResults}
					minValue={minValue}
					maxValue={maxValue}
					ratedResults={ratedResults}
					totalRatedPages={totalRatedPages}
					totalRatedResults={totalRatedResults}
					minValueRated={minValueRated}
					maxValueRated={maxValueRated}
					error={error}
					overviewCutting={this.moviedbService.overviewCutting}
					setMovieRating={this.setMovieRating}
					onUserInput={this.onUserInput}
					userInputValue={userInputValue}
					handleChange={this.handleChange}
					changeContentType={this.changeContentType}
					rateFilm={this.rateFilm}
					pageContent={pageContent}
					guestSessionId={guestSessionId} />
			</GenresProvider>
		);
	}
};

