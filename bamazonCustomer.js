var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
var tempres,tprice ;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "*", //Your password
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
   // console.log("connected as id " + connection.threadId);
});


// here we are querying database to get product table.
//Here we are using console.table to show our result in the form of clean table
connection.query('SELECT * FROM products', function(err, res) {
    console.log("ITEMS AVAILABLE FOR PURCHASE");
    console.log("*********************************************");
    console.log("");
    console.table(res);

    inquirer.prompt([
        {
            name: "pId",
            type: "input",
            message: "Please Enter Id of the Product you want to buy "
        },
        {
            name: "quantity",
            type: "input",
            message: "Please Enter number of Products you want to buy "   
        }
    ]).then(function(answer) {

        //if the customer is asking for more quantity than the available stock
        if (answer.quantity > res[answer.pId-1].stockQuantity) {
            console.log("Insufficient Quantity ");
            connection.end();
        }
        //when customer bought some items ,then we show them the cost of their purchase and update table 
        //here we are also updating totalsales for departments table
        else{
            var  remainingStock = res[answer.pId-1 ].stockQuantity - answer.quantity;
            tprice = answer.quantity * res[answer.pId-1 ].price ;            
            connection.query('UPDATE products,departments SET products.stockQuantity = ?, departments.totalSales = departments.totalSales + ? WHERE products.itemID = ? AND products.dept = departments.dept;',
                [remainingStock, tprice,answer.pId],function(err){
                    if(err) throw err;            
                    console.log('The total cost of purchase is: ',tprice);
                    connection.end();
            });            
        }    
    });     
});