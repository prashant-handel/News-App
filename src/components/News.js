import React, { Component } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      pageSize: 9,
      totalResults: 0,
    };
    document.title = `News Fox | ${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    }`;
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    console.log(this.props.apiKey);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    });
    this.props.setProgress(100);
  }

  render() {
    const fetchData = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`;
      this.setState({ page: this.state.page + 1 });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
      });
    };
    return (
      <div className="container my-3">
        <h1 className="text-center mb-3" style={{marginTop: '40px'}}>
          <strong>
            News Fox - Top{" "}
            {this.props.category.charAt(0).toUpperCase() +
              this.props.category.slice(1)}{" "}
            Headlines
          </strong>
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={fetchData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4 className="text-center">Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index) => {
                return (
                  <div key={index} className="col-md-4 mb-2">
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
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
