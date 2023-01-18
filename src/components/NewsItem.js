import React, { Component } from "react";

class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div>
        <div className="card">
          <img src={!imageUrl?'https://i.quotev.com/b2gtjqawaaaa.jpg':imageUrl} className="card-img-top" alt="News Fox"/>
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl}  rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">
              Read More
            </a>
            <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0', top: '0'}}>
            <span className="badge rounded-pill bg-danger">{source.name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
