const inquirer = require('inquirer');
const { viewDept,
     viewRoles,
    viewEmployees,
    addDept,
    addRole,
    addEmployee,
    updateEmpRole } = require ('./queries');


promptQuestion = () => {
 inquirer.prompt([
    {
        type: 'list',
        name: 'options',
        message: 'Please choose one of the following options.',
        choices:['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
])
.then((answer) =>{
    switch(answer.options){
        case 'View all departments':
        viewDept();
        break;

        case 'View all roles':
            viewRoles();
            break;
        
        case 'View all employees':
            viewEmployees();
            break;

        case 'Add a department':
            addDept();
            break;
         
        case 'Add a role':
            addRole();
            break;

        case 'Add an employee':
            addEmployee();
            break;

        case 'Update an employee role':
            updateEmpRole();
            break;
    }
})
//.then(promptQuestion)
};
promptQuestion();


// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
//     promptQuestion();

// });

module.exports.promptQuestion = promptQuestion;