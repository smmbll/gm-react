/** @jsx React.DOM */

var React = require('react');
var GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.KEY = 'AIzaSyBpUIx2WNMcJyZOqwCD6aLIP7UpdPzLlWw';

var GoogleMaps = React.createClass({
	propTypes: {
		options: React.PropTypes.object
	},
	getDefaultProps: function() {
		return { 
			options: {
				center: { lat: 40.6487514, lng: -73.96536 },
				zoom: 15
			}
		}
	},
	componentDidMount: function () {
		var element = document.getElementById('gm-container');

		var options = this.props.options;

		GoogleMapsLoader.load(function(google) {
			new google.maps.Map(element,options);
		});
	},
	render: function() {
		return (
			<div id="gm-container" className="gm-map"></div>
		);
	}
});

module.exports = GoogleMaps;