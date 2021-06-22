import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';
import { Alert, Col } from 'antd';
import 'antd/dist/antd.css';

const ErrorMessage = ({ message, description }) => (
	<Col span={24}>
		<div className='alert'>
			<Alert
				message={ message }
				description={ description }
				type="warning"
				showIcon
			/>
		</div>
	</Col>
);

ErrorMessage.propTypes = {
	message: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default ErrorMessage;