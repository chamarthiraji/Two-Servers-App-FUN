var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
var tempres,tprice ;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "ahakra226", //Your password
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);
})

connection.query('SELECT * FROM products', function(err, res) {
    for (var i = 0; i < res.length; i++) {

        //console.log(res[i].itemID + " | " + res[i].productName + " | " + res[i].price + " | " + res[i].stockQuantity);
    }
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
        //conole.log("tempre: ",tempres);

        // conole.log("tempres2: ",answer.tempres);
        console.log("inside then");
        console.log("answer.quantity ",answer.quantity);
        console.log("res[answer.pId-1].stockQuantity",res[answer.pId-1].stockQuantity);


        if (answer.quantity > res[answer.pId-1].stockQuantity) {
            console.log("Insufficient Quantity ");
        }
        else{
          var  remainingStock = res[answer.pId-1 ].stockQuantity - answer.quantity;
            tprice = answer.quantity * res[answer.pId-1 ].price ;
            console.log("inside else");
            console.log("stockQuantity updated : ",res[answer.pId-1 ].stockQuantity - answer.quantity);
            console.log("Your total purchase price " , answer.quantity * res[answer.pId-1 ].price );

            connection.query('UPDATE products,departments SET products.stockQuantity = ?, departments.totalSales = departments.totalSales + ? WHERE products.itemID = ? AND products.dept = departments.dept;',
                [remainingStock, tprice,answer.pId],function(err){
                    if(err) throw err;
                    console.log(err);
            
                console.log('The total cost of purchase is ',tprice);
            
          
               
            }); 

          
            
        }
       
        
    })
}) 

            



