import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            インベーダー
            <br />
            この端末の役割を選択してください
            <Link href="/qrcode?player_name=1P" className={styles.link}>
                QRコード1P
            </Link>
            <Link href="/qrcode?player_name=2P" className={styles.link}>
                QRコード2P
            </Link>
            <Link href="/qrcode?player_name=3P" className={styles.link}>
                QRコード3P
            </Link>
            <Link href="/entry?player_name=1P&sessionId=dev&endpoint=game1" className={styles.link}>
                クライアント1P
            </Link>
            <Link href="/entry?player_name=2P&sessionId=dev&endpoint=game1" className={styles.link}>
                クライアント2P
            </Link>
            <Link href="/entry?player_name=3P&sessionId=dev&endpoint=game1" className={styles.link}>
                クライアント3P
            </Link>
            <Link href="/ranking" className={styles.link}>
                ランキング
            </Link>
        </div>
    );
}
