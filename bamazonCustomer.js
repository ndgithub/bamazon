var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');



var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
});

connection.query('SELECT * FROM products', function (err, response) {
  if (err) throw err;
  console.table(response);
})

promptUser();

function promptUser() {
  inquirer.prompt([
    {
      name: 'productID',
      message: 'What is the ID of the product you would like to buy?'
    },
    {
      name: 'quantity',
      message: 'How many would you like?'
    }
  ]).then(function (answers) {
    completePurchase(answers.productID, answers.quantity);
  })
}

function completePurchase(productId, quantRequested) {
  connection.query('SELECT stock_quantity,price FROM products WHERE item_id = ' + productId, function (err, response) {
    if (err) throw err;
    var stock_quantity = response[0].stock_quantity;
    var price = response[0].price;
    if (quantRequested < stock_quantity) {
      approvePurchase(price, productId, quantRequested, stock_quantity);
    } else {
      console.log(`Sorry, we only have ${stock_quantity} available`);
    }
    connection.end();
  })
}

function approvePurchase(price, productId, quantRequested, stock_quantity) {
  var stock_quantity = stock_quantity - quantRequested;
  connection.query('UPDATE products SET stock_quantity = ' + stock_quantity + ' WHERE item_id = ' + productId, function (err, results) {
    if (err) throw err;
    var output = `Thank you for your purchase. You spent $${price * quantRequested}`;
    console.log(output);
  })
}



