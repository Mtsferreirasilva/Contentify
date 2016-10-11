var React = require('react');

var ContentifyHead = require('./ContentifyHead.jsx');

module.exports = React.createClass({
  componentWillMount: function() {
    this.data = JSON.parse(this.props.data);
  },
  hasImage: function() {
    if (this.data.lead_image_url.length == 0) return;
    return React.createElement(
      'img',
      {
        src: this.data.lead_image_url,
        alt: 'Lead image'
      }
    );
  },
  hasTitle: function() {
    if (this.data.title.length == 0) return;
    return React.createElement('h1', null, this.data.title);
  },
  hasPublisedDate: function() {
    if (this.data.date_published.length == 0) return;
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date(this.data.date_published);
    var year = date.getFullYear();
    var month = monthNames[date.getMonth()];
    var day = date.getUTCDate();
    var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    var formatedString = month + ' ' + day + ', ' + year + ' ' + time;
    return React.createElement('h3', null, formatedString);
  },
  hasAuthor: function() {
    if (this.data.author.length == 0) return;
    return React.createElement('span', null, this.data.author);
  },
  hasContent: function() {
    if (this.data.content.length == 0) return;
    return React.createElement('div', null, this.data.content);
  },
  render: function() {
    return (
      <html>
        <ContentifyHead title={this.props.title}/>
        <body>
          {this.hasImage()}
          {this.hasTitle()}
          {this.hasPublisedDate()}
          <span>Author: {this.hasAuthor()}</span>
          <article className='article-container' dangerouslySetInnerHTML={{ __html: this.data.content }} ></article>

          <script dangerouslySetInnerHTML={{
              __html: 'window.PROPS=' + JSON.stringify(this.props)
            }} />
          <script src='javascripts/contentify-reader.js'/>
        </body>
      </html>
    );
  }
});
