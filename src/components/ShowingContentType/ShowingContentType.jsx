import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import 'antd/dist/antd.css';
import './ShowingContentType.css';

const ShowingContentType = ({ pageContent, onChangeContentType }) => {
	const searchClass = pageContent === 'search' ? pageContent : null;
	const ratedClass = pageContent === 'rated' ? pageContent : null;
	
	return (
		<Col 
			className='contentTypeWrapper'
			span={24}>
			<div className='contentType'>
				<button
					className={searchClass}
					type="button"
					onClick={() => onChangeContentType('search')}>Search</button>
				<button
					className={ratedClass}
					type="button"
					onClick={() => onChangeContentType('rated')}>Rated</button>
			</div>
		</Col>
	);
};

ShowingContentType.propTypes = {
	pageContent: PropTypes.string.isRequired,
	onChangeContentType: PropTypes.func.isRequired,
};

export default ShowingContentType;