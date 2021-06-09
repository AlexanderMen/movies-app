export default class MoviedbService {
  apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=398805f685df0eb9a7acae78f75ecd71&page=1&query=';

  async getMovies(queryString) {
    const resp = await fetch(`${this.apiBase}${queryString}`);

    if (!resp.ok) throw new Error(`Couldn't fetch movie, status: ${resp.status}`);
    const searchResults = await resp.json();
    return searchResults.results;
  }

  overviewCutting(text) {
    if (text.length < 204) return text;

    const newText = text[203] === ' ' ? text.slice(0, 202) : text.slice(0, text.lastIndexOf(' ', 202));

    return `${newText} ...`;
  }
}
