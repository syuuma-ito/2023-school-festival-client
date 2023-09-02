/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import config from "src/config/Config";
import sleep from "src/utils/sleep";
import Button from "./button";
import InfoCard from "./infoCard";
import styles from "./page.module.css";
import ScoreBoard from "./scoreBoard";

export default function Game() {
    const searchParams = useSearchParams();
    const playerName = searchParams.get("player_name");
    const sessionId = searchParams.get("session_id");

    const [angles, setAngles] = useState({
        x: 0,
        y: 0,
        z: 0,
        name: undefined,
    });
    const [isDisabled, setDisabled] = useState(true);
    const [isConnect, setIsConnect] = useState(false);
    const [socket, setSocket] = useState(null);

    const userInfo = {
        sessionId: sessionId,
        name: "1P",
        isConnect: isConnect,
        X: angles.x,
        Y: angles.y,
        Z: angles.z,
    };

    useEffect(() => {
        // socket.ioの初期化
        const socket_ = io(config.ioServerURL);

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

        const handleOrientation = (e) => {
            const angles = {
                x: Math.floor(e.alpha * 10) / 10,
                y: Math.floor(e.beta * 10) / 10,
                z: Math.floor(e.gamma * 10) / 10,
                name: playerName,
                sessionId: sessionId,
            };
            socket_.volatile.emit("angles", angles);
            setAngles(angles);
        };
        window.addEventListener("deviceorientation", handleOrientation, true);

        setSocket(socket_);

        return () => {
            socket_.disconnect();
            window.removeEventListener("deviceorientation", handleOrientation, true);
        };
    }, []);

    const onClick = async () => {
        if (isDisabled) {
            return;
        }
        setDisabled(true);
        socket.emit("shoot", angles);
        await sleep(config.shotCoolTime);
        setDisabled(false);
    };

    return (
        <div className={`${styles.container} ${styles["container-" + playerName]}`}>
            <InfoCard info={userInfo} />
            <ScoreBoard score={angles["x"]} />
            <Button onClick={onClick} disabled={isDisabled}></Button>
        </div>
    );
}
