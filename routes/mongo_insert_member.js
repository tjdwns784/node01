var express = require('express');
var router = express.Router();


// npm install mongodb --save
var MongoClient = require("mongodb").MongoClient;

// 127.0.0.1:3000/member/insert
router.get('/insert', function (req, res, next) {
  res.render("member_insert");
});

router.post('/insert', function (req, res, next) {
  var a = req.body.id;
  var b = req.body.pw;
  var c = req.body.na;
  var d = req.body.ad;
  var e = req.body.ag;

  var arr = { "id": a, "password": b, "name": c, "address": d, "age": e };
  console.log(arr);

  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('member');
      collection.insertOne(arr).then(function (result) {
        console.log(result);
        res.redirect("/member/select");
      })
    }
    dbconn.close(); //연결 닫기
  });
});

//127.0.0.1:3000/member/select
router.get('/select', function (req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('member');
      //SELECT * FROM table1;
      //collection.find({}).toArr~~

      //SELECT id, pw FROM table1;  
      //collection.find({}, {'projection':{id:1, pw:1}}).toArr~~

      //SELECT * FROM table1 LIMIT 5;
      //collection.find({}).limit(5).toArr~~

      //SELECT * FROM table1 ORDER BY id DESC LIMIT 3
      //collection.find({}).sort({id:-1}).limit(3).toArr~~

      //SELECT * FROM table1 WHERE age > 10
      //collection.find({ age : {$gt : 10} }).toArr~~
      collection.find({}).toArray(function (err, docs) {
        res.render("member_select", { list: docs });
      })
    }
    dbconn.close(); //연결 닫기
  });
});

//127.0.0.1:3000/member/delete?no=1
router.get('/delete', function (req, res, next) {
  var arr = { id: req.query.id };
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('member');
      collection.deleteOne(arr).then(function (result) {
        console.log('delete : ', result);
        res.redirect("/member/select");
      })
    }
    //dbconn.close();
  });
});


router.get('/update', function (req, res, next) {
  var id = req.query.id;
  var arr = { id : id };
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('member');
      collection.find(arr).toArray(function (err, docs) {
        res.render("member_update", { list: docs });
      });
    }
    dbconn.close();
  });

});

router.post('/update', function (req, res, next) {
  var a = req.body.id;
  var b = req.body.pw;
  var c = req.body.na;
  var d = req.body.ad;
  var e = req.body.ag;

  var arr = { id : a }; //조건
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('member');
      collection.updateMany(arr,
        { $set: { password: b, name: c, address: d, age: e } }).then(function (result) {
          res.redirect("/member/select");
        });
    }
    dbconn.close();
  });
});

module.exports = router;