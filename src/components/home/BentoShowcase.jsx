import Image from "next/image";
import Link from "next/link";
import CTAButton from "../CTAButton";

export default function BentoShowcase() {
  return (
    <section className="mx-auto w-full px-5 md:px-10 lg:px-20 pt-10 md:pt-20 lg:pt-32 pb-10 bg-[#f7f8f4] mt-6 rounded-t-lg">
      {/* Heading */}
      <header className="mx-4 md:mx-16 lg:mx-32 mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black tracking-tight">
          Leading UAE in{" "}
          <span className="text-[#237618]">
            Sports Medicine & Rehabilitation
          </span>
        </h2>
        <p className="mt-4 max-w-3xl text-sm  text-black leading-relaxed">
          Since 2007 Trinity has been a solution provider for Sports Medicine
          and Rehabilitation for government offices and private companies.
          Trinity is working with the vision to become the leader in providing
          the best solution for Physical Therapy, Rehabilitation & Sports
          medicine by providing reliable, quality products and services to the
          UAE community. Trinity's growth has been remarkable, achieving high
          turnovers almost every year since it was founded. An ambitious
          investment plan is being implemented in order to sustain future growth
          at similar rates.
        </p>
      </header>

      {/* Grid */}
      <div
        className="mx-4 md:mx-16 lg:mx-32 mb-12 grid gap-2
                      grid-cols-1 md:grid-cols-6 auto-rows-[160px] md:auto-rows-[200px] lg:auto-rows-[220px]"
      >
        {/* Lead text card */}
        <article className="relative bg-[#c3edc3] col-span-1 md:col-span-3 row-span-2 md:row-span-2 lg:row-span-2 rounded-lg  ring-1 ring-white/10 overflow-hidden p-5 lg:p-10">
          {/* Content */}
          <div className="relative z-10">
            <Link href="/" className="flex items-center space-x-3">
              {/* <Image
                src="/logos/logoc.svg"
                alt="TechnoGym Logo"
                width={20}
                height={8}
                className="object-contain"
              /> */}
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black">
                <span className="text-green-700">Trinity</span> Medtech LLC
              </h3>
            </Link>

            <p className="my-4 text-black max-w-md text-sm md:text-base">
              Equipment crafted for durability, comfort, and performance with
              clean industrial lines.
            </p>
            <CTAButton
              text="Know More"
              href="/aboutus"
              color="transparent"
              hoverColor="#92e892"
              borderColor="transparent"
              hoverBorderColor="transparent"
              textColor="black"
            />
          </div>
        </article>

        {/* Tall product image */}
        <figure className="relative col-span-1 md:col-span-3 row-span-3 rounded-lg overflow-hidden group">
          <Image
            src="/stock/stock5.jpg"
            alt="Skillrun treadmill"
            fill
            priority
            className="object-cover transition-transform duration-500 ease-out "
          />
          <figcaption className="absolute inset-0  to-transparent  transition-opacity" />
          <div className="absolute left-4 bottom-4 md:left-5 md:bottom-5">
            <span className="inline-flex items-center rounded-lg bg-[#13470c] text-black text-xs md:text-sm font-semibold px-2 py-1 text-white">
              Contemplas
            </span>
            <h4 className="mt-1 text-white text-lg md:text-xl font-semibold">
              Sprint Analysis
            </h4>
          </div>
        </figure>

        {/* Square tile: athlete */}
        <figure className="relative col-span-1 md:col-span-3 row-span-2 rounded-lg overflow-hidden group">
          <Link href={"/products/contemplas"}>
            <Image
              src="/stock/stock4.jpg"
              alt="Athlete warmup"
              fill
              className="object-cover transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute left-4 bottom-4 md:left-5">
              <span className="inline-flex items-center rounded-lg border border-white/30 backdrop-blur px-2 py-1 text-xs text-white">
                Contemplas
              </span>
              <h4 className="mt-1 text-white text-lg font-semibold">
                Swimming Analysis
              </h4>
            </div>
          </Link>
        </figure>

        {/* Wide tile bottom */}
        <figure className="relative col-span-1 md:col-span-6 lg:col-span-3 row-span-2 md:row-span-1 rounded-lg overflow-hidden group">
          <Image
            src="/stock/stock2.jpg"
            alt="Excite line"
            fill
            className="object-cover transition-transform duration-500 ease-out "
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2">
            <h4 className="text-white text-lg md:text-2xl font-semibold">
              EXPLORE OUR PARTNER BRANDS
            </h4>
            <p className="mt-1 text-white/80 max-w-xl text-xs md:text-sm">
              Discover our carefully selected partner brands that stand at the
              forefront of sports medicine, rehabilitation, and fitness
              innovation.
            </p>
            <CTAButton text="Explore" href="/brands" hoverColor="black" borderColor="transparent" hoverBorderColor="transparent"/>
          </div>
        </figure>
      </div>
    </section>
  );
}
