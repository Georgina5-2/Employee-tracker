const mysql=require('mysql2');
const inquirer=require('inquirer');
require('dotenv').config();
require("console.table");

const{initQuestion, deptQuestion, roleQuestion, employeeQuestion, roleUpdateQuestion, employeeName}=require("./lib/questions");

const db=sql.createConnection(
    {
        host:'localhost',
        user:process.env.DB_USER,
        password:'rootp',
        database:'employee'

    },
    console.log("Connected to the employee database");
)