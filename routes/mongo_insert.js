//파일명 : mongo_insert.js
var express = require('express');
var router = express.Router();

//npm install mongodb --save
var MongoClient = require("mongodb").MongoClient;

//127.0.0.1:3000/mongo/insert
router.get('/insert', function(req, res, next) {
  res.render("insert");
});


router.post('/insert', function(req, res, next) {
  var a =  req.body.no;
  var b =  req.body.na;
  var c =  req.body.pr;
  var d =  req.body.cn;

  var arr = {"no":a, "name":b, "price":c, "cnt": d};
  console.log(arr);
   
  MongoClient.connect('mongodb://localhost:27017/item', function(err, dbconn){
    if(err) {
      console.log('error', err);
    }
    else{
      var collection = dbconn.db("item").collection('table1'); 
      collection.insertOne(arr).then(function(result){
        console.log(result);
        res.redirect("/mongo/select");
      })
    }
    dbconn.close(); //연결 닫기
  });
});

//127.0.0.1:3000/mongo/select
router.get('/select', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/item', function(err, dbconn){
    if(err) {
      console.log('error', err);
    }
    else{
      var collection = dbconn.db("item").collection('table1'); 
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
      collection.find({}).toArray(function(err, docs){
        res.render("select", {list:docs});
      })
    }
    dbconn.close(); //연결 닫기
  });
});

//127.0.0.1:3000/mongo/delete?no=1
router.get('/delete', function(req, res, next) {
  var arr = {no : req.query.no};
  MongoClient.connect('mongodb://localhost:27017/item', function(err, dbconn){
    if(err) {
      console.log('error', err);
    }
    else{
      var collection = dbconn.db("item").collection('table1'); 
      collection.deleteOne(arr).then(function(result){
        console.log('delete : ', result);
        res.redirect("/mongo/select");
      })
    }
    //dbconn.close();
  });
});


router.get('/update', function(req, res, next) {
  var no = req.query.no;
  var arr = {no : no};
  MongoClient.connect('mongodb://localhost:27017/item', function(err, dbconn){
    if(err) {
      console.log('error', err);
    }
    else{
      var collection = dbconn.db("item").collection('table1'); 
      collection.find(arr).toArray(function(err, docs){
        res.render("update", {list:docs});
      });
    }
    dbconn.close();
  });

});

router.post('/update', function(req, res, next) {
  var a = req.body.no;
  var b = req.body.na;
  var c = req.body.pr;
  var d = req.body.cn;

  var arr = {no:a}; //조건
  MongoClient.connect('mongodb://localhost:27017/item', function(err, dbconn){
    if(err) {
      console.log('error', err);
    }
    else{
      var collection = dbconn.db("item").collection('table1'); 
      collection.updateMany(arr, 
        {$set:{name:b, price:c, cnt:d}}).then(function(result){
          res.redirect("/mongo/select");
      });
    }
    dbconn.close();
  });
});

module.exports = router;