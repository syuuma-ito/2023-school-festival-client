/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { executeWithCooldown } from "@/utils/cooldown";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { io } from "socket.io-client";
import config from "src/config/Config";
import sleep from "src/utils/sleep";
import Button from "./button";
import InfoCard from "./infoCard";
import Init from "./init";
import styles from "./page.module.css";
import ScoreBoard from "./scoreBoard";

export default function Game() {
    const searchParams = useSearchParams();
    const playerName = searchParams.get("player_name");
    const sessionId = searchParams.get("session_id");

    const [angles, setAngles] = useState({});
    const [centerX, setCenterX] = useState(0);

    const [isDisabled, setDisabled] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // socket.ioの初期化
    const [isConnect, setIsConnect] = useState(false);
    const [socket, setSocket] = useState(null);

    const [score, setScore] = useState(0);

    useEffect(() => {
        // socket.ioの初期化
        const socket_ = io(config.ioServerURL, { autoConnect: false });

        socket_.on("connect", () => {
            console.log("socket connected");
            setIsConnect(true);
            setDisabled(false);
        });
        socket_.on("disconnect", () => {
            console.log("socket disconnected");
            setIsConnect(false);
            setDisabled(true);
        });
        socket_.on("connect_error", (err) => {
            console.log("サーバー接続エラー : ", err);
            alert("サーバー接続エラー : " + err);
        });
        socket_.on("connect_timeout", (err) => {
            console.log("サーバー接続タイムアウト : ", err);
            alert("サーバー接続タイムアウト : " + err);
        });
        socket_.on("error", (err) => {
            console.log("サーバーエラー : ", err);
            alert("サーバーエラー : " + err);
        });
        socket_.on("reconnect_error", (err) => {
            console.log("サーバー再接続エラー : ", err);
            alert("サーバー再接続エラー : " + err);
        });
        socket_.on("score_update", (data) => {
            console.log("score_update : ", data);
            setScore(data.score);
        });
        socket_.on("hit", (data) => {
            console.log("hit : ", data);
            if (data.playerName === playerName) {
                // バイブレーション
                if (navigator && navigator.vibrate) navigator.vibrate([100, 50, 100]);
            }
        });
        socket_.connect();

        setSocket(socket_);

        return () => {
            socket_.disconnect();
        };
    }, []);

    const addOrientationListener = () => {
        const handleOrientation = (e) => {
            const angles = {
                x: Math.floor(e.alpha * 10) / 10,
                y: Math.floor(e.beta * 10) / 10,
                z: Math.floor(e.gamma * 10) / 10,
            };
            setAngles(angles);
            if (socket == null) {
                return;
            }
            executeWithCooldown(() => {
                socket.volatile.emit("angles", {
                    x: Math.floor((angles.x - centerX) * 10) / 10,
                    y: angles.y,
                    z: angles.z,
                    sessionId: sessionId,
                    playerName: playerName,
                });
            }, config.anglesCoolTime);
        };
        window.addEventListener("deviceorientation", handleOrientation, true);
    };

    useEffect(() => {
        addOrientationListener();
    }, [centerX]);

    const requestPermissionAndListen = async () => {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === "granted") {
            addOrientationListener();
            setIsModalOpen(false);
        } else {
            alert("許可がない場合はゲームをプレイできません");
        }
    };

    useEffect(() => {
        if (typeof DeviceOrientationEvent.requestPermission === "function") {
            // safariの場合
            // ios13+
            setIsModalOpen(true);
        } else {
            addOrientationListener();
        }
        return () => {
            window.removeEventListener("deviceorientation", handleOrientation, true);
        };
    }, []);

    const onClick = async () => {
        if (isDisabled) {
            return;
        }
        setDisabled(true);
        socket.emit("shoot", {
            x: Math.floor((angles.x - centerX) * 10) / 10,
            y: angles.y,
            z: angles.z,
            sessionId: sessionId,
            playerName: playerName,
        });
        await sleep(config.shotCoolTime);
        setDisabled(false);
    };

    const headerInit = () => {
        setCenterX(angles.x);
    };

    const userInfo = {
        isConnect: isConnect,
        sessionId: sessionId,
        name: playerName,
        X: Math.floor((angles.x - centerX) * 10) / 10,
        Y: angles.y,
        Z: angles.z,
        rawX: angles.x,
        tan: Math.floor(Math.tan((angles.x - centerX) * (Math.PI / 180)) * 100) / 100,
    };

    return (
        <div className={`${styles.container} ${styles["container-" + playerName]}`}>
            <InfoCard info={userInfo} />
            <ScoreBoard score={score} />
            {centerX ? <Button onClick={onClick} disabled={isDisabled}></Button> : <Init onClick={headerInit}></Init>}
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="センサーパーミッションの許可" className={styles.modal} overlayClassName={styles.modal_overlay}>
                <h2>
                    このゲームはジャイロセンサーを使用します
                    <br />
                    許可をお願いします
                </h2>
                <button onClick={requestPermissionAndListen} className={styles.modal_button}>
                    許可する
                </button>
                <button onClick={() => setIsModalOpen(false)} className={styles.modal_button}>
                    キャンセル
                </button>
            </Modal>
        </div>
    );
}
