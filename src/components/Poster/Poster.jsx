import React from 'react';
import PropTypes from 'prop-types';
import './Poster.css';

const Poster = ({ posterPath }) => {
	
	return (
		<div className='poster-wrapper'>
			<img src={ posterPath } alt="movie poster" />
		</div>
	);
};

export default Poster;