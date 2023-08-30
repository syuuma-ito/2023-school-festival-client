"use client";
import styles from "./infoCard.module.css";

export default function InfoCard(props) {
    const userInfo = props.info;
    return (
        <div className={styles.container}>
            <div className={styles.text_area}>
                <div className={`${styles.text_item} ${userInfo.isConnect ? "" : styles.text_red}`}>connect : {userInfo.isConnect ? "Yes" : "No"}</div>
                <div className={styles.text_item}>session_id : {userInfo.sessionId}</div>
                <div className={styles.text_item}>playerName : {userInfo.name}</div>
            </div>
            <div className={styles.text_area}>
                <div className={styles.text_item}>X : {userInfo.X}</div>
                <div className={styles.text_item}>Y : {userInfo.Y}</div>
                <div className={styles.text_item}>Z : {userInfo.Z}</div>
            </div>
        </div>
    );
}
