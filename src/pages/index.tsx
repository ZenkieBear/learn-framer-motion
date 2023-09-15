import Layout from "@/components/Layout/Layout";
import { motion } from "framer-motion";
import Link from "next/link";
import routes from "./routes";

const Home = () => {
  const start = routes[1];
  
  return (
    <Layout isHome={true}>
      <h1>Sections</h1>
      <Link href={start.default ?? start.path}>Getting Start</Link>
    </Layout>
  )
}

export default Home