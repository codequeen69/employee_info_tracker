const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const index = require('./index');


//connect to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        //My MySQL username,
        user: 'root',
        //My MySQL password
        password: 'Spiritussanctus1@',
        database: 'employee_db'
    });


function viewDept() {
    connection.execute(
        `SELECT * FROM department;`,
        function (err, results) {
            const table = cTable.getTable(results);
            console.log(table);
            promptQuestion();
        }
    );
};

function viewRoles() {
    connection.execute(
        `SELECT * FROM roles;`,
        function (err, results) {
            const table = cTable.getTable(results);
            console.log(table);
            promptQuestion();
        }
    );
};

function viewEmployees() {
    //creating the columns for the table with dot notation above FROM employees
    //Below FROM employees I link the two tables together by their common field
    const sql = `SELECT 
                employees.id,
                employees.first_name,
                employees.last_name,
                roles.title,
                department.dept_name AS department,
                roles.salary,
                CONCAT(manager.first_name,' ', manager.last_name) AS manager
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employees manager ON employees.manager_id = manager.id
                `;
    connection.query(sql, (err, results) => {
        //view console.table documentation for this info
        const table = cTable.getTable(results);
        console.log(table);
        promptQuestion();
    }
    );
};
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ])
        .then((answer) => {
            const sql = `INSERT INTO department(dept_name)
    VALUES (?)`;
            const dept = answer.department
            connection.query(sql, dept, (err, results) => {
                const table = cTable.getTable(results);
                console.log(table);
                viewDept();
            })
        })

};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role (without decimals or dollar signs)?'
        }
    ])
        .then(answer => {
            const deptSql = `SELECT department.id AS value, department.dept_name AS name FROM department`;
            connection.query(deptSql, (err, result) => {
                if (err) throw err;
                const departmentNames = result;
                console.log(departmentNames);

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'dept',
                        message: 'Which department does this role belong to?',
                        choices: departmentNames
                    }
                ])
                    .then((answers) => {
                        console.log(answers)
                        const sql = `INSERT INTO roles(title, salary, department_id)
        VALUES(?,?,?)`;
                        const role = [answer.title, answer.salary, answers.dept];
                        connection.query(sql, role, (err, results) => {
                            if (err) throw err;
                            const table = cTable.getTable(results);
                            console.log(table);
                            viewRoles();
                            promptQuestion();
                        })

                    })
            })
        })

};

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last',
            message: "What is the employee's last name?"
        }
    ])
        .then(answers => {
            const Sql = `SELECT roles.id AS value, roles.title AS name FROM roles`;
            connection.query(Sql, (err, result) => {
                if (err) throw err;
                const roleTitle = result;
                console.log(roleTitle);

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        message: "What is the employee's role?",
                        choices: roleTitle
                    }
                ])
                    .then(answer2 => {
                        const sql = `SELECT employees.id AS value, 
                        CONCAT(employees.first_name,' ', employees.last_name) 
                        AS name FROM employees `;

                        connection.query(sql, (err, result) => {
                            if (err) throw err;
                            const managerName = result;
                            console.log(managerName);

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'managerId',
                                    message: "Who is the employee's manager?",
                                    choices: managerName
                                }
                            ])
                                .then((answer) => {
                                    const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;
                                    const employee = [answers.first, answers.last, answer2.roleId, answer.managerId];

                                    connection.query(sql, employee, (err, results) => {
                                        if (err) throw err;
                                        const table = cTable.getTable(results);
                                        console.log(table);
                                        viewEmployees();
                                    })
                                })
                        })
                    })
            })
        })
};

function updateEmpRole() {
    const sql = `SELECT employees.id AS value, 
                        CONCAT(employees.first_name,' ', employees.last_name) 
                        AS name FROM employees `;

    connection.query(sql, (err, result) => {
        if (err) throw err;
        const empName = result;
        console.log(empName);
        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "Which employee's role would you like to update?",
                choices: empName
            }
        ])
            .then(answer => {
                const sql = `SELECT roles.id AS value, roles.title AS name FROM roles`;

                connection.query(sql, (err, result) => {
                    if (err) throw err;
                    const roleName = result;
                    console.log(roleName);
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: 'Which role would you like to assign to the employee?',
                            choices: roleName
                        }
                    ])
                        .then(answer2 => {
                            const sql = `UPDATE employees SET role_id = ? WHERE id=?`;
                            const role = [answer.name, answer2.role];
                            connection.query(sql, role, (err, result) => {
                                if (err) throw err;
                                const table = cTable.getTable(result);
                                console.log(table);
                                viewEmployees();
                            })
                        })
                })
            })
    })
};

function deleteEmployee() {
    const managerSql = `SELECT employees.id AS value, 
CONCAT(employees.first_name,' ', employees.last_name) 
AS name FROM employees `;
    connection.query(managerSql, (err, result) => {
        if (err) throw err;
        const manName = result;
        console.log(result)

        inquirer.prompt([
            {
                type: 'list',
                name: 'delete',
                message: 'Which employee would you like to delete?',
                choices: manName
            }
        ])
            .then(answer => {
                const sql = `DELETE FROM employees  WHERE id = ?`
                const employee = answer.delete
                connection.query(sql, employee, (err, result) => {
                    if (err) throw err;
                    const table = cTable.getTable(result);
                    console.log(table);
                    viewEmployees();
                })
            })
    })
}

function viewBudget() {
    const deptSql = `SELECT department.id AS value, department.dept_name AS name FROM department`;
    connection.query(deptSql, (err, result) => {
        if (err) throw err;
        const depart = result;
        console.log(depart);
        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department budget would you like to view?',
                choices: depart
            }
        ])
            //anything above the FROM is creating the columns use dot notation but can get data
            //from any table. Anything below the FROM is delcaring which table and we will left join employees onto roles.
            //roles.id = employees.role_id is what the two tables have in common
            .then(answer => {
                const budgetSql = `SELECT 
                SUM (roles.salary) AS department_budget 
                FROM roles LEFT JOIN employees 
                ON roles.id = employees.role_id WHERE department_id =?`;
                const budget = answer.department
                connection.query(budgetSql, budget, (err, result) => {
                    if (err) throw err;
                    const table = cTable.getTable(result);
                    console.log(table);
                    promptQuestion();
                })
            })
    })
};

//export the functions
module.exports = {
    viewDept,
    viewRoles,
    viewEmployees,
    addDept,
    addRole,
    addEmployee,
    updateEmpRole,
    deleteEmployee,
    viewBudget
}