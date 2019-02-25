var inquirer = require('inquirer')
var mysql = require('mysql')

//var connection = require("./connection.js");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "catsrock!",
    database: 'bamazon'
})

connection.connect(function (err) {
    if (err) throw err
    start()
})

function start() {

    console.log("Welcome to Bamazon! \n");

    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Would you like to do?',
            choices: ['See a list of items', 'Bid on an item', 'Exit Bamazon']
        }
    ]).then(function (answers) {
        console.log('----- ' + answers.choice.toUpperCase() + ' -----')
        if (answers.choice === "See a list of items") {
            viewItems()
        } else if (answers.choice === 'Bid on an item') {
            pruchaseAnItem()
        } else {
            exitBamazon()
        }
    })
}

function viewItems() {
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;
        //console.log(results);
        //console.log("\n");
        results.forEach(function(products) {
            console.log(`ID: ${products.item_id} | ${products.product_name} | ${products.department_name} | PRICE: ${products.price} | QUANTITY: ${products.stock_quality}`);
          });
      });
      //console.log(query.sql);

      console.log("");
      //console.log("\n ------------------------- \n");

      mainMenu();
}

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Would you like to do?',
            choices: ['See a list of items', 'Purchase an item', 'Exit Bamazon']
        }
    ]).then(function (answers) {
        console.log('----- ' + answers.choice.toUpperCase() + ' -----')
        if (answers.choice === "See a list of items") {
            viewItems()
        } else if (answers.choice === 'Purchase an item') {
            purchaseAnItem()
        } else {
            exitBamazon()
        }
    })
}

function purchaseAnItem() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'itemId',
            message: 'Please enter the ID number of the item you would like to buy.'
        },
        {
            type: 'input',
            name: 'itemNumber',
            message: 'How many of this item would you like to buy?',
            validate: function (val) {
                if (!isNaN(val)) {
                    return true
                } else {
                    return 'Please only enter numbers'
                }
            }
        }
    ]).then(function (answers) {

        var productId = parseInt(answers.itemId);
        var numberOfProduct = parseInt(answers.itemNumber);

        connection.query("SELECT * FROM products WHERE item_id= ?", [
            productId
        ], function(error, products) {
            if (error) throw error;
            //console.log(answers.itemId);
            //console.log(products);
            for (var i = 0; i < products.length; i++) {
                //console.log(products[i].stock_quality)
                if (products[i].stock_quality > numberOfProduct) {
                    var total = products[i].price * numberOfProduct;

                    console.log("There are enough of " + products[i].product_name + "!");
                    console.log("Your total purchase cost is $" + total);
                    console.log("\n ------- \n");
                    //console.log(products[i].product_name);
                    connection.query("UPDATE products SET ? WHERE ?", [
                        {
                            stock_quality: (products[i].stock_quality - numberOfProduct),
                            //stock_quantity: (products[i].stock_quantity - quantity)
                        },
                        {
                            item_id: products[i].item_id,
                        }
                    ], function(error, sold) {
                        if (error) throw error;

                        //console.log("Congrats! You just bought " + numberOfProduct + " of " + products[i].product_name + "!");

                        console.log("Enjoy your purchase!");
                        //console.log("Your total purchase cost is $" + total);
                        
                        mainMenu();
                    })
                } else {
                    console.log("Insufficent Quality! Please try again!");

                    mainMenu();
                }
        }
        });
    })
}



function exitBamazon() {

    console.log("Goodbye! Thank you for shoppng!");

    connection.end();
}