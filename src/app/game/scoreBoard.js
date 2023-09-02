import styles from "./scoreBoard.module.css";

export default function ScoreBoard(props) {
    const score = props.score;
    // const score = 15460;
    return (
        <div className={styles.container}>
            <div className={styles.score}>
                <div className={styles.score_text}>SCORE</div>
                <div className={styles.score_value}>{score}</div>
            </div>
        </div>
    );
}
