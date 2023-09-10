/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import QR from "src/components/qrcode";
import config from "src/config/Config";
import styles from "./page.module.css";

export default function Home() {
    const searchParams = useSearchParams();
    const sessionId_master = "dev";
    const playerName = searchParams.get("player_name");
    const endpoint = searchParams.get("endpoint");

    const [sessionId, setSessionId] = useState("");
    const [qrcodeURL, setQrcodeURL] = useState("");
    const [qrcodeUpdatedAt, setQrcodeUpdatedAt] = useState("");
    const [isConnect, setIsConnect] = useState(false);
    const [socket, setSocket] = useState(null);
    const [score, setScore] = useState(0);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // socket.ioの初期化
        const socket_ = io(config.ioServerURL, { autoConnect: false });

        socket_.on("connect", () => {
            console.log("socket connected");
            setIsConnect(true);
        });
        socket_.on("disconnect", () => {
            console.log("socket disconnected");
            setIsConnect(false);
        });
        socket_.on("connect_error", (err) => {
            console.log("サーバー接続エラー : ", err);
        });
        socket_.on("connect_timeout", (err) => {
            console.log("サーバー接続タイムアウト : ", err);
        });
        socket_.on("error", (err) => {
            console.log("サーバーエラー : ", err);
        });
        socket_.on("reconnect_error", (err) => {
            console.log("サーバー再接続エラー : ", err);
        });
        socket_.on("score_update", (data) => {
            console.log("score_update : ", data);
            setScore(data.score);
        });
        socket_.on("init", (data) => {
            console.log("init : ", data);
            setQrcodeURL(`${config.serverURL}/entry?sessionId=${data.sessionId}&player_name=${playerName}&endpoint=${endpoint}`);
            setQrcodeUpdatedAt(new Date().toLocaleTimeString());
            setScore(data.score);
            setSessionId(data.sessionId);
            setShowButton(true);
        });
        socket_.on("start", (data) => {
            console.log("start : ", data);
            setShowButton(false);
        });
        socket_.connect();

        setSocket(socket_);

        return () => {
            socket_.disconnect();
        };
    }, []);

    const onClickStart = () => {
        socket.emit("start", { sessionId: sessionId, playerName: playerName });
    };

    return (
        <div className={`${styles.container} ${styles["container-" + playerName]}`}>
            <QR URL={qrcodeURL} />
            <div className={styles.title}>QRコードを読み取ってください</div>
            <div className={styles.playerName}>あなたのプレイヤー名 : {playerName}</div>
            <div>QRコード更新時間 {qrcodeUpdatedAt}</div>
            <div>スコア : {score}</div>

            <div>サーバーへの接続 {isConnect ? "OK" : "NO"}</div>
            <div>サーバーURL : {config.ioServerURL}</div>
            <div>セッションID : {sessionId}</div>
            <div>endpoint {endpoint}</div>

            {showButton ? (
                <button onClick={onClickStart} className={styles.start_button}>
                    スタート！！！！！！
                </button>
            ) : (
                <></>
            )}
        </div>
    );
}
