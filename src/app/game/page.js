/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

    // socket.ioの初期化
    const [isConnect, setIsConnect] = useState(false);
    const [socket, setSocket] = useState(null);

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
        socket_.connect();

        setSocket(socket_);

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
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
            socket.volatile.emit("angles", {
                x: Math.floor((angles.x - centerX) * 10) / 10,
                y: angles.y,
                z: angles.z,
                sessionId: sessionId,
                playerName: playerName,
            });
        };
        window.addEventListener("deviceorientation", handleOrientation, true);
        return () => {
            window.removeEventListener("deviceorientation", handleOrientation, true);
        };
    }, [centerX]);

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
            <ScoreBoard score={angles["x"]} />
            {centerX ? <Button onClick={onClick} disabled={isDisabled}></Button> : <Init onClick={headerInit}></Init>}
        </div>
    );
}
