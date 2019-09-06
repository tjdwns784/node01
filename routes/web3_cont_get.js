// 파일명 web3_cont_get.js
var express = require('express');
var router = express.Router();

// npm install web3 --save
var Web3 = require('web3');
// 계약서 읽어들이기
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
// Contract.methods.run().call().then(data => {
//     console.log('var1의 값 : ',data);
// })

Contract.methods.get_num().call().then(data => {
    console.log('index의 값 : ',data);
})
module.exports = router;