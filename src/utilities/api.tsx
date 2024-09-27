import axios from 'axios';

function getApiData() {
  return axios.get('https://api.example.com/data')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error; 
    });
}

export default getApiData;
