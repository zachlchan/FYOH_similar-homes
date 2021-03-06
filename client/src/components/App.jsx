import React from 'react';
import axios from 'axios';
import Slider from './Slider.jsx';
import Header from './Header.jsx';
import styles from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    };
  }

  // componentDidMount() {
  //   axios({
  //     method: 'get',
  //     url: `${window.location.href}listing`,
  //   })
  //     .then((response) => {
  //       console.log('success', response.data);
  //       this.setState({
  //         listings: response.data,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }
  componentDidMount() {
    axios.get(`${window.location.pathname}similar-homes`)
      .then((res) => {
        console.log('success', res.data);
        this.setState({ listings: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className={styles.app}>
        <Header />
        <Slider listings={this.state.listings} />
      </div>
    );
  }
}

export default App;
