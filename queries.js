const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const {promptQuestion} = require('./index');


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
 )
 //.then(promptQuestion());
};

function viewRoles(){
    connection.execute(
        `SELECT * FROM roles;`,
        function(err, results){
            const table = cTable.getTable(results);
            console.log(table);
        }
    );
};

function viewEmployees(){
    connection.execute(
        `SELECT * FROM employees;`,
        function(err, results){
            const table = cTable.getTable(results);
            console.log(table);
        }
    );
};
function addDept(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of department you would like to add?'
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
            message: 'What is the name of the role you would like to enter?'
        },
        { 
            type:'input',
            name: 'salary',
            message: 'What is the salary of this role(without decimals or dollar signs)?'
        },
        {
            type:'input',
            name: 'id',
            message: 'What is the id of the department this role falls under?'
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
         message:'What is the first name of this employee?'
        },
        {
            type:'input',
            name: 'last',
            message: 'What is the last name of this employee?'
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