import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push, routeActions } from 'react-router-redux';

class Test extends Component {
	render(){
		return (
			<div>
				<h1>Hallo</h1>
				<h3>{this.props.location.params}</h3>
			</div>
		)
	}
}

export default Test;

