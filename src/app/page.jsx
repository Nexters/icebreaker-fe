import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="m-4">
        <h1 className="text-xl text-blue-500">Ice Breaker</h1>
      </div>
    </>
  );
}
