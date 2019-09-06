var express = require('express');
var router = express.Router();


// npm install web3 --save
const Web3 = require('web3');

// npm install ethereumjs-tx --save
const Tx = require('ethereumjs-tx').Transaction;

var w3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

// 보냄
var EOA1 = '0xC650eE97f6DA9e5b836Ab2F0C72a333aF644F87c';
var EOA1_PRIVATE_KEY = '8275990d129d9c0bf3445a3e364a93cc58c3ff975e98b8215d9a6b0ec0f5dee2';

// 받음
var EOA2 = '0xC19ABcC4343bEE98310b5F0CD1939F70565C1DbA';

const Gwei = 9;
const unit = 10 ** Gwei;
const gasLimit = 21000;
const gasPrice = 21 * unit;

// 미해결, 계류 중인 것이 있는지 확인
w3.eth.getTransactionCount(EOA1, "pending", (err,nonce) => {
	let allEth = 50000000000;

	let rawTx = {
		nonce : nonce, /* 채굴 난이도 */
		gasPrice : gasPrice,
		gasLimit : gasLimit,
		value : allEth,
		from : EOA1,
		to : EOA2
	}

// 개인키 16진수로 변경함.
	var privateKey = new Buffer.from(EOA1_PRIVATE_KEY, "hex");

	var tx = new Tx(rawTx); // Tx 객체 생성
	tx.sign(privateKey); // 개인키로 서명

	let serializedTx = tx.serialize();

	w3.eth.sendSignedTransaction("0x" + serializedTx.toString("hex"),
		(err, txhash) => {
			if(!err) {
				console.log(txhash);
				w3.eth.getBalance(EOA1, (err, balanceOfEOA1) => {
					console.log("EOA1 balance : ", balanceOfEOA1);
				});
				w3.eth.getBalance(EOA2, (err, balanceOfEOA2) => {
					console.log("EOA2 balance : ", balanceOfEOA2);
				});
			}
			else {
				console.log(err);
			}
	})
});


module.exports = router;
