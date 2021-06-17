import React from 'react';
import './ErrorMessage.css';
import { Alert, Col } from 'antd';

const ErrorMessage = () => (
	<Col span={24}>
		<Alert
			message="Something goes wrong..."
			description="Something goes wrong, but our cinema operator is already fixing it!"
			type="warning"
			showIcon
		/>
	</Col>
);

export default ErrorMessage;