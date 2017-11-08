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
        //query varible
        var query = "Select stock_quantity from products where ?";
        //running the query against the database with the query and answer from above 
        connection.query(query, {item_id: answer.itemToBuy}, function(err, stock_quantity){
        if (err) throw err;
        var left = stock_quantity;
        console.log(left);
        if (answer.quantity >= stock_quantity){
            console.log("you ordered too much, not enough in stock"); 
        }  else {
            console.log("your purchase is coming up");
        }
        });    
        
     });
}  
      