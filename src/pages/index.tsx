import Layout from "@/components/Layout/Layout";
import { motion } from "framer-motion";
import Link from "next/link";
import routes from "../lib/routes";
import { H1 } from "@/components/Headings/Headings";

const Home = () => {
  const start = routes[1];
  
  return (
    <Layout isHome={true}>
      <H1>Sections</H1>
      <Link href={start.default ?? start.path}>Getting Start</Link>
    </Layout>
  )
}

export default Home