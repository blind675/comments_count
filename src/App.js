import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facebookToken: '104209816294440|xVZhfKIU2_TsCnsimmUoaM0YU68',
      pageName: 'dominicprimar',
      status: 'waiting',
      postMessage: '',
      commentsList: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.pageName === '') {
      alert('Please provide a facebook page name!');
    } else {
      const pageName = this.state.pageName;
      const FBToken = this.state.facebookToken;

      this.setState({
        status: `getting post from page - ${pageName}`
      });
      this.fetchPostForPage(pageName, FBToken)
    }
  }

  fetchPostForPage(pageName, facebookToken) {
    //get the last post of the facebook page 
    const url = `https://graph.facebook.com/v2.9/${pageName}/posts?limit=1&access_token=${facebookToken}`;

    fetch(url)
      .then((res) => {
        console.log('result: ', res);
        if (res.ok === false && res.status === 404) {
          this.setState({ status: 'wrong facebook page name' })
        } else {
          return res.json()
        }
      })
      .then((jsonResult) => {
        if (jsonResult && jsonResult.data) {
          console.log(' json result: ', jsonResult);
          this.setState({
            postMessage: jsonResult.data[0].message,
            status: 'getting comments for the last post'
          })
          this.fetchCommentsForAPost(jsonResult.data[0].id, facebookToken);
        }
      })
  }

  fetchCommentsForAPost(postId, facebookToken) {
    const url = `https://graph.facebook.com/v2.9/${postId}?fields=comments{message,comment_count,comments}&access_token=${facebookToken}`;

    fetch(url)
      .then((res) => {
        console.log('result: ', res);
        if (res.ok === false && res.status === 404) {
          this.setState({ status: 'error getting comments' })
        } else {
          return res.json()
        }
      })
      .then((jsonResult) => {

        if (jsonResult && jsonResult.comments && jsonResult.comments.data) {
          const localResponseList = jsonResult.comments.data;
          console.log('json result: ', localResponseList);

          this.setState({
            commentsList: localResponseList,
            status: 'waiting'
          })
        }
      })
  }

  renderList(list) {
    const listItems = list.map((item) =>
      <li key={item.id}>{item.message}</li>
    );

    return (
      <ul> {listItems} </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form
            onSubmit={this.handleSubmit}
            style={{
              alignItems: 'flex-start'
            }}
          >
            <label >
              Facebook Token:
              <input
                type="text"
                name="facebookToken"
                style={{
                  width: 290,
                  height: 12,
                  marginLeft: '16px',
                }}
                value={this.state.facebookToken}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label
              style={{
                fontSize: 10,
                color: 'gray'
              }}
            >
              Don't change this unless you know what you are doing!
            </label>
            <br />
            <br />
            <label>
              Facebook Page Name (or ID):
              <input
                type="text"
                name="pageName"
                style={{
                  width: 200,
                  height: 16,
                  margin: '16px',
                }}
                value={this.state.pageName}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Import" style={{
              height: 16
            }}
            />
          </form>
          <label> Status: {this.state.status}</label>
          <br />
          <br />
          <label> Last Post: {this.state.postMessage}</label>
          <br />
          <label> Comments: {this.renderList(this.state.commentsList)}</label>
        </header>
      </div>
    );
  }
}

export default App;
