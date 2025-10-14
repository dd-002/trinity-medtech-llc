import Image from "next/image";
import Link from "next/link";
import CTAButton from "../CTAButton";

export default function BentoShowcase() {
  return (
    <section className="mx-auto w-full px-2 lg:px-2 pt-10 md:pt-20 lg:pt-32 pb-10 bg-[#f7f8f4] mt-6 rounded-lg">
      {/* Heading */}
      <header className="mx-2 md:mx-16 lg:mx-32 mb-12">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-black tracking-tight">
          Explore our{" "}
          <span className="text-green-500 font-extrabold">LineUp</span>
        </h2>
      </header>

      {/* Grid */}
      <div
        className="mx-2 md:mx-16 lg:mx-32 mb-12 grid gap-2
                      grid-cols-1 md:grid-cols-8 auto-rows-[160px] md:auto-rows-[200px] lg:auto-rows-[220px]"
      >
        {/* Lead text card */}
        <article className="relative col-span-1 md:col-span-5 row-span-2 md:row-span-3 rounded-lg ring-1 ring-white/10 overflow-hidden p-5 lg:p-10">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/humacnorm.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay (optional, to darken or tint the video) */}
          <div className="absolute inset-0 bg-white/30 mix-blend-overlay" />

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white">
              <span className="text-green-500 font-extrabold">HUMAC</span>{" "}
              <span className="text-white font-bold">Norm</span>
            </h3>
            <p className="my-4 max-w-md text-sm md:text-base text-white font-bold">
              Humac Norm is an advanced isokinetic testing and rehabilitation
              system used to measure and improve muscle strength, endurance, and
              performance.
            </p>
            <CTAButton
              text="Know More"
              href="/products/humacnorm"
              textColor="white"
              color="transparent"
              hoverColor="black"
              borderColor="white"
              hoverBorderColor="white"
            />
          </div>
        </article>

        {/* Tall product image */}

        <figure className="relative col-span-1 md:col-span-3 row-span-3 rounded-lg overflow-hidden group">
          <Link href="/products/ametris">
            <Image
              src="/stock/stock9.jpg"
              alt="Skillrun treadmill"
              fill
              priority
              className="object-cover transition-transform duration-500 ease-out"
            />
            <figcaption className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
            <div className="absolute left-4 bottom-4 md:left-5 md:bottom-5">
              <span className="inline-flex items-center rounded-lg bg-green-500 text-black text-xs md:text-sm font-semibold px-2 py-1 text-white">
                Ametris
              </span>
              <h4 className="mt-1 text-white text-lg md:text-xl font-semibold">
                Algorithms and Measures
              </h4>
              <p className="text-white">
                Continuous tracking and objective data collection of cardinal
                symptoms in chronic diseases can help increase the specificity
                and accuracy of measuring changes in these symptoms over time
              </p>
            </div>
          </Link>
        </figure>
      </div>
    </section>
  );
}
