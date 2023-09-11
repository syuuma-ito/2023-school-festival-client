"use client";

import Config from "@/config/Config";
import { QRCode } from "react-qrcode-logo";

export default function QR(props) {
    return (
        <QRCode
            value={props.URL}
            ecLevel={"L"}
            size={props.size || "256"}
            quietZone={"50"}
            qrStyle={"dots"}
            bgColor={Config.bgColor}
            fgColor={"#0FF"}
            eyeRadius={[
                10, // top/left eye
                10, // top/right eye
                10, // bottom/left eye
            ]}
        />
    );
}
