"use client";
import styles from "./button.module.css";

export default function Button(props) {
    const callback = props.onClick;
    const isDisabled = props.disabled;

    const handleClick = async () => {
        callback();
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
