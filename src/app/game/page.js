/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Button from "./button";
import InfoCard from "./infoCard";
import styles from "./page.module.css";

export default function Game() {
    const playerName = "3P";

    const [angles, setAngles] = useState({
        x: 0,
        y: 0,
        z: 0,
        name: undefined,
    });
    const [isConnect, setIsConnect] = useState(false);
    const [socket, setSocket] = useState(null);

    const userInfo = {
        sessionId: "admin",
        name: "1P",
        isConnect: isConnect,
        X: angles.x,
        Y: angles.y,
        Z: angles.z,
    };
    // socket.ioの初期化

    useEffect(() => {
        const socket_ = io("https://sabatesuto.onrender.com/");

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
            alert("サーバー接続エラー : " + err);
        });

        const handleOrientation = (e) => {
            const angles = {
                x: Math.floor(e.alpha * 10) / 10,
                y: Math.floor(e.beta * 10) / 10,
                z: Math.floor(e.gamma * 10) / 10,
                name: playerName,
            };
            socket_.volatile.emit("angles", angles);
            setAngles(angles);
        };
        window.addEventListener("deviceorientation", handleOrientation, true);

        setSocket(socket_);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const onClick = () => {
        if (socket) {
            socket.emit("shoot", angles);
        }
    };

    return (
        <div className={`${styles.container} ${styles["container-" + playerName]}`}>
            <InfoCard info={userInfo} />
            <Button onClick={onClick}></Button>
        </div>
    );
}
