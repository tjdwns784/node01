var express = require('express');
var router = express.Router();
var Web3 = require('web3');

var w3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

/* GET home page. */
//127.0.0.1:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//127.0.0.1:3000/account_list
router.get('/account_list', function(req, res, next){
  w3.eth.getAccounts(function(error, result){
    res.render('account_list', 
      { title:'account_list', account_list:result });
  });
});

// 127.0.0.1:3000/balance_one.ajax?acad=157552154474
router.get('/balance_one.ajax',function(req,res,next){
  var ac = req.query.acad;
  w3.eth.getBalance(ac,(err,balanceOf) => {
    res.json({ret: balanceOf});
    res.end();
  });
})

router.post('/send_tran', function(req,res,next){
  var a1 = req.body.addr1;
  var a2 = req.body.addr2;
  var et = req.body.eath;

  w3.eth.sendTransaction({from:a1, to:a2, value:et},(err, txHash)=>{
    console.log(txHash);
    res.redirect('/account_list');
  })
});

module.exports = router;