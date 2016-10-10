//need to download module from npm
//npm install crypto-js@3.1.5 --save
var crypto = require('crypto-js');

var secretMessage = {
    name: 'Darren',
    secretName: 'yoshemango'
}
var secretKey = "123abc";

//encrypt
var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage), secretKey);    //convert object to string then encrypt
console.log("encrypted message = " + encryptedMessage);

//decrypt
var bytes = crypto.AES.decrypt(encryptedMessage, secretKey); //returns array of bytes
console.log('\nbytes: ' + bytes);
console.log('type of bytes: ' + typeof bytes);
var decryptedMessage = bytes.toString(crypto.enc.Utf8); //turn bytes to utf8. this is now the object in string form
console.log('\ndecrypted message: ' + decryptedMessage);
console.log('type of decryptedMessage = ' + typeof decryptedMessage);

var decryptedMessageObject = JSON.parse(decryptedMessage); //turn the decrypted object in string form to object
console.log("\nsecretMessage.name = " + decryptedMessageObject.name);
console.log("secretMessage.secretName = " + decryptedMessageObject.secretName);




