var express = require('express');
var router = express.Router();
var Web3 = require('web3');

// npm install mongodb --save
var MongoClient = require("mongodb").MongoClient;
const Tx = require('ethereumjs-tx').Transaction
var w3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


// 127.0.0.1:3000/customer/insert
router.get('/insert', function (req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('customer');
      collection.find({}).toArray(function (err, docs) {
        res.render("customer_insert", { CA: 'CA', CA: docs[0].CA });

      });
    }
  });
});

router.post('/insert', function (req, res, next) {
  var a = req.body.id;
  var b = req.body.na;
  var c = req.body.ag;

  var newAc =''
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('customer');
    
      collection.find({}).toArray(function (err, docs) {

        //console.log(docs[0].CA)
        //console.log(docs[0].ABI)

        abi = docs[0].ABI
        ca = docs[0].CA


        
        w3.eth.personal.newAccount('p', (err, createdAddress) => {
          if (!err) {
            console.log('newAccount', createdAddress)
            newAc = createdAddress
            arr = { "id": a, "name": b, "age": c, "ABI": abi, "CA": ca, "account": newAc };
            var collection = dbconn.db("item").collection('customer');
            collection.insertOne(arr).then(function (result) {
              console.log(result);
              
            });
          }
        });
        
        
        
        const Contract = new w3.eth.Contract(abi, ca)

        var EOA1 = '0xF774e42e751EC764feFE40145265ACF3a241B845';
        var PRIVATE_KEY = 'e564fbf775aa895d2a8cf967c2c965a5374f9ec246f67c9187f1e8a78d99d15b';

        var setStringExec = Contract.methods.setJoinString(a, b, c)
        var setStringByteCode = setStringExec.encodeABI()

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
            to: ca
          }
          let privateKey = new Buffer.from(PRIVATE_KEY, "hex");
          let tx = new Tx(rawTx);
          tx.sign(privateKey);
          let serializedTx = tx.serialize();
          w3.eth.sendSignedTransaction('0x' + serializedTx.toString("hex"),
            (err, txHash) => {
              console.log('txHash', txHash);
            })
        });

      })
      res.redirect("/customer/select");
    }
  });

});

router.get('/select', function (req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('customer');
      collection.find({}).toArray(function (err, docs) {
        res.render("customer_select", { list: docs });
      })
    }
    dbconn.close(); //연결 닫기
  });
});

//127.0.0.1:3000/customer/delete?no=1
router.get('/delete', function (req, res, next) {
  var arr = { id: req.query.id };
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('customer');
      collection.deleteOne(arr).then(function (result) {
        console.log('delete : ', result);
        res.redirect("/customer/select");
      })
    }
    //dbconn.close();
  });
});


router.get('/update', function (req, res, next) {
  var id = req.query.id;
  var arr = { id: id };
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('customer');
      collection.find(arr).toArray(function (err, docs) {
        res.render("customer_update", { list: docs });
      });
    }
    dbconn.close();
  });

});

router.post('/update', function (req, res, next) {
  var a = req.body.id;
  var b = req.body.na;
  var c = req.body.ag;

  var arr = { id: a }; //조건
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('customer');
      collection.find({}).toArray(function (err, docs) {

        console.log(docs[0].CA)
        console.log(docs[0].ABI)

        abi = docs[0].abi
        ca = docs[0].ca


        const Contract = new w3.eth.Contract(abi, ca)
        var arr = { "id": a, "name": b, "age": c, "abi": abi, "ca": ca };

        var collection = dbconn.db("item").collection('customer');


        var EOA1 = '0xF774e42e751EC764feFE40145265ACF3a241B845';
        var PRIVATE_KEY = 'e564fbf775aa895d2a8cf967c2c965a5374f9ec246f67c9187f1e8a78d99d15b';

        var setStringExec = Contract.methods.setJoinString(a, b, c)
        var setStringByteCode = setStringExec.encodeABI()

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
            to: ca
          }
          let privateKey = new Buffer.from(PRIVATE_KEY, "hex");
          let tx = new Tx(rawTx);
          tx.sign(privateKey);
          let serializedTx = tx.serialize();
          w3.eth.sendSignedTransaction('0x' + serializedTx.toString("hex"),
            (err, txHash) => {
              console.log('txHash', txHash);
            })
        });

      })
      collection.updateMany(arr,
        { $set: { name: b, age: c } }).then(function (result) {
          res.redirect("/customer/select");
        });

    }

    dbconn.close();
  });
});

router.get('/send', function (req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    var id = req.query.id;
    if (err) {
      console.log('error', err);
    } else {
      var collection = dbconn.db("item").collection('customer');
      collection.find({id:id}).toArray(function (err, docs) {
        res.render("customer_send", { list: docs });
        //console.log(docs);
      })
    }
  });
});


router.post('/send', function (req, res, next) {
  // 1번 관리자
  var EOA1 = '0x80e2ad3508f864197722Ce6E80BF0030c34DFf03';
  var EOA1_PRIVATE_KEY = '63d39d738a4115a727f99737981cef2cdbe7273996c6cd7d0b032d09a52d78b8';

  // 2번이 받음
  var EOA2 = req.body.getac;

  const Gwei = 9;
  const unit = 10 ** Gwei;
  const gasLimit = 21000;
  const gasPrice = 21 * unit;

  // 미해결, 계류 중인 것이 있는지 확인
  w3.eth.getTransactionCount(EOA1, "pending", (err, nonce) => {
    let allEth = req.body.pr;

    let rawTx = {
      nonce: nonce, /* 채굴 난이도 */
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      value: allEth,
      from: EOA1,
      to: EOA2
    }

    // 개인키 16진수로 변경함.
    var privateKey = new Buffer.from(EOA1_PRIVATE_KEY, "hex");

    var tx = new Tx(rawTx); // Tx 객체 생성
    tx.sign(privateKey); // 개인키로 서명

    let serializedTx = tx.serialize();

    w3.eth.sendSignedTransaction("0x" + serializedTx.toString("hex"),
      (err, txhash) => {
        if (!err) {
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
  res.redirect("/customer/select");
});

module.exports = router;