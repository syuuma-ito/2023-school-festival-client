"use client";

import styles from "./init.module.css";

export default function Init(props) {
    const handleClick = () => {
        props.onClick();
    };

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                ↑<br />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-smartphone"
                >
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
            </div>
            <div className={styles.text}>
                スマホの上部を画面中央に向け
                <br />
                OKを押してください
            </div>
            <button onClick={handleClick} className={styles.button}>
                OK
            </button>
        </div>
    );
}
