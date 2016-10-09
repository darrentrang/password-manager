console.log("starting password manager...");

//include 3rd party libraries in your files
var storage = require('node-persist');
storage.initSync(); //gets computer ready to saving variables

//to run this via command line and using npm must doe
//     npm start -- create -n Darren -u yoshemango -p password
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
                }
            });
    })
    .command('print', 'print all accounts', function(yargs){})
    .help('help')
    .argv;


//account.name
//account.username
//account.password
function createAccount (account){
	var accounts = storage.getItemSync('accounts');
	//if account is undefined (use type of) then set accounts to empty array
	if(typeof accounts === 'undefined')
	{
		accounts = [];
	}

	accounts.push(account);
	storage.setItemSync('accounts',accounts);
}

function getAccount (accountName){
	var accounts = storage.getItemSync('accounts');
	//var matchedAccount;
	/*accounts.forEach(function(account){ //cannot break out of forEach so this will get last occurence
	    if(account.name === accountName)
	        matchedAccount = account;
	});*/
	for(var i = 0; i < accounts.length; i++)
	{
	    if(accounts[i].name === accountName)
	        return accounts[i]; //get first occurence
	}
	//return matchedAccount;
}

function printAllAccounts()
{
    var accounts = storage.getItemSync('accounts');
    accounts.forEach(function(account){
        console.log(account.name);
        console.log(account.username);
        console.log(account.password);
        console.log(' ');
    });
}


var command = argv._[0];
console.log('command = ' + command);
console.log(argv);
if(command === 'create' && typeof argv.name !== 'undefined' && typeof argv.username !== 'undefined' && typeof argv.password !== 'undefined')
{
    console.log('creating an account... ' + argv.name + ' ' + argv.username + ' ' + argv.password);
    var account_to_create = {name: argv.name, username: argv.username, password: argv.password};
    createAccount(account_to_create);
}
else if(command === 'get' && typeof argv.name !== 'undefined')
{
    console.log('getting an account... ' + argv.name);
    var acc = getAccount(argv.name);
    if(typeof acc !== 'undefined')
    {
        console.log('name: ' + acc.name);
        console.log('username: ' + acc.username);
        console.log('password: ' + acc.password);
    }
}
else if(command === 'print')
{
    console.log('printing all accounts...');
    printAllAccounts();
}
else
{
    console.log('you did not provide any commands dumbass');
}










