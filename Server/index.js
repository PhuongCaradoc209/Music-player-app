const { error } = require("console");
var fs = require("fs");

fs.open("data.text", "r+", function(err, file){
    if(err){
        console.log("Error");
        return;
    }
    console.log("Open file is successful");
});