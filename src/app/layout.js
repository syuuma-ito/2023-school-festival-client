import "./globals.css";

import { Makinas, notojp, susiki, SacredGeometry, Frizon } from "src/styles/fonts";

export const metadata = {
    title: "インベーダー",
    description: "2-1クラス企画",
    viewport: "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ja">
            <body className={`${Makinas.variable} ${notojp.variable} ${susiki.variable} ${SacredGeometry.variable} ${Frizon.variable}`}>{children}</body>
        </html>
    );
}
