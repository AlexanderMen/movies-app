import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Input } from 'antd';
import debounce from 'lodash.debounce';
import 'antd/dist/antd.css';
import './SearchElem.css';

export default class SearchElem extends Component {
	
	state = {
		value: '',
	};
	
	static propTypes = {
		onUserInput: PropTypes.func.isRequired,
	};
	
	debouncing = debounce(() => this.inputChange(), 1000);
	
	inputChange = () => {
		const { onUserInput } = this.props;
		const { value } = this.state;
		
		onUserInput(value.trim());
	};
		
	onInputChange = evt => {
		const { value } = evt.target;
		this.setState({ value });
	};
		
	render() {
		const { value } = this.state;
		
		return (
			<Col span={24}>
				<div className='search'>
					<Input
						onChange={evt => {
								this.onInputChange(evt);
								this.debouncing();
							}
						}
						placeholder='Type to search...'
						value={value} />
				</div>
			</Col>
		);
	}
	
};

