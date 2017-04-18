import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './app.css';

import List from './list';
const data = ['apple', 'orange', 'mango', 'banana', 'kiwi', 'blueberry'];

class HelloMessage extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Hello Webpack</h1>
        <List data={data}/>
      </div>
    );
  }
}


ReactDOM.render(<HelloMessage name="Webpack" />,  document.getElementById('root'));
