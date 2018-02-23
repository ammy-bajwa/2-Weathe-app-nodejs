const axios = require('axios');
const yargs = require('yargs');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to get weather for',
        string: true
    }
}).help()
    .alias('help', 'h')
    .argv

const encodedURL = encodeURI(argv.address)
const googleAPIUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}&key=AIzaSyA0p5sX85lxGISNRbtMZHhqLPah5BGJLmo`
axios.get(googleAPIUrl)
    .then((response) => {
        console.log(response.data.results[0].formatted_address);
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        const weatherAPIUrl = `https://api.darksky.net/forecast/8bd8f0cde65150727e932bf524790714/${lat},${lng}`;

        return axios.get(weatherAPIUrl).then((response) => {
            var temperature = response.data.currently.temperature;
            var apparentTemperature = response.data.currently.apparentTemperature;
            console.log(`It's currently ${temperature} F. It feels like ${apparentTemperature}F.`);
        })
    })
    .catch((error) => {
        console.log(error);
    });

















//google api key AIzaSyA0p5sX85lxGISNRbtMZHhqLPah5BGJLmo