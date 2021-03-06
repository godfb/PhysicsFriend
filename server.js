var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var _ = require("underbar");


//var db = JSON.parse(data);

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/Client'));
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});

app.post('/solve', function(req, res) {
    
    var avoidCrash = false;
    var returnObj = {};
    if (req.body) {
        console.log(req.body);
        var vi = req.body.vi;
        var vf = req.body.vf;
        var d = req.body.d;
        var t = req.body.t;
        var a = req.body.a;
        returnObj.vi = req.body.vi;
        returnObj.vf = req.body.vf;
        returnObj.d = req.body.d;
        returnObj.t = req.body.t;
        returnObj.a = req.body.a;
        
        var somethingNew = true;
        
        var total = 0;
        
        while(somethingNew){
            
            //ita
            if (vi !== "" && a !== "" && t !== "" && vf === ""){
                returnObj.vf = parseFloat(vi)+parseFloat((a*t));
                vf = returnObj.vf;
            }
            //fta
            else if(a !== "" && t !== "" && vf !== "" && vi === ""){
                returnObj.vi = parseFloat(vf)-parseFloat((a*t));
                vi = returnObj.vi;
            }
            //ift
            else if(t !== "" && vf !== "" && vi !== "" && a === ""){
                if (t !== 0){
                    returnObj.a = parseFloat((vf-vi)/parseFloat(t));
                    a = returnObj.a;
                }
            }
            //ifa
            else if(vf !== "" && vi !== "" && a !== "" && t === ""){
                if (a !== 0){
                    returnObj.t = parseFloat((vf-vi)/parseFloat(a));
                    t = returnObj.t;
                }
            }
            
            //ita
            if (vi !== "" && t !== "" && a !== "" && d === ""){
                returnObj.d = parseFloat(vi*t) + parseFloat(.5 * a * t * t);
                d = returnObj.d;
            }
            //dta
            else if (t !== "" && a !== "" && d !== "" && vi === ""){
                if (t !== 0){
                    returnObj.vi = parseFloat(d/t) - parseFloat(a*t/2);
                    vi = returnObj.vi;
                }
            }
            //ida
            else if (a !== "" && d !== "" && vi !== "" && t === ""){
                if (a !== 0){
                    returnObj.t = Math.abs(parseFloat(Math.sqrt(parseFloat(2*a*d) - parseFloat(1)) + parseFloat(vi)) / a);
                    t = returnObj.t;
                }
                else if (a === 0){
                    returnObj.t = Math.abs(parseFloat(vi*d));
                    t = returnObj.t;
                }
            }
            //idt
            else if (d !== "" && t !== "" && vi !== "" && a === ""){
                returnObj.a = parseFloat(2*d) - (parseFloat(2*vi*t)) / parseFloat(t*t);
                a = returnObj.a;
            }
            
            //ift
            if (vi !== "" && vf !== "" && t !== "" && d === ""){
                returnObj.d = parseFloat(parseFloat(parseFloat(vi) + parseFloat(vf)) / 2) * parseFloat(t);
                d = returnObj.d;
            }
            //fdt
            else if (vf !== "" && t !== "" && d !== "" && vi === ""){
                returnObj.vi = parseFloat(parseFloat(parseFloat(2 * d) / parseFloat(t)) - parseFloat(vf));
                vi = returnObj.vi;
            }
            //idt
            else if (t !== "" && d !== "" && vi !== "" && vf === ""){
                returnObj.vf = parseFloat(parseFloat(parseFloat(2 * d) / parseFloat(t)) - parseFloat(vi));
                vf = returnObj.vf;
            }
            //ifd
            else if (d !== "" && vi !== "" && vf !== "" && t === ""){
                returnObj.t = parseFloat(parseFloat(2 * d) / parseFloat(parseFloat(vf) + parseFloat(vi)));
                t = returnObj.t;
            }
            
            //ida
            if (vi !== "" && a !== "" && d !== "" && vf === ""){
                returnObj.vf = Math.sqrt(parseFloat(parseFloat(vi * vi) + parseFloat(2*a*d)));
                vf = returnObj.vf;
            }
            //fda
            else if (a !== "" && d !== "" && vf !== "" && vi === ""){
                returnObj.vi = Math.abs(parseFloat(parseFloat(vf*vf) - parseFloat(2*a*d)));
                vi = returnObj.vi;
            }
            //ifd
            else if (d !== "" && vf !== "" && vi !== "" && a === ""){
                returnObj.a = parseFloat(parseFloat(vf*vf) - parseFloat(vi*vi)) / parseFloat(2*d); 
                a = returnObj.a;
            }
            //ifa
            else if (vf !== "" && vi !== "" && a !== "" && d === ""){
                returnObj.d = parseFloat(parseFloat(vf*vf) - parseFloat(vi*vi)) / parseFloat(2*a); 
                d = returnObj.d;
            }
            
            
        
        console.log(returnObj);
            var runningTotal = 0;
            for (var key in returnObj){
                if(returnObj[key] != "" || returnObj[key] === 0)
                    runningTotal++;
            }
            if (total === runningTotal){
                somethingNew = false;
            }
            total = runningTotal;
            if (returnObj.t === "0"){
                returnObj.a = "NaN";
                returnObj.d = 0;
                returnObj.t = 0;
                res.send(returnObj);
                somethingNew = false;
                avoidCrash = true;
            }
            
        }
        if (!avoidCrash){
            if (total === 5){
                res.send(returnObj);
            }
            else {
                res.send(false);
            }
        }
    }
    else {
        res.sendStatus(400);
    }
    res.end();
});
