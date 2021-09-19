import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ navbar, footer, children }) {
  return (
    <>
      <Navbar navbar={navbar} />
      <main navbar={navbar}>{children}</main>
      <Footer footer={footer} />
    </>
  );
}
