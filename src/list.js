import React from 'react';
import styles from './list.css';

const ListComponent = ({ data }) => (
  <ul className={styles.container}>
    {
      data.map((item, index) => <li key={'list-'+index}>{item}</li>)
    }
  </ul>
);

export default ListComponent;