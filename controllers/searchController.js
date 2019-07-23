const searchModules = require ("../models/searchModel.js");

function searchMovieList(req, res){
    var title = req.query.title;
console.log("Seaching movies... " + title);


searchModules.getMoviesByTitle(title, function(error, results){
    res.json(results);
    console.log(results);
});

}

module.exports = {
    searchMovieLists : searchMovieList
};