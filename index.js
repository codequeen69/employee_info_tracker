const inquirer = require('inquirer');
const { viewDept,
     viewRoles,
    viewEmployees,
    addDept,
    addRole,
    addEmployee,
    updateEmpRole,
    deleteEmployee,
    viewBudget}  = require ('./queries');


promptQuestion = () => {
    console.log(
        "================= WELCOME TO EMPLOYEE INFO TRACKER ================" )
 inquirer.prompt([
    {
        type: 'list',
        name: 'options',
        message: 'Please choose one of the following options.',
        choices:['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Delete an employee', 'View budget', 'none']
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
        case 'Delete an employee':
            deleteEmployee();
            break;
        case 'View budget':
            viewBudget()
            break;
        case 'none':
            console.log('Goodbye!')
            process.exit();
    }
})

};
promptQuestion();

module.exports.promptQuestion = promptQuestion;