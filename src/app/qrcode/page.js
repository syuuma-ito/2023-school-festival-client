"use client";

import { useSearchParams } from "next/navigation";
import QR from "src/components/qrcode";
import config from "src/config/Config";
import styles from "./page.module.css";

export default function Home() {
    const searchParams = useSearchParams();
    const sessionId = "dev";
    const playerName = searchParams.get("player_name");

    const qrCodeURL = `${config.serverURL}/entry?sessionId=${sessionId}&player_name=${playerName}&endpoint=game1`;

    return (
        <div className={`${styles.container} ${styles["container-" + playerName]}`}>
            <QR URL={qrCodeURL} />
        </div>
    );
}
