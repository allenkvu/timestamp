var express = require('express')
var path = require('path');
var app = express()

var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  var fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/:query', function(req, res) {
           var data = req.params.query;
           var unix = 'null';
           var date = 'null';
           if(isNumeric(data)){ //if true then its in unix form
               unix = data;
               date= unixToDate(data);
           }
           else{
               unix = 00000000;
               date = 'January, 01, 1991';
           }
           
           function unixToDate(data){
                var u = new Date(data*1000);
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var year = u.getFullYear();
                var month = months[u.getMonth()];
                var date = u.getDate();
                
                // Will display date in month dd, yyyy format
                var formattedDate = month + ' ' + date + ', ' + year;
                
                return formattedDate;
           }
           
           function dateToUnix(data){
               
           }
           var dateObj = { "unix": unix, "natural": date };
           res.send(dateObj);
    });
 function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }


app.listen(port, function () {
  console.log('Example app listening on port'  + port + '!')
})
