var person = {
    name: 'Darren',
    age: 23
};

var personJSON_string = JSON.stringify(person); //takes object or array and convert to string

console.log(personJSON_string);
console.log(typeof personJSON_string);

var personObject = JSON.parse(personJSON_string); //take string and convert to JSON
console.log(personObject.name);
console.log(typeof personObject);


console.log('\n\nChallege start');
//use JSON parse to conver to js object
//add age property
//convert back to JSON and print
var animal = '{"name": "Halley"}';
console.log(animal);
console.log(typeof animal);

var animalObject = JSON.parse(animal); //convert JSON string to js object
animalObject.age = 123;                //add age propery
console.log(" ");
console.log(animalObject);
console.log(typeof animalObject);


var animalJSON = JSON.stringify(animalObject);  //convert back to JSON

console.log("");
console.log(animalJSON);
console.log(typeof animalJSON);