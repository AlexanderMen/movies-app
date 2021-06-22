import React from 'react';
import PropTypes from 'prop-types';
import './Poster.css';

const Poster = ({ posterPath }) => {
	let path = posterPath;
	if(!posterPath) path = 'images/moviePoster.png';
	
	return (
		<div className='poster-wrapper'>
			<img src={ path } alt="movie poster" />
		</div>
	)
};

Poster.propTypes = {
	posterPath: PropTypes.string.isRequired,
};

export default Poster;