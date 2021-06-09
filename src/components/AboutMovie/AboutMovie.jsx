import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import './AboutMovie.css';

const AboutMovie = ({ title, releaseDate, overview }) => {
	const date = format(new Date(releaseDate), 'MMMM dd, yyyy');
	
	return (
		<div className='about_movie'>
			<h1>{title}</h1>
			<p className='release-date'>{date}</p>
			<p>
				<span className='genre'>Action</span><span className='genre'>Drama</span>
			</p>
			<p>{overview}</p>
		</div>
	);
};

export default AboutMovie;
