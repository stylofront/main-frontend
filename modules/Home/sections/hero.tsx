import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-background flex min-h-screen flex-col items-center p-24">
      <Image
        src="/logo2.png"
        alt="Logo"
        width={100}
        height={100}
        className="mb-8"
      />
      <h1 className="text-4xl font-bold text-foreground mb-4 font-heading">
        Welcome to StyloFront
      </h1>
      <p className="text-foreground text-lg mb-8 font-body">Developer toolkit for StyloFront</p>
    </section>
  );
}
