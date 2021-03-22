require('pexels');
const axios = require('axios');


const BASE_URL = 'https://api.pexels.com/v1/' 

function index(req, res, next) {
    axios.get(BASE_URL + 'search?query=people', {
        headers: {
          'Authorization': `563492ad6f9170000100000183ff75da20764e6e8de9fcf7cc7d4b9d`
        },
        dataType:'jsonp',
      })
      .then(function(response){
      console.log(response);
      res.render('index', { title: 'Express', photos: response.data });
    });
};

index()

module.exports = {

}