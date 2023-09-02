"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
    const playerName = "1P";
    const sessionId = "div";
    const endpoint = "game1";
    const router = useRouter();

    const url = `/game?player_name=${playerName}&session_id=${sessionId}&endpoint=${endpoint}`;

    const handleClick = async () => {
        // 遷移
        router.push(url);
    };

    return (
        <div className={`${styles.container} ${styles["container-" + playerName]}`}>
            <button className={styles.button} onClick={handleClick}>
                <span className={styles.buttonText}>START</span>
                <div className={styles.clip}>
                    <div id="leftTop" className={`${styles.corner} ${styles.leftTop}`}></div>
                    <div id="rightBottom" className={`${styles.corner} ${styles.leftTop}`}></div>
                    <div id="rightTop" className={`${styles.corner} ${styles.rightTop}`}></div>
                    <div id="leftBottom" className={`${styles.corner} ${styles.leftBottom}`}></div>
                </div>
                <span id="rightArrow" className={`${styles.rightArrow} ${styles.arrow}`}></span>
                <span id="leftArrow" className={`${styles.leftArrow} ${styles.arrow}`}></span>
            </button>
        </div>
    );
}
