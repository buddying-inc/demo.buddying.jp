var React = require('react');
var ReactDOM = require('react-dom');
var ReactColor = require('react-color').PhotoshopPicker;

var Simulator = React.createClass({
  getInitialState: function () {
    var color = {
      left: "565656",
      center: "E46D65",
      right: "73CAF2",
    };
    return color;
  },

  updateColor: function (key, value) {
    switch (key) {
      case 'left':
        this.setState({ left: value });
        break;
      case 'center':
        this.setState({ center: value });
        break;
      case 'right':
        this.setState({ right: value });
        break;
      default:
        break;
    }
  },

  render: function () {
    return (
      <div className="container">
        <h1>３色シミュレーター</h1>
        <ReactColor />
        <InputColor color={this.state} onChange={this.updateColor} />
        <CardBack color={this.state} />
        <CardFront color={this.state} />
      </div>
    );
  }
});

var CardBack = React.createClass({
  render: function () {
    return (
      <div className="card-back">
        <String color={this.props.color} />
        <div className="color" style={{ background: '#' + this.props.color.left }} />
        <div className="color" style={{ background: '#' + this.props.color.center }} />
        <div className="color" style={{ background: '#' + this.props.color.right }} />
        <img src={'dest/img/matsumoto-back-x2.png'} alt="businesscard" />
      </div>
    )
  }
});

var String = React.createClass({
  render: function () {
    return (
      <div className="string">
        <span>#{this.props.color.left}</span>
        <span>#{this.props.color.center}</span>
        <span>#{this.props.color.right}</span>
      </div>
    );
  }
})

var InputColor = React.createClass({
  _onChange: function (e) {
    var key = e.target.dataset.key || e.target.getAttribute('data-key');
    var value = e.target.value;
    this.props.onChange(key, value);
  },

  render: function () {
    return (
      <div className="input-area">
        <label>左:#<input type="text" data-key="left" maxLength="6" value={this.props.color.left} onChange={this._onChange} /></label>
        <label>中:#<input type="text" data-key="center" maxLength="6" value={this.props.color.center} onChange={this._onChange} /></label>
        <label>右:#<input type="text" data-key="right" maxLength="6" value={this.props.color.right} onChange={this._onChange} /></label>
      </div>
    );
  }
});

var CardFront = React.createClass({
  getInitialState: function() {
    var name = {
      sei: "姓",
      mei: "名",
      sei_ruby: "Sei",
      mei_ruby: "Mei",
      position: "プログラマ"
    }
    return name;
  },

  onChange: function(key, value) {
    var name = this.state;
    name[key] = value;
    this.setState(name);
  },

  render: function() {
    return (
      <div className="card-front">
        <img />
        <Top color={this.props.color}/>
        <CardName name={this.state}/>
        <NameInput name={this.state} onChange={this.onChange} />
      </div>
    )
  }
});

var Top = React.createClass({
  render: function() {
    return (
      <div className="top">
        <div className="color" style={{ background: '#' + this.props.color.right }} />
        <div className="color" style={{ background: '#' + this.props.color.center }} />
        <div className="color" style={{ background: '#' + this.props.color.left }} />
        <div className="normal" />
      </div>
    );
  }
});

var CardName = React.createClass({
  render: function() {
    return (
      <div className="name-area">
        <div className="position">{this.props.name.position}</div>
        <div className="name"><span>{this.props.name.sei}</span><span>{this.props.name.mei}</span></div>
        <div className="ruby"><span>{this.props.name.sei_ruby}</span><span>{this.props.name.mei_ruby}</span></div>
        <div className="email">{this.props.name.sei_ruby.toLowerCase()}@buddying.jp</div>
      </div>
    );
  }
});

var NameInput = React.createClass({
  _onChange: function(e) {
    var key = e.target.name;
    var value = e.target.value;
    this.props.onChange(key, value);
  },

  render: function() {
    return (
      <div className="name-input-area">
        <dl>
          <dt>役職</dt>
          <dd><input type="text" name="position" value={this.props.name.position} onChange={this._onChange}/></dd>
        </dl>
        <dl>
          <dt>姓/名</dt>
          <dd><input type="text" name="sei" value={this.props.name.sei} onChange={this._onChange} /><input type="text" name="mei" value={this.props.name.mei} onChange={this._onChange} /></dd>
        </dl>
        <dl>
          <dt>Sei/Mei</dt>
          <dd><input type="text" name="sei_ruby" value={this.props.name.sei_ruby} onChange={this._onChange} /><input type="text" name="mei_ruby" value={this.props.name.mei_ruby} onChange={this._onChange} /></dd>
        </dl>
      </div>
    );
  }
})

ReactDOM.render(
  <Simulator />,
  document.getElementById('root')
);
