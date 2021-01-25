const express = require('express');
const router = express.Router();
var AWS = require('aws-sdk');

AWS.config.update({
    region: "ap-southeast-1",
    accessKeyId: "AKIAJ6KJYUSOVUXZKDDQ",
    secretAccessKey: "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",
  });

  var docClient = new AWS.DynamoDB.DocumentClient()

  router.get("/index", (req, res) => {
      res.render('index');
  })

  router.get("/student", (req, res) => {
      var params ={
          TableName: "Students",
      };
      docClient.scan(params, function(err, data) {
          if(err) {
              console.log('Unable to read student.Error JSON: ', JSON.stringify(err, null, 2));
          }else{
              console.log('GetItem succeeded: ', JSON.stringify(data, null, 2));
              res.json(data.Items);
          }
      });
  })

  router.get("/getstudent/:id", (req, res) => {
      let id = req.params.id;
      var params = {
          TableName: "Students",
          Key:{
              "id": String(id)
          }
      };
      docClient.get(params, function (err,data){
        if(err) {
            console.log('Unable to read s.Error JSON: ', JSON.stringify(err, null, 2));

        }else{
            console.log('GetItem succeeded: ', JSON.stringify(data, null, 2));
            res.json(data);
        }
      });
  })

  router.post('/student', (req, res) => { //Thêm sinh viên
      const {id, student_id, student_name, student_birthday,student_avata} = req.body;
      var params = {
          TableName: "Students",
          Item: {
            "id": String(id),
            "student_id": String(student_id),
            "student_name": String(student_name),
            "student_birthday": String(student_birthday),
            "student_avata": String(student_avata)
        },
      };
      docClient.put(params, function (err,data){
        if(err) {
            console.log('Unable to read st.Error JSON: ', JSON.stringify(err, null, 2));
        }else{
            console.log('Added item succeeded: ', JSON.stringify(data, null, 2));
            res.send("Thêm thành công");
        }
      });
  })

  router.put('/student', (req, res) => {
      const{id,student_id,student_name,student_birthday,student_avata} = req.body();
      var params = {
          TableName: "Students",
          Item:{
              "id": String(id),
              "student_id": String(student_id),
              "student_name": String(student_name),
              "student_birthday": String(student_birthday),
              "student_avata": String(student_avata)
          },
      };
      console.log("Add a new item...");
      docClient.put(params, function (err,data){
        if(err) {
            console.log('Unable to read stu.Error JSON: ', JSON.stringify(err, null, 2));

        }else{
            console.log('Added item succeeded: ', JSON.stringify(data, null, 2));
            res.send("Thêm thành công");
        }
      });
  })

  router.delete('/student/:id', (req, res) => {
      let id = req.params.id;
      var params = {
          TableName: "Students",
          Key:{
              id: String(id)
          }
      };
      docClient.delete(params, function (err,data){
        if(err) {
            console.log('Unable to read stud.Error JSON: ', JSON.stringify(err, null, 2));

        }else{
            console.log('Deleted item succeeded: ', JSON.stringify(data, null, 2));
            res.send("Xóa thành công");
        }
      });
  })
  module.exports = router;