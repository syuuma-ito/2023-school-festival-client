import "./globals.css";

import Config from "@/config/Config";
import { Frizon, Makinas, SacredGeometry, notojp, susiki } from "src/styles/fonts";

export const metadata = {
    title: "インベーダー",
    description: "2-1クラス企画",
    viewport: "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no",
};

const css = {
    "--bg": Config.bgColor,
    "--main-color": Config.mainColor,
    "--main-color-rgba": Config.mainColorRgba,
};

export default function RootLayout({ children }) {
    return (
        <html lang="ja" style={css}>
            <body className={`${Makinas.variable} ${notojp.variable} ${susiki.variable} ${SacredGeometry.variable} ${Frizon.variable}`}>{children}</body>
        </html>
    );
}
