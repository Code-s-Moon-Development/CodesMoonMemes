import Navbar from "../components/Navbar";
import Upload from "../components/upload/Upload";
import Feed from "../components/feed/Feed";
import About from "../components/about/About";

import "../index.css";

export default async function Page() {
    // Fetch data directly in a Server Component
    // Forward fetched data to your Client Component
    return (
    <>
        <Upload />
        <Feed />
    </>
    );
  }