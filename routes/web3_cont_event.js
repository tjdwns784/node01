var express = require('express');
var router = express.Router();

//npm install web3 --save
var Web3 = require('web3');

const ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_var1",
				"type": "string"
			}
		],
		"name": "setString",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_var1",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "val1",
				"type": "string"
			}
		],
		"name": "E_setString",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getString",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "var1",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

const CA = '0xc86bfcb9086bd0424704ca8e28e4932a4997e3da'

var w3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
var ws3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));

var contract = new ws3.eth.Contract(ABI, CA);

//이벤트 받기
contract.events.E_setString({}, function(err, event){
  if(!err){
    console.log(event);
    console.log('event : ', event.returnValues.val1);
  }
});

module.exports = router;
