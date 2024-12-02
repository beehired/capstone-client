import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/checkbox.module.scss';
import store from 'store2';

type Checkbox = {
    name: string,
    checked: boolean | any
    onChange: any | any
}

export function CheckboxV1({ name, checked, onChange }: Checkbox) {
    return (
        <input className={styles.checkbox} type='checkbox' name={name} checked={checked} onChange={onChange} />
    )
}


type RememberMeProps = {
    name: string,
    username: string,
    password: string,
}


export function RememberMe({ name, username, password }: RememberMeProps) {
    // Set the initial state of rememberMe based on whether the account is stored
    const [rememberMe, setRememberMe] = useState(() => Boolean(store.get("UserLoginAccount")));

    useEffect(() => {
        if (rememberMe) {
            store.set("UserLoginAccount", { username, password });
        } else {
            store.remove("UserLoginAccount");
        }
    }, [rememberMe, username, password]);

    const onHandleRememberMe = () => {
        setRememberMe((prev) => !prev);
    };

    return (
        <input
            className={styles.checkbox}
            type="checkbox"
            checked={rememberMe}
            name={name}
            onChange={onHandleRememberMe}
        />
    )
}


type CheckboxV2Props = {
    name: string,
    onChange: any,
    onChangeArray?: any
    checked?: boolean,
    value?: any,
    onBlur?: any
}
export function CheckboxV2({ name, onChange, onBlur, value, checked }: CheckboxV2Props) {
    return (
        <input className={styles.checkbox} type="checkbox" name={name} aria-label={name} id={name} value={value} checked={checked} onChange={onChange} onBlur={onBlur} />
    )
}