const fetch = require("node-fetch");

function getMoviesByTitle(title, callback) {

    var url =  'http://www.omdbapi.com/?i=tt3896198&apikey=b7d1ca42&t=' + title;
 

    //callback (null, fetch(url));



// https://gist.github.com/mjackson/e1996e4d6205e313ea0b
    fetch(url)
    .then(response => response.json())
    .then(json => callback(null, json), callback)

}

module.exports ={
    getMoviesByTitle : getMoviesByTitle
}