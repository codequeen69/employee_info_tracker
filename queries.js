const mysql = require('mysql2');
const ctable = require('console.table');
const db = require('./db/connection');

function viewDept(){
 connection.execute(
     `SELECT * FROM department;`,
     function(err, results){
         const table = ctable.getTable(results);
         console.log(table);
     }
 );
};

function viewRoles(){

};

function viewEmployees(){

};

module.exports =  {
    viewDept,
    viewRoles,
    viewEmployees
}