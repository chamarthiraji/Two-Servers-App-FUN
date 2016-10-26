var mysql = require('mysql');
var inquirer = require('inquirer');
var tempres ;

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
        console.log(res[i].itemID + " | " + res[i].productName + " | " + res[i].price + " | " + res[i].stockQuantity);
    }
    console.log("-----------------------------------");

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
            console.log("inside else");
            console.log("stockQuantity updated : ",res[answer.pId-1 ].stockQuantity - answer.quantity);
            connection.query("UPDATE products SET ? WHERE ?", [{
                    stockQuantity: res[answer.pId-1].stockQuantity - answer.quantity
                }, {
                    itemID: answer.pId
                }
            ], function(err, res) {
                console.log("UPDATE res: "+res);
                return;
            }); 
            /* connection.query(" UPDATE products SET  stockQuantity="+res[answer.pId -1].stockQuantity - answer.quantity+
                    " where itemID="+answer.pId-1, function(err, res) {
                        console.log("updated table");
                console.log("UPDATE err: "+err);
                //return; 
                console.log("UPDATE res: "+res);
            
            });
            */
        }
       // UPDATE products SET stockQuantity=13 where itemID=4;

        
    })
}) 



var toBuyItems = function(res) {
    //console.log("res",res);
    //console.log()
    tempres=res;
    inquirer.prompt([{
            name: "pId",
            type: "input",
            message: "Please Enter Id of the Product you want to buy "},
        {
            name: "quantity",
            type: "input",
            message: "Please Enter number of Products you want to buy "   
        },{
            tempres2:tempres
        }
        ]).then(function(answer) {
            //conole.log("tempre: ",tempres);

        conole.log("tempres2: ",answer.tempres);
            console.log("inside then");
            console.log("answer.quantity ",answer.quantity);
            console.log("tempres[pId-1].stockQuantity",tempres[pId-1].stockQuantity);

            if (answer.quantity > tempres[pId].stockQuantity) {
                console.log("Insufficient Quantity ");
            }
            else{
                 connection.query("UPDATE products SET ? WHERE ?", [{
                 stockQuantity:tempres[pId].stockQuantity - answer.quantity
                 }, {
                itemID: pId
                }], function(err, res) {});


            }

        
    })
};
