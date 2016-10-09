var argv = require('yargs')
    .command('hello', 'greets the user', function(yargs){
        yargs.options({
            name: {
                demand: true, //yargs makes sure this argument is provided
                alias: 'n', //short hands --name to --n
                description: 'Your first name goes here',
                type: 'string'
            },
            last_name: {
                demand: true,
                alias: 'l',
                description: 'Your last name goes here',
                type: 'string'
            }
        });
    })
    .help('help') //allows command: node example-args.js hello --help
    .argv; //params to command: (name of command, description, function)


var command = argv._[0]; //the _ is the name of the array of parameters in argv

//enter in command prompt: node example-args.js hello --name Darren. now printing argv has a
//parameter named 'name' with value 'Darren'
console.log(argv);
if(command === 'hello' && typeof argv.name !== 'undefined' && typeof argv.last_name !== 'undefined') {
    console.log('Hello ' + argv.name + ' ' + argv.last_name);
}
else if (command === 'hello'){
    console.log('Hello World!');
}

