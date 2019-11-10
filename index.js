var axios = require("axios");
var inquirer = require("inquirer");
var fs = require("fs");

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
            "# "+response.data.name+" \n" + "![Profile Photo]("+ response.data.avatar_url+") \n"+
            "Bio:"+response.data.bio+" \n"+
            " Company: " + response.data.company+" \n"+
            " Repo URL: ["+response.data.name+ "'s Repo](#"+  response.data.repos_url +") \n"+ 
            " Public Repos: "+response.data.public_repos+" \n"+
            " Followers: " + response.data.followers +" \n"+
            " Following: " + response.data.following +" \n"+
             " Location: "+ response.data.location
            ,function (err) {

                if (err) {
                    return console.log(err);
                }

                console.log("Success!");

            });



      });
  });


