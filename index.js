var inquirer = require("inquirer");
var fs = require("fs");

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "username"
        },
        {
            type: "checkbox",
            message: "What is your favorite color?",
            choices: ["red", "blue", "pink", "purple", "green", "orange"],
            name: "favcolor"
        },
        // {
        //     type: "list",
        //     message: "What is your preferred method of communication?",
        //     choices: ["email", "mobile", "text", 'phone'],
        //     name: "PComm"
        // },

    ])
    .then(function (response) {
        console.log(response);
        fs.writeFile(response.username + ".json", JSON.stringify(response, null, 4)
            , function (err) {

                if (err) {
                    return console.log(err);
                }

                console.log("Success!");

            });

        // if (response.confirm === response.password) {
        //   console.log("Success!");
        // }
        // else {
        //   console.log("You forgot your password already?!");
        // }
    });
