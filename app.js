console.log("starting password manager...");

//include 3rd party libraries in your files
var storage = require('node-persist');
storage.initSync(); //gets computer ready to saving variables
var crypto = require('crypto-js');

//to run this via command line and using npm must doe
//     npm start -- create -n Darren -u yoshemango -p password
//               -- get
//               -- print
//                 ....... --mp dm7 (expand that)
//      or else you have to do
//     node app.js create -n Darren -u yoshemango -p password
var argv = require('yargs')
    .command('create', 'create an account', function(yargs){
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'name on account',
                type: 'string'
            },
            username: {
                demand: true,
                alias: 'u',
                description: 'username of account',
                type: 'string'
            },
            password:{
                demand: true,
                alias: 'p',
                description: 'password for account',
                type: 'string'
            },
            masterPassword:{
                demand: true,
                alias: 'mp',
                description: 'master password for encryption',
                type: 'string'
            }
        });
    })
    .command('get', 'get an account', function(yargs){
            yargs.options({
                name: {
                    demand: true,
                    alias: 'n',
                    description: 'name on account to get',
                    type: 'string'
                },
                masterPassword: {
                    demand: true,
                    alias: 'mp',
                    description: 'master password for decryption',
                    type: 'string'
                }
            });
    })
    .command('print', 'print all accounts', function(yargs){
        yargs.options({
            masterPassword: {
                demand: true,
                alias: 'mp',
                description: 'master password for decryption',
                type: 'string'
            }
        });
    })
    .help('help')
    .argv;


//account.name
//account.username
//account.password
function createAccount (account, masterPassword){
	// var accounts = storage.getItemSync('accounts');
	// //if account is undefined (use type of) then set accounts to empty array
	// if(typeof accounts === 'undefined')
	// {
	// 	accounts = [];
	// }
    var accounts = getAccounts(masterPassword);
	accounts.push(account);
	saveAccounts(accounts, masterPassword);
}

function getAccount (accountName, masterPassword){
	//var accounts = storage.getItemSync('accounts');
	//var matchedAccount;
	/*accounts.forEach(function(account){ //cannot break out of forEach so this will get last occurence
	    if(account.name === accountName)
	        matchedAccount = account;
	});*/

    var accounts = getAccounts(masterPassword);
	for(var i = 0; i < accounts.length; i++)
	{
	    if(accounts[i].name === accountName)
	        return accounts[i]; //get first occurence
	}
	//return matchedAccount;
}

function printAllAccounts(masterPassword)
{
    var encrypted_accounts = storage.getItemSync('accounts'); //returns encrypted string
    if(typeof encrypted_accounts === 'undefined')
    {
        console.log("no accounts");
    }
    else
    {
        var decrypted_bytes = crypto.AES.decrypt(encrypted_accounts, masterPassword); //convert encrypted array to bytes
        var decrypted_accounts_string = decrypted_bytes.toString(crypto.enc.Utf8); //string of decrypted accounts
        var accounts = JSON.parse(decrypted_accounts_string); //convert accounts string to JSON accounts

        accounts.forEach(function(account) {
            console.log("name = " + account.name);
            console.log("username = " + account.username);
            console.log("password = " + account.password);
            console.log(" ");
        });
    }
}


function getAccounts(masterPassword)
{
    //use getitemsync to fetch accounts
    //decrypt
    //return accounts array
    var encrypted_accounts = storage.getItemSync('accounts'); //returns encrypted string
    var accounts = [];
    if(typeof encrypted_accounts === 'undefined')
    {
        return accounts;
    }
    else
    {
        var decrypted_bytes = crypto.AES.decrypt(encrypted_accounts, masterPassword); //convert encrypted array to bytes
        var decrypted_accounts_string = decrypted_bytes.toString(crypto.enc.Utf8); //string of decrypted accounts
        accounts = JSON.parse(decrypted_accounts_string); //convert accounts string to JSON accounts
    }
    return accounts;
}

function saveAccounts(accounts, masterPassword)
{
    var encrypted_accounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
    storage.setItemSync('accounts', encrypted_accounts.toString());
    return accounts;
}

var command = argv._[0];
console.log('command = ' + command);
console.log(argv);
if(command === 'create' && typeof argv.name !== 'undefined' && typeof argv.username !== 'undefined' && typeof argv.password !== 'undefined' 
    && typeof argv.masterPassword !== 'undefined')
{
    try
    {
        console.log('creating an account... ' + argv.name + ' ' + argv.username + ' ' + argv.password);
        var account_to_create = {name: argv.name, username: argv.username, password: argv.password};
        createAccount(account_to_create, argv.masterPassword);
    }
    catch(e)
    {
        console.log("Unable to create account. Make sure you have all parameters.");
        console.log(e.message);
    }
}
else if(command === 'get' && typeof argv.name !== 'undefined' && argv.masterPassword !== 'undefined')
{
    try
    {
        console.log('getting an account... ' + argv.name);
        var acc = getAccount(argv.name, argv.masterPassword);
        if(typeof acc !== 'undefined')
        {
            console.log('name: ' + acc.name);
            console.log('username: ' + acc.username);
            console.log('password: ' + acc.password);
        }
    }
    catch(e)
    {
        console.log("Unable to get account.");
        console.log(e.message);
    }
}
else if(command === 'print' && typeof argv.masterPassword !== 'undefined')
{
    try
    {
        console.log('printing all accounts...');
        printAllAccounts(argv.masterPassword);
    }
    catch(e)
    {
        console.log("unable to print all accounts. make sure master password is correct");
        console.log(e.message);
    }
}









