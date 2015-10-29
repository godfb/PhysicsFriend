var TheForm = React.createClass({
  render: function() {
    return (
      <div className="form col s12 m8 l6">
        <form className="col offset-m2 offset-l3">
          <div class="input-field">
            <label for="vi">Velocity Inital</label>
            <input onChange={this.submit} type="number" ref="vi" id="vi"/>
          </div>
            <label for="vf">Velocity Final</label>
            <input onChange={this.submit} type="number" ref="vf" id="vf"/>
            <label for="d">Displacement</label>
            <input onChange={this.submit} type="number" ref="d" id="d"/>
            <label for="t">Time</label>
            <input onChange={this.submit} type="number" ref="t" id="t"/>
            <label for="a">Acceleration</label>
            <input onChange={this.submit} type="number" ref="a" id="a"/>
            <textArea className="RESULT" disabled ref="result"/>
        </form>
      </div>
    )
  },
      submit: function(submission){
        var returnObj = {};
        var self = this;
        var postObject = {};
        postObject.vi = React.findDOMNode(this.refs.vi).value;
        postObject.vf = React.findDOMNode(this.refs.vf).value;
        postObject.d = React.findDOMNode(this.refs.d).value;
        postObject.t = React.findDOMNode(this.refs.t).value;
        postObject.a = React.findDOMNode(this.refs.a).value;
        
        // if (!!postObject.vi)  
        
        $.ajax({
            url: "/solve",
            type: 'POST',
            data: JSON.stringify(postObject),
            contentType: 'application/json',
            success: function (response) {
                console.log('query successful posted:', response);
                if(response !== false) {
                  
                  if (React.findDOMNode(self.refs.vi).value){
                    React.findDOMNode(self.refs.vi).disabled = false;
                  }
                  else{
                    React.findDOMNode(self.refs.vi).disabled = true;
                  }
                  if (React.findDOMNode(self.refs.vf).value){
                    React.findDOMNode(self.refs.vf).disabled = false;
                  }
                  else{
                    React.findDOMNode(self.refs.vf).disabled = true;
                  }
                  if (React.findDOMNode(self.refs.a).value){
                    React.findDOMNode(self.refs.a).disabled = false;
                  }
                  else{
                    React.findDOMNode(self.refs.a).disabled = true;
                  }
                  if (React.findDOMNode(self.refs.t).value){
                    React.findDOMNode(self.refs.t).disabled = false;
                  }
                  else{
                    React.findDOMNode(self.refs.t).disabled = true;
                  }
                  if (React.findDOMNode(self.refs.d).value){
                    React.findDOMNode(self.refs.d).disabled = false;
                  }
                  else{
                    React.findDOMNode(self.refs.d).disabled = true;
                  }
                  
                  var resultString = "";
                  for (var key in response){
                    resultString += key + " = " + response[key] + "\r";
                  }
                  React.findDOMNode(self.refs.result).value = resultString;
              }
              else {
                    React.findDOMNode(self.refs.d).disabled = false;
                    React.findDOMNode(self.refs.a).disabled = false;
                    React.findDOMNode(self.refs.t).disabled = false;
                    React.findDOMNode(self.refs.vf).disabled = false;
                    React.findDOMNode(self.refs.vi).disabled = false;
              }
            },
            error: function (data) {
              //console.error('failed to post acronym :(');
            },
            complete: function (data) {
              //console.log('finished posting');
            }
        });
    }
});