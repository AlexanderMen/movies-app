export default class MoviedbService {
	apiBase = 'https://api.themoviedb.org/3/';
	
	apiKey = 'api_key=398805f685df0eb9a7acae78f75ecd71';

  async getMovies(queryString, page) {
    const resp = await fetch(`${this.apiBase}search/movie?${this.apiKey}&page=${page}&query=${queryString}`);

    if (!resp.ok) throw new Error(`Couldn't fetch movie, status: ${resp.status}`);
		const searchResults = await resp.json();
    return searchResults;
  }
	
	async getGenresList() {
		const resp = await fetch(`${this.apiBase}genre/movie/list?${this.apiKey}`);
		
		if (!resp.ok) throw new Error(`Couldn't fetch genres, status: ${resp.status}`);
		const results = await resp.json();
    return results.genres;
	}
	
	async startGuestSession() {
		const resp = await fetch(`${this.apiBase}authentication/guest_session/new?${this.apiKey}`);
		
		if (!resp.ok) throw new Error(`Couldn't fetch guest session, status: ${resp.status}`);
		const results = await resp.json();
    return results;
	}
	
	async getMoviesRated(guestSessionId, page) {
		const resp = await fetch(`${this.apiBase}guest_session/${guestSessionId}/rated/movies?${this.apiKey}&page=${page}`);
		
		if (!resp.ok) throw new Error(`Couldn't fetch rated movies, status: ${resp.status}`);
		const results = await resp.json();
    return results;
	}
	
	async setMovieRating(value, id, guestSessionId) {
		const movieRating = {
			value
		};
		const postObj = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(movieRating)
		};
		
		const resp = await fetch(`${this.apiBase}movie/${id}/rating?${this.apiKey}&guest_session_id=${guestSessionId}`, postObj);
		
		if (!resp.ok) throw new Error(`Couldn't fetch to rate movie, status: ${resp.status}`);
		
		const results = await resp.json();
		if(!results.success) throw new Error(`Couldn't rate a movie`);
	}

  overviewCutting(text) {
    if (text.length < 204) return text;

    const newText = text[203] === ' ' ? text.slice(0, 202) : text.slice(0, text.lastIndexOf(' ', 202));

    return `${newText} ...`;
  }
}
