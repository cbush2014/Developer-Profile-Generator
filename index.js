var axios = require("axios");
var inquirer = require("inquirer");
var fs = require("fs");
var pdf = require("pdfkit");

var myDoc = new pdf;
myDoc.pipe(fs.createWriteStream('node.pdf'));
myDoc.font('Times-Roman') 
  .fontSize(24)
  .text('NodeJS PDF Document', 100,100);
myDoc.end();

inquirer
    .prompt([
        {
            type: "input",
            message: "Please enter the GitHub username to search for:",
            name: "username"
        },
        {
            type: "checkbox",
            message: "What is your favorite color?",
            choices: ["red", "blue", "pink", "purple", "green", "orange"],
            name: "favcolor"
        }

    ]).then(function (answers) {
    axios
      .get("https://api.github.com/users/"+answers.username)
      .then(function (response) {
        console.log(response.data);
        // write out information from GitHub in a resume markdown file
        fs.writeFile(answers.username + "-resume.md",    
            "# "+response.data.name +"\r\n" + "![Profile Photo]("+ response.data.avatar_url+") \r\n"+
            "Bio:"+response.data.bio +"\r\n"+
            " Company: " + response.data.company +"\r\n"+
            " Repo URL: ["+response.data.name+ "'s Repo](#"+  response.data.repos_url +") \r\n"+ 
            " Public Repos: "+response.data.public_repos +"\r\n"+
            " Followers: " + response.data.followers +"\r\n"+
            " Following: " + response.data.following +"\r\n"+
             " Location: "+ response.data.location
            ,function (err) {

                if (err) {
                    return console.log(err);
                }

                console.log("Success!");

            });



      });
  });


