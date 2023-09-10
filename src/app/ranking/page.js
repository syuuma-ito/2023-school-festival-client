"use client";

import Config from "@/config/Config";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Ranking from "./ranking";

export default function RankingHome() {
    const [isLoading, setLoading] = useState(false);
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(Config.rankingURL + "/top10", { cache: "no-cache" })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setRanking(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.title}>ランキング</div>
            {isLoading ? <div className={styles.loading}>ロード中...</div> : <Ranking ranking={ranking} />}
        </div>
    );
}
