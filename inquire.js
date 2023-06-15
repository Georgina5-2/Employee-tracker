const readline = require('readline');
const inquirer = require('inquirer');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 
const initQuestion = [
    {
        type: "list",
        name: "intro",
        message: "What would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "View all employees by department", "Add a department", "Add a role", "Add an employee", "Update an employee's role", "Remove an employee", "Exit"]
    }
];
async function main() {
    const answer = await inquirer.prompt(initQuestion);// waiting for the answer of an inquirer prompt
    console.log(answer); // log the return of the inquirer prompt
    
    rl.close(); // close the previous readline Interface
    rl = readline.createInterface({ // reset the readline Interface
                input: process.stdin,
                output: process.stdout
    });
    
    // at this point the program don't ends like it would have done without a rl Interface reset
    // you can do some more stuff here
}

main();
