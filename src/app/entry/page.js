/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import sleep from "@/utils/sleep";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
    const searchParams = useSearchParams();
    const playerName = searchParams.get("player_name");
    const sessionId = searchParams.get("sessionId");
    const router = useRouter();

    const url = `/game?player_name=${playerName}&session_id=${sessionId}`;

    useEffect(() => {
        sleep(1000);
        router.push(url);
    }, []);

    return (
        <div className={`${styles.container} ${styles["container-" + playerName]}`}>
            {/* <button className={styles.button} onClick={handleClick}>
                <span className={styles.buttonText}>START</span>
                <div className={styles.clip}>
                    <div id="leftTop" className={`${styles.corner} ${styles.leftTop}`}></div>
                    <div id="rightBottom" className={`${styles.corner} ${styles.leftTop}`}></div>
                    <div id="rightTop" className={`${styles.corner} ${styles.rightTop}`}></div>
                    <div id="leftBottom" className={`${styles.corner} ${styles.leftBottom}`}></div>
                </div>
                <span id="rightArrow" className={`${styles.rightArrow} ${styles.arrow}`}></span>
                <span id="leftArrow" className={`${styles.leftArrow} ${styles.arrow}`}></span>
            </button> */}
            <div className={styles.title}>{playerName}として参加してます....</div>
            <div className={styles.title2}>サーバーへ接続中....</div>
        </div>
    );
}
