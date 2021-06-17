import React from 'react';
import PropTypes from 'prop-types';
import './Poster.css';

const Poster = ({ posterPath }) => (
		<div className='poster-wrapper'>
			<img src={ posterPath } alt="movie poster" />
		</div>
	);

Poster.propTypes = {
	posterPath: PropTypes.string.isRequired,
};

export default Poster;