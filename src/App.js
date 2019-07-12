import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facebookToken: '104209816294440|xVZhfKIU2_TsCnsimmUoaM0YU68',
      pageName: 'reactiveboards',
      status: 'waiting',
      responseList: []
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
        status: 'getting posts from page'
      })
      //get page posts
      const url = `https://graph.facebook.com/v2.9/${pageName}/posts?access_token=${FBToken}`;

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
          const localResponseList = jsonResult.data;

          console.log('json result: ', localResponseList);
          this.setState({
            responseList: localResponseList,
            status: 'waiting'
          })
        },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log('error: ', error);
          }
        )
    }
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
          <label> Result: {this.renderList(this.state.responseList)}</label>
        </header>
      </div>
    );
  }
}

export default App;
