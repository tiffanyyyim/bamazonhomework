var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "XiCHFHS8",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
//    listBamazonItems();
    ask();
});

//function listBamazonItems(){
//    connection.query("Select item_id, product_name, price from products", function(err, res){
//        if (err) throw err; 
//        console.log(res);
//    
//    });
//}
    
    
//Prompt the user, what would you like to buy? 
function ask(){
    inquirer.prompt([
    {
        type: "input",
        name: "itemToBuy",
        message: "What item_id do you want to buy?"
    }
        ,
    {
//Prompt the user, how many would you like to buy? 
        type: "input",
        name: "quantity",
        message: "How many do you want to buy?"
    }
    ])
    .then(function(answer){
        //sets the users asnwer to a variable
        var userItem = answer.itemToBuy; 
        //query varible
        var query = "Select stock_quantity from products where ?";
        //running the query against the database with the query and answer from above 
        connection.query(query, {item_id: answer.itemToBuy}, function(err, res){
        if (err) throw err;
        console.log(res);
        });    
        
     });
}  

        
        //sets the users second answer to a variable
//        var userQuantity = answers.quantity; 
//        //console log to check above line is working 
//        console.log(userQuantity);
//        if (userQuantity <= results){
//            console.log("you bought it");
//        } else 
//        {
//            console.log("there is not enough stock");
//        }
//        
//    });
//}

//function compareUserQunntityToDB() {
//    var query = "Select stock_quantity from products where item_id ?";
//    connection.query(query, {id: answers.itemToBuy}, function(err, res){
//        console.log(res);
//    });
////}
//run the SQL query: select stock_quantity from products where item_id = 1
//compare the SQL query result to the variable from user's second question answer 
    //if user's answer <= store quantity, 
        //Your total = quanity * price from database 
        //database quantiy decreases by current quantity minus user's input 
    //else tell the user "insufficient quantity!"