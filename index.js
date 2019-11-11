var axios = require("axios");
var inquirer = require("inquirer");
var fs = require("fs");
var pdf = require("pdfkit");

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
            .get("https://api.github.com/users/" + answers.username)
            .then(function (response) {
                console.log(response.data);

                var doc = new pdf;
                doc.pipe(fs.createWriteStream(answers.username + '-resume.pdf'));
                doc.font('Times-Roman')
                    .fontSize(24)
                    //.fillColor('red');
                   .fillColor("'" + answers.favcolor + "'")
                    // .fillColor(answers.favcolor)
                    // .text("'" + answers.favcolor + "'")
                    .text(response.data.name);

                doc.fontSize(12)
                    .fillColor('black');

// this doesn't work, it throws Error: ENOENT: no suchh file or directory, open ....
// appears to be that it doesn't recognize the file as .png or .jpeg
                    // doc.image(response.data.avatar_url
                //     , {
                //         fit: [250, 300],
                //     }
                // );

                // Add an image, constrain it to a given size, and center it vertically and horizontally
                doc.image('./dp2.png'
                    , {
                        fit: [250, 300],
                        //                        align: 'center',
                        //                        valign: 'center'
                    });

                doc.moveDown(1)
                    .text("Bio: " + response.data.bio);
                doc.text("Company: " + response.data.company);


                // the easier way
                doc.fillColor('black')
                    .text("Repo URL: ", {
                        continued: true
                    })
                    .fillColor('blue')
                    .text(response.data.name + "'s Repo",
                        {
                            link: response.data.repos_url,
                            underline: true
                        }
                    );


                doc.fillColor('black');
                doc.text("Public Repos: " + response.data.public_repos);
                doc.text("Followers: " + response.data.followers);
                doc.text("Following: " + response.data.following);
                doc.text("Location: " + response.data.location);

                doc.end();

                // write out information from GitHub in a resume markdown file
                fs.writeFile(answers.username + "-resume.md",
                    "# <font color= '" + answers.favcolor + "'>" + response.data.name + "</font>  \r\n" + 
                    "![Profile Photo](" + response.data.avatar_url + ")  \r\n" +
                    " Bio: " + response.data.bio + "  " +
                    " Company: " + response.data.company + "  \r\n" +
                    " Repo URL: [" + response.data.name + "'s Repo](#" + response.data.repos_url + ")  \r\n" +
                    " Public Repos: " + response.data.public_repos + "  \r\n" +
                    " Followers: " + response.data.followers + "  \r\n" +
                    " Following: " + response.data.following + "  \r\n" +
                    " Location: " + response.data.location
                    , function (err) {

                        if (err) {
                            return console.log(err);
                        }

                        console.log("Success!");

                    });



            });
    });


