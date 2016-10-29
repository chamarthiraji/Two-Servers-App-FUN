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
    managerOptions();
});

var managerOptions = function() {
    inquirer.prompt([{
        name: "options",
        type: "list",
        message: "Choose an option?",
        choices: ["View Products for Sale", "View Low Inventory","Add to Inventory","Add New Product"]        
    }]).then(function(answer) {
        console.log("answer.options",answer.options);
        switch(answer.options) {
            case 'View Products for Sale':                 
                viewProducts();
                break;            
            case 'View Low Inventory':
                viewLowInventory();
                break;        
            case 'Add to Inventory':
                addToInventory();
                break;            
            case 'Add New Product':
                addNewProduct();
                break;
            default:
                console.log("give correct option");
        }
    });
};

//function for showing products table
var viewProducts = function(){
    console.log("inside viewProducts");
    connection.query('SELECT * FROM products', function(err, res) {
        if(err) throw err;
        console.table(res);
        connection.end();
           
    });  
};

//function for getting inventory less than 5
var viewLowInventory = function(){
    connection.query('SELECT * FROM products WHERE stockQuantity <5', function(err, res) {
        if(err) throw err;
        console.table(res);
        connection.end();
    });  
}

//if inventory is low ,add inventory
var addToInventory = function(){
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Enter the item ID that u want to update inventory ",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        name: "add",
        type: "input",
        message: "Enter a number for inventory ",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answer) {        
        connection.query("UPDATE products SET? WHERE ?",[{           
             stockQuantity:answer.add
        },{
            itemID:answer.id
            }], function(err, res) {
                    if(err) throw err;
                    connection.end();
        });
    });

}

//adding a new product column
var addNewProduct = function(){
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Enter the item ID ",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        name: "productName",
        type: "input",
        message: "enter productName"
    },
    {
        name: "dept",
        type: "input",
        message: "Enter Department Name"
    },{
        name: "price",
        type: "input",
        message: "Enter price"
    },
    {
        name: "stockQuantity",
        type: "input",
        message: "Enter stockQuantity ",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answer) {
        
        connection.query("INSERT INTO products SET ?",{
         itemID:answer.id,
         productName:answer.productName,
         dept:answer.dept,
         price:answer.price ,
         stockQuantity:answer.stockQuantity

    }, function(err, res) {
                if(err) throw err;
                connection.end();
               
        });
    });
}
