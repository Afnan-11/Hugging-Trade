import Footer from "./Footer";
import Navbar from "./Navbar";

export default function PageWrapper({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}
