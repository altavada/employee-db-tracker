const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const ctable = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'demiurge',
        database: 'employee_db'
    },
    console.log('Connected to employee_db.')
);

const menuChoices = ['View all Departments', 'View all Roles', 'View All Employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', 'Exit'];

function initMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: menuChoices,
        }
    ]).then((res) => {
        switch(res.menu) {
            case 'View all Departments':
                viewDepartments();
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update employee role':
                updateRole();
                break;
            case 'Exit':
                console.log('Goodbye');
                return;
        }
    })
};

function viewDepartments() {
    db.promise().query('SELECT * FROM department')
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .then(() => {
            initMenu();
        })
};

app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

initMenu();