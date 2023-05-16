import React from 'react';
import styles from '../styles';

const regex = /^[A-Za-z0-9]+$/;
const CustomInput = ({ label, placeHolder, value, handleValueChange }) => (
    <>
        <label htmlFor="name" className={styles.label}>{label}</label>
        <input
            className={styles.input}
            placeholder={placeHolder}
            type="text"
            value={value}
            onChange={(e) => {
                if (e.target.value === '' || regex.test(e.target.value)) handleValueChange(e.target.value);
            }}
        />
    </>
);

export default CustomInput;