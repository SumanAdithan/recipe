import React from 'react';
import styles from './Loader.module.scss';

const Loader = ({ name = 'loading' }) => {
    return (
        <div className={styles.loader}>
            <div className={styles.animation}></div>
            <div className={styles.title}>{name}</div>
        </div>
    );
};

export default Loader;
