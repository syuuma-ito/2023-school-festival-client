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
            score: "999999",
            rank: "2",
        },
        {
            name: "ダミーデータ",
            score: "99999",
            rank: "3",
        },
        {
            name: "ダミーデータ",
            score: "9999",
            rank: "4",
        },
        {
            name: "ダミーデータ",
            score: "999",
            rank: "5",
        },
        {
            name: "ダミーデータ",
            score: "99",
            rank: "6",
        },
        {
            name: "ダミーデータ",
            score: "9",
            rank: "7",
        },
        {
            name: "ダミーデータ",
            score: "8",
            rank: "8",
        },
        {
            name: "ダミーデータ",
            score: "7",
            rank: "9",
        },
        {
            name: "ダミーデータ",
            score: "6",
            rank: "10",
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
