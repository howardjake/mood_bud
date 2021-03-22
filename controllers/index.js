
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
          'Authorization': `563492ad6f9170000100000183ff75da20764e6e8de9fcf7cc7d4b9d`
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
          'Authorization': `563492ad6f9170000100000183ff75da20764e6e8de9fcf7cc7d4b9d`
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
