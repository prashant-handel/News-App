import React, { Component } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from 'react-infinite-scroll-component';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      pageSize: 9,
      totalResults: 0
    };
    document.title = `News Fox | ${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    }`;
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=3973f794321f41e0afb5170266ceaede&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults });
  }

  render() {
    const fetchData = async ()=>{
      this.setState({page: this.state.page + 1})
    }
    return (
      <div className="container my-3">
        <h1 className="text-center mb-5">
          <strong>
            News Fox - Top{" "}
            {this.props.category.charAt(0).toUpperCase() +
              this.props.category.slice(1)}{" "}
            Headlines
          </strong>
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={fetchData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<h4 className="text-center">Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div key={element.url} className="col-md-4 mb-2">
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
