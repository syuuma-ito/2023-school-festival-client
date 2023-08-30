import { Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";

const notojp = Noto_Sans_JP({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-notojp",
    display: "swap",
});

const Makinas = localFont({
    src: "./fonts/Makinas.woff2",
    variable: "--font-makinas",
});

const susiki = localFont({
    src: "./fonts/数式フォント.woff2",
    variable: "--font-susiki",
});

const SacredGeometry = localFont({
    src: "./fonts/Sacred Geometry.woff2",
    variable: "--font-SacredGeometry",
});
const Frizon = localFont({
    src: "./fonts/Frizon.woff2",
    variable: "--font-Frizon",
});

export { Makinas, notojp, susiki, SacredGeometry, Frizon };
