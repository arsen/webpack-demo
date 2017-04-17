import styles from './app.css';
import page1 from './page1.js';

const root = document.querySelector('#root');
root.innerHTML = `<p class='${styles.title}'>Hello webpack</p>`;