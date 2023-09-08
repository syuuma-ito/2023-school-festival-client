import styles from "./page.module.css";

export default function Ranking() {
    const Ranking = [
        {
            name: "ユーザー名",
            score: "9999999",
            rank: "1",
        },
        {
            name: "ダミーデータ",
            score: "9999999",
            rank: "2",
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.title}>ランキング</div>
            {Ranking.map((item, index) => (
                <div className={`${styles.Ranking} ${styles["Ranking-" + item.rank]}`} key={index}>
                    <div className={styles.hexagon}>
                        <span className={styles.Ranking_num}>{index + 1}</span>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.Ranking_name}>{item.name}</div>
                        <div className={styles.Ranking_score}>{item.score} 点</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
