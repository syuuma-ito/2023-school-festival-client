"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Ranking from "./ranking";

export default function RankingHome() {
    const [isLoading, setLoading] = useState(false);

    const ranking = [
        { user_name: "あいぽん", score: 3000 },
        { user_name: "わち", score: 2800 },
        { user_name: "こやま", score: 2750 },
        { user_name: "在日ブラジル人", score: 2550 },
        { user_name: "小嶋ユウガ", score: 2550 },
        { user_name: "ゆとりん", score: 2550 },
        { user_name: "小林海斗", score: 2500 },
        { user_name: "ニャンニャンニャン", score: 2450 },
        { user_name: "シルバーかめめ", score: 2400 },
        { user_name: "西田の女", score: 2400 },
    ];
    return (
        <div className={styles.container}>
            <div className={styles.title}>昨日のランキング</div>
            {isLoading ? <div className={styles.loading}>ロード中...</div> : <Ranking ranking={ranking} />}
        </div>
    );
}
