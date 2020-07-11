// var Crypto = require('crypto-js');

// // Crypto = Crypto.Crypto;

// // var key = 'this!smypa$$wordk3y'
// // console.log('program started');

// // var IV = '123456';
// // var MODE = new Crypto.mode.CFB(Crypto.pad.ZeroPadding);
// // var plaintext = 'The answer is no';
// // var input_bytes = Crypto.charenc.UTF8.stringToBytes(plaintext);
// // var key = Crypto.charenc.UTF8.stringToBytes(KEY);
// // var options = {iv: Crypto.charenc.UTF8.stringToBytes(IV), asBytes: true, mode: MODE};


// // var encrypted = Crypto.AES.encrypt(input_bytes, key, options);
// // var encrypted_hex = Crypto.util.bytesToHex(encrypted);
// // console.log(encrypted_hex); // this is the value you send over the wire
// // output_bytes = Crypto.util.hexToBytes(encrypted_hex);
// // output_plaintext_bytes = Crypto.AES.decrypt(output_bytes, key, options);
// // output_plaintext = Crypto.charenc.UTF8.bytesToString(output_plaintext_bytes);
// // console.log(output_plaintext); // result: 'The answer is no'


// var hash = Crypto.MD5("Message");
// console.log(hash.toString());

// var encrypted = Crypto.AES.encrypt("123456", "Secret Passphrase");
// console.log(encrypted.toString());
// // ​
// var decrypted = Crypto.AES.decrypt(encrypted, "Secret Passphrase");
// console.log(decrypted.toString());

// var salt = Crypto.lib.WordArray.random(128 / 8);
// var key128Bits = Crypto.PBKDF2("1234567", salt, {
//   keySize: 128 / 32
// });

// console.log(key128Bits.toString())
// console.log()
// console.log()


// const bcrypt = require('bcrypt');
// const saltRounds = 3;
// const myPlaintextPassword = '123456';
// const someOtherPlaintextPassword = '1234561';
// // let hash;


// // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
// //   console.log(hash);
// //   hash = hash;
// // });

// const hashX = bcrypt.hashSync(myPlaintextPassword, saltRounds);
// console.log(hashX);

// // bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
// //   console.log(result)
// // });

// isAuthenticated = bcrypt.compareSync(someOtherPlaintextPassword, hashX)
// console.log(isAuthenticated);