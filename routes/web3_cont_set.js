// 파일명 web3_cont_get.js
var express = require('express');
var router = express.Router();

// npm install web3 --save
var Web3 = require('web3');

//npm install ethereumjs-tx --save
const Tx = require('ethereumjs-tx').Transaction

// 계약서 내용 변경 
var w3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// var ABI = [
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "var1",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "_var1",
// 				"type": "string"
// 			}
// 		],
// 		"name": "setString",
// 		"outputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "run",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ];
// var CA = '0xc86bfcb9086bd0424704ca8e28e4932a4997e3da';
var ABI=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "set_num",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_num",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
var CA='0x390325e0561fa4ed27df5c046f7918873a4cb4d3';


const Contract = new w3.eth.Contract(ABI,CA);

var EOA1='0xF774e42e751EC764feFE40145265ACF3a241B845';
var PRIVATE_KEY='e564fbf775aa895d2a8cf967c2c965a5374f9ec246f67c9187f1e8a78d99d15b';

// var setStringExec = Contract.methods.setString("change hello world");
// var setStringByteCode = setStringExec.encodeABI();


var setStringExec = Contract.methods.set_num(30);
var setStringByteCode = setStringExec.encodeABI();


const Gwei = 9;
const unit = 10 ** Gwei;
const gasLimit = 221000;
const gasPrice = 21 * unit;

w3.eth.getTransactionCount(EOA1, "pending", (err, nonce) => {
	var rawTx = {
		nonce: nonce,
		gasPrice: gasPrice,
		gasLimit: gasLimit,
		data: setStringByteCode,
		from: EOA1,
		to: CA
	}
	let privateKey = new Buffer.from(PRIVATE_KEY, "hex");
	let tx = new Tx(rawTx);
	tx.sign(privateKey);
	let serializedTx = tx.serialize();
	w3.eth.sendSignedTransaction('0x'+serializedTx.toString("hex"),
		(err, txHash) => {
			console.log('txHash', txHash);
		})
})

module.exports = router;