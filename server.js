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
            
            if (vi && a && t && !vf){
                returnObj.vf = parseFloat(vi)+parseFloat((a*t));
            }
            else if(a && t && vf && !vi){
                returnObj.vi = parseFloat(vf)-parseFloat((a*t));
            }
            else if(t && vf && vi && !a){
                if (t !== 0){
                    returnObj.a = parseFloat((vf-vi)/parseFloat(t));
                }
            }
            else if(vf && vi && a && !t){
                if (a !== 0){
                    returnObj.t = parseFloat((vf-vi)/parseFloat(a));
                }
            }
            
            if (vi && t && a && !d){
                returnObj.d = parseFloat(vi*t) + parseFloat(.5 * a * t * t);
            }
            else if (t && a && d && !vi){
                if (t !== 0){
                    returnObj.vi = parseFloat(d/t) - parseFloat(a*t/2);
                }
            }
            else if (a && d && vi && !t){
                if (a !== 0){
                    returnObj.t = parseFloat(Math.sqrt(parseFloat(2*a*d) - parseFloat(1)) + parseFloat(vi)) / a;
                }
                else if (a === 0){
                    returnObj.t = Math.abs(parseFloat(vi*d));
                }
            }
            else if (d && t && vi && !a){
                returnObj.a = parseFloat(2*d) - (parseFloat(2*vi*t)) / parseFloat(t*t);
            }
            
            if (vi && vf && t && !d){
                returnObj.d = parseFloat(parseFloat(parseFloat(vi) + parseFloat(vf)) / 2) * parseFloat(t);
            }
            else if (vf && t && d && !vi){
                returnObj.vi = parseFloat(parseFloat(parseFloat(2 * d) / parseFloat(t)) - parseFloat(vf));
            }
            else if (t && d && vi && !vf){
                returnObj.vf = parseFloat(parseFloat(parseFloat(2 * d) / parseFloat(t)) - parseFloat(vi));
            }
            else if (d && vi && vf && !t){
                returnObj.t = parseFloat(parseFloat(2 * d) / parseFloat(parseFloat(vf) + parseFloat(vi)));
                console.log(returnObj.t);
            }
            
            if (vi && a && d && !vf){
                returnObj.vf = Math.sqrt(parseFloat(parseFloat(vi * vi) + parseFloat(2*a*d)));
            }
            else if (a && d && vf && !vi){
                returnObj.vi = Math.abs(parseFloat(parseFloat(vf*vf) - parseFloat(2*a*d)));
            }
            else if (d && vf && vi && !a){
                returnObj.a = parseFloat(parseFloat(vf*vf) - parseFloat(vi*vi)) / parseFloat(2*d); 
            }
            else if (vf && vi && a && !d){
                returnObj.d = parseFloat(parseFloat(vf*vf) - parseFloat(vi*vi)) / parseFloat(2*a); 
            }
            
            
        
        console.log(returnObj);
            var runningTotal = 0;
            for (var key in returnObj){
                if(!!returnObj[key] || returnObj[key] === 0)
                    runningTotal++;
            }
            if (total === runningTotal){
                console.log(runningTotal, total);
                somethingNew = false;
            }
            total = runningTotal;
            
        }
        
        if (total === 5){
            console.log(!!returnObj.t)
            res.send(returnObj);
        }
        else {
            res.send(false);
        }
    }
    else {
        res.sendStatus(400);
    }
    res.end();
});
