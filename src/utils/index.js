import axios from 'axios';
import {
    GOOGLE_API,
    REVERSE_URL,
 } from './api/constants';
export const getLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
        location => resolve(location),
        error => reject(error)
    );
});

export const displayLocation2 = (coords) =>  {
    axios({
        method:'get',
        url:`${REVERSE_URL}latlng=${coords.latitude},${coords.longitude}&sensor=true&key=${GOOGLE_API}`,
    })
    .then(response => {
        console.log('axios response: ', response);
        const address = response.data.results;
        console.log('axiois address: ', address);
        return address;
    });
};

export const displayLocation = (coords) => new Promise((resolve, reject) => {
    axios({
        method:'get',
        url:`${REVERSE_URL}latlng=${coords.latitude},${coords.longitude}&sensor=true&key=${GOOGLE_API}`,
    })
    .then(response => {
        console.log(`${REVERSE_URL}latlng=${coords.latitude},${coords.longitude}&sensor=true&key=${GOOGLE_API}`);
        const address = response.data.results;
        // [1].formatted_address;
        resolve(address);
        console.log('latitude in axios: ', coords.latitude);
        console.log('longitude in axios: ', coords.longitude);
        console.log('data is: ', address);
        console.log('whole response: ', response);
    })
    .then(function() {
        console.log('axios completed');
    })
    .catch(error => {
        reject(error);
        console.log(error);
    });
});

export const filterForAddress = (data) => new Promise((resolve) => {
    const address = data[0].formatted_address;
    resolve(address);
});

export const filterForCity = (data) => new Promise((resolve) => {
    let city = '';
    data[0].address_components.forEach(element => {
        if(element.types.find(item => item === 'locality')) {
            console.log('after find: ', element.long_name);
            console.log('type of is:', typeof(element.long_name))
            city = element.long_name;
            resolve(city);
        }
        
    });
    console.log('city in function is: ', city);
    
});

export const filterForState = (data) => new Promise((resolve) => {
    let locality = '';
    data[0].address_components.forEach(element => {
        if(element.types.find(item => item === 'administrative_area_level_1')) {
            console.log('after find: ', element.short_name);
            console.log('type of is:', typeof(element.short_name));
            locality = element.short_name;
            resolve(locality);
        }
        
    });
    console.log('city in function is: ', locality);
    
});

export const filterForPlace = data => new Promise((resolve, reject) => {
    let place = {};
    try {
        data[0].address_components.forEach(element => {
            if(element.types.find(item => item === 'locality')) {
                place.city = element.long_name;
            } else if (element.types.find(item => item === 'administrative_area_level_1')) {
                place.state = element.short_name;
            } else if (element.types.find(item => item === 'country')) {
                place.country = element.long_name;
            }
            console.log('place in utility: ', place);
            resolve(place);
        });
    } catch (error) {
        console.log('error occured: ', error);
        reject(error);
    }
});

export default {};
