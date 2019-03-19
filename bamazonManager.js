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
  promptUser();
});

// Inital Manager Prompt
function promptUser() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'managerOptions',
      message: 'Please select one of the options below:',
      choices: [
        'View Products For Sale',
        'View Low Inventory',
        'Add to Inventory',
        'Add New Product'
      ]
    }
  ]).then(function (answers) {
    switch (answers.managerOptions) {
      case 'View Products For Sale':
        viewProducts();
        break;
      case 'View Low Inventory':
        viewLow();
        break;
      case 'Add to Inventory':
        addStock();
        break;
      case 'Add New Product':
        addNew();
        break;
      default:
        console.log('There was an error in the promptUser()');
        break;
    }
  });
}

//View a table of all products in inventory
function viewProducts() {
  connection.query('SELECT * FROM products', function (err, response) {
    if (err) throw err;
    console.table(response);
    promptUser();
  })

}
// View a table of all products with less than 5 in stock
function viewLow() {
  connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (err, response) {
    if (err) throw err;
    console.table(response);
    promptUser();
  })
}

// Prompts the user to add stock to an existing item
function addStock() {
  inquirer.prompt([
    {
      name: 'productID',
      message: 'What is the ID of the product you are adding?',
    },
    {
      name: 'quantity',
      message: 'How many are you adding?',
    }
  ]).then(function (answers) {
    connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${answers.quantity} WHERE item_id = ${answers.productID}`, function (err, response) {
      if (err) throw err;
      console.log(`You successfully added ${answers.quantity}`)
      promptUser();
    })
  });
}

// Prompts the user to add a new item to the inventory
function addNew() {
  inquirer.prompt([
    {
      name: 'productName',
      message: 'What is the name of the product you are adding?',
    },
    {
      name: 'departmentName',
      message: 'What department does this belong to?',
    },
    {
      name: 'price',
      message: 'What is the price of one unit?',
    },
    {
      name: 'quantity',
      message: 'Hom many are you adding to the inventory?',
    }
  ]).then(function (answers) {
    var query = `INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("${answers.productName}","${answers.departmentName}","${answers.price}","${answers.quantity}")`;
    console.log(query);
    connection.query(query,
      function (err, response) {
        if (err) throw err;
        console.log('You have successfully added this item');
        connection.end();
        promptUser();
      })
  });
}



