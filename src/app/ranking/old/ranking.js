import styles from "./page.module.css";

export default function Ranking(props) {
    const ranking = props.ranking;
    return (
        <>
            {ranking.map((item, index) => (
                <div className={`${styles.Ranking} ${styles["Ranking-" + (index + 1)]}`} key={index}>
                    <div className={styles.hexagon}>
                        <span className={styles.Ranking_num}>{index + 1}</span>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.Ranking_name}>{item.user_name}</div>
                        <div className={styles.Ranking_score}>{item.score} 点</div>
                    </div>
                </div>
            ))}
        </>
    );
}
