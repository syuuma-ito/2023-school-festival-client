"use client";

import Config from "@/config/Config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Ranking from "./ranking";

export default function RankingHome() {
    const [isLoading, setLoading] = useState(false);
    const [ranking, setRanking] = useState([]);
    const router = useRouter();

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
            <button className={styles.button} onClick={() => router.push("/ranking/old")}>
                昨日のランキングを見る
            </button>
            {isLoading ? <div className={styles.loading}>ロード中...</div> : <Ranking ranking={ranking} />}
        </div>
    );
}
