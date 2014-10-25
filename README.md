#A React component for use with the Google Maps API

Remember to first run

```
npm install && gulp
```

in order to produce the required bundle.jss and styles.css.

Options can be passed to the component through the 'options' prop:

```
var options = {
	center: { lat: ..., lng: ... },
	zoom: 15
};

<GoogleMaps
	options = {options}
/>
```