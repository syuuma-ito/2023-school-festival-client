"use client";
import Config from "@/config/Config";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function RankingPost() {
    const searchParams = useSearchParams();
    const user_hash = searchParams.get("user_hash");

    const [name, setName] = useState("");
    const [grade, setGrade] = useState(0);
    const [class_, setClass] = useState(0);
    const [number, setNumber] = useState(0);
    const [state, setState] = useState("");

    const onChangeName = (e) => {
        setName(e.target.value);
    };
    const onClickPost = () => {
        setState("送信中...");
        const sendData = {
            user_hash: user_hash,
            user_data: {
                user_name: name,
                info: {
                    grade: grade,
                    class: class_,
                    number: number,
                },
            },
        };
        fetch(Config.rankingURL + "/update_user_info", {
            method: "POST",
            body: JSON.stringify(sendData),
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.message === "Success") {
                    setState("送信しました。");
                    alert("送信しました。");
                } else {
                    setState("送信に失敗しました。");
                    alert("送信に失敗しました。");
                }
            });
    };
    const onChangeGrade = (e) => {
        setGrade(e.target.value);
    };
    const onChangeClass = (e) => {
        setClass(e.target.value);
    };
    const onChangeNumber = (e) => {
        setNumber(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>ニックネームを入力してください。</div>
            <input type="text" value={name} onChange={onChangeName} className={styles.input_text} required />
            <div className={styles.memo}>
                ※ここに入力した名前がランキングに表示されます。
                <br />
                ※本名を入力しないでください。
            </div>
            代表者の学年・クラス・番号を入力してください。
            <div className={styles.input_con}>
                <div className={styles.input_info_con}>
                    <div>
                        <input type="number" className={styles.input_text_info} maxLength="1" required onChange={onChangeGrade}></input>年
                    </div>
                    <div>
                        <input type="number" className={styles.input_text_info} maxLength="1" required onChange={onChangeClass}></input>組
                    </div>
                    <div>
                        <input type="number" className={styles.input_text_info} maxLength="1" required onChange={onChangeNumber}></input>番
                    </div>
                </div>
                <div className={styles.memo}>※この情報はランキングには表示されません。 賞品などの連絡のために使用します。</div>
            </div>
            <button onClick={onClickPost} className={styles.input_button}>
                送信
            </button>
            <div className={styles.state}>{state}</div>
            <Link href="/ranking" className={styles.link}>
                ←ランキングページへ戻る
            </Link>
        </div>
    );
}
