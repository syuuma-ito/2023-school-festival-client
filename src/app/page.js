import serverConfig from "src/config/Config";

export default function Home() {
    return <div>{serverConfig.serverURL}</div>;
}
