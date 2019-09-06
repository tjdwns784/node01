var express = require('express');
var router = express.Router();

var Web3 = require('web3');

console.log('web3_conn start');

var w3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
var ws3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:7545"));

// 블록 갯수 얻기
w3.eth.getBlockNumber((err, blockCount) => {
    //console.log('blockCount', blockCount);
});

// 블록 정보 보기
w3.eth.getBlock(0, (err, blockInfo) => {
    //console.log(blockInfo);
});

// 블록 생성 이벤트 받기
ws3.eth.subscribe('newBlockHeaders', function(error, result) {
    if(!error){
        console.log('newBlock : ', result);
    }
});

module.exports = router;