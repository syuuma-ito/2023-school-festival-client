import styles from "./page.module.css";

export default function Ranking() {
    const Ranking = [
        {
            name: "あっ・・・(察し)",
            score: "19194545",
            rank: "1",
        },
        {
            name: "おっ、そうだな",
            score: "07211919",
            rank: "2",
        },
        {
            name: "オナシャス",
            score: "45454545",
            rank: "3",
        },
        {
            name: "こ↑こ↓",
            score: "19191919",
            rank: "4",
        },
        {
            name: "みけねこ",
            score: "45454545",
            rank: "5",
        },
        {
            name: "非常食",
            score: "19191919",
            rank: "6",
        },
        {
            name: "イェア！",
            score: "45454545",
            rank: "7",
        },
        {
            name: "顎",
            score: "19191919",
            rank: "8",
        },
        {
            name: "まぐろみかん",
            score: "45454545",
            rank: "9",
        },
        {
            name: "やりますねぇ！",
            score: "19191919",
            rank: "10",
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.title}>ランキング</div>

            {/* map関数を使って、配列の要素を一つずつ取り出す */}
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
