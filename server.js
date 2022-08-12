const inquirer = require('inquirer');
const { viewDept, viewEmployees, viewRoles} =('./queries');

promptQuestion = () => {
return inquirer.prompt([
    {
        type: 'list',
        name: 'options',
        message: 'Please choose one of the following options.',
        choices:['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an Employee', 'Update an employee role']
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