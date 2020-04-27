const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const empIDArr = [];

function runApp() {

    function createManager() {
        console.log("Software engineering team");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Enter Manager Name:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Name must be at least one character.";
                }
            },
            {
                type: "input",
                name: "managerID",
                message: `Enter Manager ID:`,
                validate: answer => {
                    const id = answer.match(/^[1-9]\d*$/)
                    if (id) {
                        if (empIDArr.includes(id)) {
                            return "ID already used. Enter a new number.";
                        }
                        else {
                            return true;
                        }
                    }
                    return "Enter a number greater than 0";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Enter Manager Email:",
                validate: answer => {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(answer)) {
                        return (true)
                    }
                    return "Please enter a valid email address";
                }
            },
            {
                type: "input",
                name: "managerOffice",
                message: "Enter Manager Office Number:",
                validate: answer => {
                    if (isNaN(answer) || answer < 0) {
                        return "Please enter a number greater than 0.";
                    }
                    return true;
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOffice);
            teamMembers.push(manager);
            empIDArr.push(answers.managerID);
            createMember();

        });
    }

    function createMember() {
        inquirer.prompt([
            {
                type: "list",
                name: "nextEmp",
                message: "Select next employee role:",
                choices: ["Engineer", "Intern", "No more employees to add"]
            }
        ]).then(choice => {
            switch (choice.nextEmp) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    teamBuilder();
                    break;
            }
        })
    };

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engName",
                message: "Enter Engineer Name:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Name but be at least one character.";
                }
            },
            {
                type: "input",
                name: "engID",
                message: "Enter Engineer ID:",
                validate: answer => {
                    const id = answer.match(/^[1-9]\d*$/)
                    if (id) {
                        if (empIDArr.includes(answer)) {
                            return "ID already used. Enter a new number.";
                        }
                        else {
                            return true;
                        }
                    }
                    return "Please enter a number greater than 0";
                }
            },
            {
                type: "input",
                name: "engEmail",
                message: "Enter Engineer Email:",
                validate: answer => {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(answer)) {
                        return (true)
                    }
                    return "Please enter a valid email address";
                }
            },
            {
                type: "input",
                name: "engGit",
                message: "Enter Engineer GitHub:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "GitHub account cannot be blank";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engName, answers.engID, answers.engEmail, answers.engGit);
            teamMembers.push(engineer);
            empIDArr.push(answers.engID);
            createMember();
        })
    };

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "intName",
                message: "Enter Intern Name:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Name but be at least one character.";
                }
            },
            {
                type: "input",
                name: "intID",
                message: "Enter Intern ID:",
                validate: answer => {
                    const id = answer.match(/^[1-9]\d*$/)
                    if (id) {
                        if (empIDArr.includes(answer)) {
                            return "ID already used. Enter a new number.";
                        }
                        else {
                            return true;
                        }
                    }
                    return "Enter a number greater than 0";
                }
            },
            {
                type: "input",
                name: "intEmail",
                message: "Enter Intern Email:",
                validate: answer => {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(answer)) {
                        return (true)
                    }
                    return "Please enter a valid email address";
                }
            },
            {
                type: "input",
                name: "intSchool",
                message: "Enter Intern School:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "School cannot be blank";
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.intName, answers.intID, answers.intEmail, answers.intSchool)
            teamMembers.push(intern);
            empIDArr.push(answers.intID);
            createMember();
        })
    }

    createManager();

    function teamBuilder() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");

    }

}

runApp();


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
// for the provided `render` function to work!```
