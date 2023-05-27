import React from "react";
//html head
import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";

//you automatically get children when passed in in react
//Layout is wrapping _app.js components so accesses component children
const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* //html title */}
      <Head>
        <title>Beatz Headphones Store</title>
      </Head>
      {/* //header NAV */}
      <header>
        <Navbar />
      </header>
      {/* //MAIN SECTION */}
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
