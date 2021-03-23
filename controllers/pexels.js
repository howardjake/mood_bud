
function index(req, res) {
    res.render('index');
}

require('pexels');
const axios = require('axios');


const BASE_URL = 'https://api.pexels.com/v1/' 

function index(req, res) {
    console.log(req.body);
    axios.get(BASE_URL + `curated?per_page=15`, {
        headers: {
          'Authorization': 
        }
      })
      .then(function(response){
    //   console.log(response);
      res.render('index', { title: 'Express', photos: response.data });
    });
}

function lookup(req, res, next) {
    axios.get(BASE_URL + `search?query=${req.body}`, {
        headers: {
          'Authorization': 
        }
      })
      .then(function(response){
      console.log(response);
      res.render('index', { title: 'Express', photos: response.data });
    });
  
};

module.exports = {
    index,
    lookup
};
