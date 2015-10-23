var Application = React.createClass({
  render: function() {
    return (
        <div className="application">
          <div id="form">
              <TheForm/>
          </div>
        </div>
    );
  },
});
React.render(
  <Application />,
  document.body
);