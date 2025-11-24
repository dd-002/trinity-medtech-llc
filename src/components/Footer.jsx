import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0f2a0f] text-[#e8f5e8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top headline / CTA */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group"
              aria-label="Seed home"
            >
              {/* <Image src={"/logos/logow.svg"} width={20} height={20} alt="Logo" /> */}
              <span className="text-xl font-semibold tracking-wide">
                Trinity Medtech LLC
              </span>
            </Link>

            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Leading UAE in Rehabilitation Solutions.
            </h2>
            <p className="text-[#cfe9cf]">
              Science with Trinity—nerdy reads for the inbox.
            </p>

            <form
              className="w-full max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex gap-2 flex-col sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-1 rounded-md bg-[#133313] border border-[#2e5b2e] px-4 py-3 text-sm placeholder-[#99c299] focus:outline-none focus:ring-2 focus:ring-[#6ee76e]"
                  placeholder="Enter email address"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-[#6ee76e] px-4 py-3 text-[#0b1f0b] text-sm font-medium hover:bg-[#56d656] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6ee76e] focus:ring-offset-[#0f2a0f]"
                >
                  Sign up
                </button>
              </div>
              <p className="mt-3 text-xs text-[#a7c9a7]">
                By signing up, consent is granted to receive Trinity emails.
              </p>
            </form>
          </div>

          {/* FDA-style notice */}
          <div className="flex items-center justify-center rounded-lg border border-[#204a20] bg-[#102610] p-4 text-xs text-[#a7c9a7] sm:p-6">
            {/* <Image
              src="/logos/logoc.svg"
              width={100}
              height={100}
              alt="LOGO"
              className="flex-shrink-0"
            /> */}
            <span className="ml-4 text-3xl sm:text-5xl font-semibold leading-none">
              Trinity
            </span>
          </div>
        </div>

        {/* Link sections */}
        <div className="mt-16 grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <FooterGroup
            title="Trinity"
            links={[
              { label: "Shop All", href: "/products" },
              { label: "About Us", href: "/aboutus" },
            ]}
          />
          <FooterGroup
            title="Help"
            links={[
              { label: "Help", href: "/faq" },
              { label: "Contact", href: "/contactus" },
            ]}
          />
          <FooterGroup
            title="Social"
            links={[
              { label: "Instagram", href: "#" },
              { label: "Twitter", href: "#" },
              { label: "LinkedIn", href: "#" },
            ]}
          />
          <FooterGroup
            title="Legal"
            links={[
              { label: "Terms + Conditions", href: "/tnc" },
              { label: "Privacy Policy", href: "/privacy" },
            ]}
          />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#204a20] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-[#a7c9a7]">
            © {new Date().getFullYear()} Trinity Medtech LLC | All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a7f3a7]">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hover:text-white/90 transition">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
