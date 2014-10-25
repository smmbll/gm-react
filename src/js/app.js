/** @jsx React.DOM */

var React = require('react');

var GoogleMaps = require('./components/GoogleMaps.react');

React.renderComponent(
	<GoogleMaps />,
	document.getElementById('app-container')
);