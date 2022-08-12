const express = require('express');
const inquirer = require('inquirer');

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
    switch(answer.option){
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
};
promptQuestion();

function viewDept(){

};

function viewRoles(){

};

function viewEmployees(){

};