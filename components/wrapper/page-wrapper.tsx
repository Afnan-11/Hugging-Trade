import Footer from "./Footer";
import Navbar from "./Navbar";

export default function PageWrapper({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[80vh] flex-col items-center justify-between pt-[4rem]">
        <div className="pointer-events-none absolute inset-0 z-[-99] flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {children}
      </main>
      <Footer />
    </>
  );
}
