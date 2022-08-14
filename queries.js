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


function viewDept(){
 connection.execute(
     `SELECT * FROM department;`,
     function(err, results){
         const table = cTable.getTable(results);
         console.log(table);
     }
 );
promptQuestion();
};

function viewRoles(){
    connection.execute(
        `SELECT * FROM roles;`,
        function(err, results){
            const table = cTable.getTable(results);
            console.log(table);
        }
    );
    promptQuestion();
};

function viewEmployees(){
   const sql = `SELECT employees.id,
                employees.first_name,
                employees.last_name,
                roles.title,
                department.dept_name AS department,
                roles.salary,
                CONCAT(manager.first_name,' ', manager.last_name) AS manager
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employees manager ON employees.manager_id = manager.id`;
        connection.query(sql, (err, results) =>{
            const table = cTable.getTable(results);
            console.log(table);
        }
    );
    promptQuestion();
};
function addDept(){
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
    connection.query(sql, dept, (err, results)=>{
const table = cTable.getTable(results);
console.log(table);
viewDept();
    }) 
})

};

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
        },
        { 
            type:'input',
            name: 'salary',
            message: 'What is the salary of the role (without decimals or dollar signs)?'
        },
        {
            type:'list',
            name: 'id',
            message: 'Which department does this role belong to?',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales']
        }
    ])
    .then((answer) =>{
        const sql =`INSERT INTO roles(title, salary, department_id)
        VALUES(?,?,?)`;
        const role = [answer.title, answer.salary, answer.id];
        connection.query(sql, role, (err, results) => {
            const table = cTable.getTable(results);
            console.log(table);
            viewRoles();
        })

    })
    
};

function addEmployee(){
    inquirer.prompt([
        {
         type:'input',
         name:'first',
         message:"What is the employee's first name?"
        },
        {
            type:'input',
            name: 'last',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'roleId',
            message:'What is the role id number of this employee?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the manager id number for this employee?'
        }
    ])
    .then((answer) => {
        const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;
        const employee = [answer.first, answer.last, answer.roleId, answer.managerId];

        connection.query(sql, employee, (err, results) => {
            const table = cTable.getTable(results);
            console.log(table);
            viewEmployees();
        })
    })
};

function updateEmpRole(){
    inquirer.prompt([
        {

        }
    ])

};


module.exports =  {
    viewDept,
    viewRoles,
    viewEmployees,
    addDept,
    addRole,
    addEmployee,
    updateEmpRole
}