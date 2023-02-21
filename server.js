const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

require('console.table');

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
                process.exit(0);
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

function viewRoles() {
    db.promise().query('SELECT r.id, r.title, r.salary, d.name AS dept_name FROM employee_role r INNER JOIN department d ON r.department_id = d.id ORDER BY r.id')
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .then(() => {
            initMenu();
        })
};

function viewEmployees() {
    db.promise().query('SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS name, r.title, d.name AS dept, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee_role r INNER JOIN employee e ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON m.id = e.manager_id ORDER BY e.id')
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .then(() => {
            initMenu();
        })
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter new department name here:',
        }
    ]).then((res) => {
        if(res.name) {
            db.promise().query(`INSERT INTO department (name) VALUES ("${res.name}")`)
            .then(() => {
                console.log('Department added.');
            })
            .then(() => initMenu());
        } else {
            console.log('Input required.');
            initMenu();
        }
    })
};

function addRole() {
    let depts = [];
    let title;
    let salary;
    db.promise().query('SELECT * FROM department')
        .then(([rows, fields]) => {
            for(const i in rows) {
                depts.push(rows[i].name);
            }
            return;
        });
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter new role title here:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter salary here: $',
        }
    ]).then((res) => {
        if(res.title && res.salary) {
            title = res.title;
            salary = res.salary;
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'dept',
                    message: 'Choose department:',
                    choices: depts,
                }
            ]).then((res) => {
                if(res.dept) {
                    db.promise().query(`INSERT INTO employee_role (title, salary, department_id) VALUES ("${title}", ${salary}, ${depts.indexOf(res.dept) + 1})`)
                        .then(() => {
                            console.log('Role added.');
                            initMenu();
                            return;
                        })
                } else {
                    console.log('Input required.');
                    initMenu();
                    return;
                }
            })
        } else {
            console.log('Input required.');
            initMenu();
            return;
        }
    })
};

function addEmployee() {
    let roles = [];
    let employees = [];
    let first;
    let last;
    db.promise().query('SELECT title FROM employee_role')
        .then(([rows]) => {
            for(const i in rows) {
                roles.push(rows[i].title);
            }
            return;
        });
    db.promise().query('SELECT first_name, last_name FROM employee')
        .then(([rows]) => {
            for(const i in rows) {
                employees.push(rows[i].first_name.concat(' ', rows[i].last_name));
            }
            employees.push('None');
            return;
        });
    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'Enter first name here:',
        },
        {
            type: 'input',
            name: 'last',
            message: 'Enter last name here:',
        }
    ]).then((res) => {
        if(res.first && res.last) {
            first = res.first;
            last = res.last;
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'Choose role:',
                    choices: roles,
                },
                {
                    type: 'list',
                    name: 'mgr',
                    message: 'Select manager of new employee:',
                    choices: employees,
                }
            ]).then((res) => {
                if(res.role) {
                    let id;
                    if(res.mgr == 'None') {
                        id = null;
                    } else {
                        id = employees.indexOf(res.mgr) + 1;
                    };
                    db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first}", "${last}", ${roles.indexOf(res.role) + 1}, ${id})`)
                        .then(() => {
                            console.log('Employee added.');
                            initMenu();
                            return;
                        })
                } else {
                    console.log('Input required.');
                    initMenu();
                    return;
                }
            })
        } else {
            console.log('Input required.');
            initMenu();
            return;
        }
    })
};

function updateRole() {
    let stafflist = [];
    let managerChoices = [];
    let roles = [];
    db.promise().query('SELECT first_name, last_name FROM employee')
        .then(([rows]) => {
            for(const i in rows) {
                let fullname = rows[i].first_name.concat(' ', rows[i].last_name);
                stafflist.push(fullname);
            }
            managerChoices.push(...stafflist, 'None');
            return;
    });
    db.promise().query('SELECT * FROM employee_role')
        .then(([rows]) => {
            for(const i in rows) {
                roles.push(rows[i].title);
            }
            return;
    });
    function update() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Select employee to update:',
                choices: stafflist,
            },
            {
                type: 'list',
                name: 'role',
                message: 'Select new role:',
                choices: roles,
            },
            {
                type: 'list',
                name: 'mgr',
                message: 'Select employee manager:',
                choices: managerChoices,
            }
        ]).then((res) => {
            if(res.name && res.role && res.mgr) {
                let mgrid;
                if(res.mgr == 'None') {
                    mgrid = null;
                } else {
                    mgrid = stafflist.indexOf(res.mgr) + 1;
                }
                db.promise().query(`UPDATE employee SET role_id = ${roles.indexOf(res.role) + 1}, manager_id = ${mgrid} WHERE id = ${stafflist.indexOf(res.name) + 1}`)
                    .then(() => {
                        console.log('Employee updated.');
                        initMenu();
                        return;
                    })
            } else {
                console.log('Input required.');
                initMenu();
                return;
            }
        })
    }
    setTimeout(update, 500);
}

app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

initMenu();