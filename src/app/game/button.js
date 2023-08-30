"use client";
import { useState } from "react";
import sleep from "src/utils/sleep";
import styles from "./button.module.css";

export default function Button(props) {
    const [isDisabled, setDisabled] = useState(false);
    const callback = props.onClick;

    const handleClick = async () => {
        if (isDisabled) {
            return;
        }
        setDisabled(true);
        callback();
        await sleep(200);
        setDisabled(false);
    };

    return (
        <div className={styles.container}>
            <button className={isDisabled ? styles.button_disabled : styles.button} onClick={handleClick} onTouchStart={handleClick} disabled={isDisabled}>
                <div className={isDisabled ? styles.circle_disabled : styles.circle}>
                    <div className={isDisabled ? styles.text_disabled : styles.text}>SHOOT</div>
                </div>
            </button>
        </div>
    );
}
