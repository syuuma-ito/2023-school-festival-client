import QR from "src/components/qrcode";
import config from "src/config/Config";
import styles from "./page.module.css";

export default function Home() {
    const playerName = "1P";
    const sessionId = "admin";

    const qrCodeURL = `${config.serverURL}/entry?sessionId=${sessionId}&player_name=${playerName}`;

    return (
        <div className={`${styles.container} ${styles["container-" + playerName]}`}>
            <QR URL={qrCodeURL} />
        </div>
    );
}
