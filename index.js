const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();
require("console.table");

const {
  deptQuestion,
  roleQuestion,
  employeeQuestion,
  roleUpdateQuestion,
  employeeName,
} = require("./lib/questions");

const db = mysql.createConnection({
  host: "localhost",
  user: "qauser",
  password: "qauser@1234",
  database: "employee",
});
console.log(`Connected to the employee database.`);
db.connect(function (error) {
  if (error) {
    throw error;
  }
});

const initQuestion = [
  {
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
      {
        name: "View all departments",
        value: "VIEW_DEPARTMENTS",
      },
      {
        name: "View all roles",
        value: "VIEW_ROLES",
      },
      {
        name: "View all employees",
        value: "VIEW_EMPLOYEES",
      },
      {
        name: "View all employees by department",
        value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
      },
      {
        name: "Add a department",
        value: "ADD_DEPARTMENT",
      },
      {
        name: "Add a role",
        value: "ADD_ROLE",
      },
      {
        name: "Add an employee",
        value: "ADD_EMPLOYEE",
      },
      {
        name: "Update an employee's role",
        value: "UPDATE_EMPLOYEE_ROLE",
      },
      {
        name: "Remove an employee",
        value: "REMOVE_EMPLOYEE",
      },
      {
        name: "Exit",
        value: "EXIT",
      },
    ],
  },
];
const newQuestion = [
  {
    name: "first",
    type: "input",
    message: "provide first answer",
  },
  {
    name: "second",
    type: "input",
    message: "provide second answer",
  },
];
//const question = []
function initQuery() {
  console.log("entering");
  inquirer.prompt(initQuestion).then((response) => {
    console.log("response");
    console.log(" I am in then part");

    let intro = response.choice;

    console.log("intro = ", intro);
    switch (intro) {
      case "VIEW_DEPARTMENTS":
        return viewAllDepartments();

      case "VIEW_ROLES":
        return viewAllRoles();
        
      case "VIEW_EMPLOYEES":
        return viewAllEmployees();
    
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        return viewEmployeeByDept();
       
      case "ADD_DEPARTMENT":
        return handleDeptQuery();
      
      case "ADD_ROLE":
        return handleRoleQuery();
     
      case "ADD_EMPLOYEE":
        return handleEmployeeQuery();
     
      case "UPDATE_EMPLOYEE_ROLE":
        return handleRoleUpdateQuery();
     
      case "REMOVE_EMPLOYEE":
        return handleEmployeeRemove();
       
      case "EXIT":
        db.end();
        return;
      //}
    }
  });
}

function handleDeptQuery() {
  inquirer.prompt(deptQuestion).then(({ deptName }) => {
    addDepartment(deptName);
  });
}

function handleRoleQuery() {
  inquirer.prompt(roleQuestion).then(({ title, salary, deptID }) => {
    addRole(title, salary, deptID);
  });
}

function handleEmployeeQuery() {
  inquirer
    .prompt(employeeQuestion)
    .then(({ fName, lName, roleID, managerID }) => {
      addEmployee(fName, lName, roleID, managerID);
    });
}

function handleRoleUpdateQuery() {
  inquirer.prompt(roleUpdateQuestion).then(({ fName, lName, roleID }) => {
    updateEmployeeRole(roleID, fName, lName);
  });
}

function handleEmployeeRemove() {
  inquirer.prompt(employeeName).then(({ fName, lName }) => {
    removeEmployee(fName, lName);
  });
}

function viewAllDepartments() {
  console.log("departments");
  const sql = `SELECT * FROM department ORDER BY id`;
  db.query(sql, (err, res) => {
    console.table(`\nList of all the departments`, res);
    return initQuery();
  });
}

function viewAllRoles() {
  const sql = `SELECT role.id, role.title, role.salary, department.name AS department_name
               FROM role
               JOIN department ON department.id=role.department_id;`;
  db.query(sql, (err, res) => {
    console.table(`\nList of all roles with ID, salary and department`, res);
    return initQuery();
  });
}

function viewAllEmployees() {
  const sql = `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department_name, role.salary, CONCAT(m.first_name," ",m.last_name) AS manager_name
                FROM employee e
                LEFT JOIN employee m ON e.manager_id=m.id
                JOIN role ON e.role_id=role.id
                JOIN employee.department ON role.department_id=department.id`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(`\nList of all employees and their roles`, res);
    return initQuery();
  });
}

function viewEmployeeByDept() {
  const sql = `SELECT e.id, e.first_name, e.last_name, department.name AS department_name
                FROM employee e 
                LEFT JOIN employee m ON e.manager_id = m.id
                LEFT JOIN role ON e.role_id = role.id
                LEFT JOIN department ON role.department_id=department.id
                ORDER BY department_name`;
  db.query(sql, (err, res) => {
    console.table(`\nList of all employees based on departments`, res);
    return initQuery();
  });
}

function addDepartment(department) {
  const sql = `INSERT INTO department(name) VALUES(?)`;
  const params = department;
  db.query(sql, params, (err, res) => {
    console.table(`\nA new department has been successfully added`, res);
    return initQuery();
  });
}

function addRole(title, salary, id) {
  const sql = `INSERT INTO role(title,salary, department_id) VALUES?`;
  const values = [[title, salary, id]];
  if (isNaN(salary) || isNaN(id)) {
    console.log("\nSalary and/or deparment_id must be a number\n");
    return initQuery();
  } else {
    db.query(sql, [values], (err, res) => {
      console.log("\nA new role has been successfully added\n");
    });
    viewAllRoles();
  }
}

function addEmployee(firstN, lastN, rID, mID) {
  const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ?`;
  const values = [[firstN, lastN, rID, mID]];
  if (isNaN(rID || isNaN(mID))) {
    console.log(`\nRole ID and Manager ID must be a number\n`);
    return initQuery();
  } else {
    db.query(sql, [values], (err, res) => {
      console.log("\nA new employee has been successfully added");
    });
    viewAllEmployees();
  }
}

function updateEmployeeRole(rID, fName, lName) {
  const sql = `UPDATE employee SET role_id=? WHERE first_name=? AND last_name=?`;
  const values = [rID, fName, lName];
  if (isNaN(rID)) {
    console.log(`\nEmployee ID and new role ID must be a number`);
    return initQuery();
  } else {
    db.query(sql, values, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log("\nThis employee's role has been updated successfully");
    });
    viewAllEmployees();
  }
}

function removeEmployee(fName, lName) {
  const sql = `DELETE FROM employee.employee WHERE first_name=? AND last_name=?`;
  const values = [fName, lName];
  db.query(sql, values, (err, res) => {
    if (err) {
      console.log(`\nName cannot be found`, err);
    } else {
      console.log(`\nSuccessfully removed employee from database\n`);
    }
  });
  viewAllEmployees();
}

initQuery();
