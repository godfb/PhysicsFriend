var TheForm = React.createClass({
  propTypes: {
    onAcronymsSubmit: React.PropTypes.func.isRequired,
    handleClick: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="col s12 m8 l6">
        <form className="col s6">
            <input onChange={this.submit} placeholder="  Velocity Initial" type="number" ref="vi" className="row"/>
            <input onChange={this.submit} placeholder="  Velocity Final" type="number" ref="vf" className="row"/>
            <input onChange={this.submit} placeholder="  Displacement" type="number" ref="d" className="row"/>
            <input onChange={this.submit} placeholder="  Time" type="number" ref="t" className="row"/>
            <input onChange={this.submit} placeholder="  Acceleration" type="number" ref="a" className="row"/>
            <textArea className="RESULT" disabled ref="result"/>
        </form>
      </div>
    )
  },
    handleChange: function(event) {
        
        if(event.target.value === "") {
            this.props.submitClass = "disabled waves-effect waves-light btn animated fadeOut";
            this.setState({ shouldHide: true });
        }
        else {
            this.props.submitClass = "waves-effect waves-light btn animated fadeIn";
            this.setState({ shouldHide: false });
        }
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
        $.ajax({
            url: "/solve",
            type: 'POST',
            data: JSON.stringify(postObject),
            contentType: 'application/json',
            success: function (response) {
                console.log('query successful posted:', response);
                var resultString = "";
                for (var key in response){
                  resultString += key + " = " + response[key] + "\r";
                }
                React.findDOMNode(self.refs.result).value = resultString;
            },
            error: function (data) {
              //console.error('failed to post acronym :(');
            },
            complete: function (data) {
              //console.log('finished posting');
            }
        });
    }, 
});