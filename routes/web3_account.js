var express = require('express');
var router = express.Router();

var web3 = require('web3');

var w3 = new web3(new web3.providers.HttpProvider("http://localhost:7545"));
var ws3 = new web3(new web3.providers.WebsocketProvider("ws://localhost:7545"));

// account 읽기

w3.eth.getAccounts(function(error, result){
    console.log("account list : ", result);

    for(var i=0; i<result.length; i++){
        console.log(result[i]);
        w3.eth.getBalance(result[i], (err, balanceOf) => {
            console.log("balance : ", balanceOf);
        });
    }
//     // 0번에서 5번으로 10000 전송함.
//     w3.eth.sendTransaction({from:result[0], to:result[5], value:10000}, (err, txHash) => {
//         console.log(txHash);
//     })
// });

// // account 생성 
// //     암호 : p
// w3.eth.personal.newAccount('p', (err, createdAddress) => {
//     if(!err){
//         console.log("account address : ", createdAddress);
//     }
// });


// 계정생성 - rpc서버에 나타나지 안ㅁㅎ음
let (address, privatekey) = w3.eth.accounts.create();


// 0번에서 10  번으로 10000 전송함.
w3.eth.sendTransaction({from:result[0], to:result[10], value:10000}, (err, txHash) => {
    console.log(txHash);
    })
});
module.exports = router;
