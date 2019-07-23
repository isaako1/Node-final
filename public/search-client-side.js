
/////////////////////////////////////////////////////////

function searchbyTitle(){
    console.log("Searching at client side by Title...");
    var title = $('#title').val();
    console.log("movie: " + title);
    //make a request to the server
    $.get("/search", {title:title}, function(data){
        console.log("back from the node app with: ");
        console.log(data);
        console.log(data.list.length);
        for (var i = 0; i < data; i++){
                var movies = data[i];
                
                   // console.log("results: " + movies);
                        $("#movieTitles").append(
                           "<li>" + movies.Title 
                            + " " + movies.Year 
                            + " " + movies.Runtime 
                            + " " + movies.Director 
                            + "</li>" );                          
                           
                        }
                        
                    })
                }

           