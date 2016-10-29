var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
var tempres ;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "*", //Your password
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("");
    executiveOptions();
});

var executiveOptions = function() {
    inquirer.prompt([{
        name: "options",
        type: "list",
        message: "Choose an option?",
        choices: ["View Product Sales by Department", "Create New Department"]

        
    }]).then(function(answer) {
        //  console.log("answer.options",answer.options);
        switch(answer.options) {
            case 'View Product Sales by Department':
                viewSalesByDept();
           		break;
            case 'Create New Department':
                createNewDept();
            	break;           
        }
        console.log("");
    });
};

// here we are showing department table
//we are caluculating and creating(column) total profit.
function viewSalesByDept(){
	connection.query('SELECT deptID,dept,overHeadCosts,totalSales,totalSales - OverHeadCosts as totalProfit FROM departments',
		function(err,results){
			console.table(results);
			connection.end();
	});

}

//creating a new dept by using insert
function createNewDept(){
	inquirer.prompt([{name:"dept",message:"Enter Department name: "},
					{name:"costs",message:"Enter OverHeadCosts: ",validate: function(value){
							if(parseFloat(value)>=0){
								return true;
							}
						}
					}])
		.then(function(answer){	
				connection.query('INSERT INTO departments SET ?',
					{dept: answer.dept, 
					 OverHeadCosts: answer.costs
					},function(err,results){
						if(err) throw err;
						console.log('Added dept in the table.');						
						// console.table(results);
						connection.end();				
					});
	});
}