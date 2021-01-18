const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [
    {
        type: 'input',
        message: 'Name:',
        name: 'name'
    },
    {
        type: 'input',
        message: "ID:",
        name: 'id'
    },
    {
        type: 'input',
        message: 'Email:',
        name: 'email'
    }
]

const specific = {
    'manager': {
        type: 'input',
        message: 'Office Number:',
        name: 'special'
    },
    'engineer': {
        type: 'input',
        message: 'GitHub Username:',
        name: 'special'
    },
    'intern': {
        type: 'input',
        message: 'School',
        name: 'special'
    }
}

const qType = {
    type: 'rawlist',
    message: 'New employee type:',
    name: 'type',
    choices: ['manager','engineer','intern','none']
}

const typeClasses = {
    'manager': Manager,
    'engineer': Engineer,
    'intern': Intern
}

function promptQuestion (question) {
    return inquirer.prompt(question);
}

async function getEmployees () {
    const managers = [];
    const engineers = [];
    const interns = [];

    let done = false;
    while(!done) {
        let res = await promptQuestion(qType);
        if(typeClasses[res.type] !== undefined) {
            let res2 = await promptQuestion(questions.concat(specific[res.type]));
            let employee = new typeClasses[res.type](res2.name, res2.id, res2.email, res2.special);
            switch(res.type) {
                case 'manager':
                    managers.push(employee);
                    break;
                case 'engineer':
                    engineers.push(employee);
                    break;
                case 'intern':
                    interns.push(employee);
                    break;
            }
        } else {
            done = true;
        }
    }
    return managers.concat(engineers).concat(interns);
}



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
