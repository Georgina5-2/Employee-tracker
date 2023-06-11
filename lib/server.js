const mysql=require('mysql2');
const inquirer=require('inquirer');
require('dotenv').config();
require("console.table");

const{initQuestion, deptQuestion, roleQuestion, employeeQuestion, roleUpdateQuestion, employeeName}=require("./lib/questions");

const db=sql.createConnection(
    {
        host:'localhost',
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME

    },
    console.log("Connected to the employee database");
);

initQuery();

function initQuery(){
    inquirer
        .prompt(initQuestion)
        .then(({intro})=>{
            handleInitQuery(intro);
        })
};

function handleInitQuery(intro){
    switch(intro){
        case "View all departments":
            viewAllDepartments();
            break;
        case "View all roles":
            viewAllRoles();
            break;
        case "View all employees":
            viewAllEmployees();
            break;
        case "View all employees by department":
            viewEmployeeByDept();
            break;
        case "Add a department":
            handleDeptQuery();
            break;
        case "Add a role":
            handleRoleQuery();
            break;
        case "Add an employee":
            handleEmployeeQuery();
            break;
        case "Update an employee's role":
            handleRoleUpdateQuery();
            break;
        case "Remove an employee":
            handleEmployeeRemove();
            break;
        case "Exit":
            db.end();
            break;

    }
}

function handleDeptQuery() {
    inquirer
        .prompt(deptQuestion)
        .then(({deptName})=>{
            addDepartment(deptName);
        });
};

function handleRoleQuery() {
    inquirer
        .prompt(roleQuestion)
        .then(({title,salary,deptID})=>{
            addRole(title,salary,deptID);
        });
};

function handleEmployeeQuery(){
    inquirer
        .prompt(employeeQuestion)
        .then(({fName,lName,roleID,managerID})=>{
            addEmployee(fName,lName,roleID,managerID);
        });
};

function handleRoleUpdateQuery(){
    inquirer
        .prompt(roleUpdateQuestion)
        .then(({fName, lName, roleID})=>{
            updateEmployeeRole(roleID,fName,lName);
        });
};

function handleEmployeeRemove() {
    inquirer
        .prompt(employeeName)
        .then(({fName, lName})=>{
            removeEmployee(fName,lName);
        });
};