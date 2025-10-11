"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is Trinity's main area of expertise?",
    answer:
      "Trinity specializes in Sports Medicine, Physical Therapy, and Rehabilitation Solutions. Since 2007, we've partnered with leading global brands to bring advanced healthcare technologies and rehabilitation equipment to institutions and professionals across the UAE.",
  },
  {
    id: 2,
    question: "Who are Trinity's key clients?",
    answer:
      "We proudly serve both government offices and private healthcare providers—including hospitals, clinics, sports centers, and rehabilitation facilities. Our clients trust us for our quality products, reliable service, and long-term partnership approach.",
  },
  {
    id: 3,
    question:
      "How does Trinity ensure the quality of its products and services?",
    answer:
      "Quality is at the heart of everything we do. We work exclusively with certified international manufacturers and adhere to UAE's healthcare regulations. Our team also provides on-site installation, maintenance, and staff training to ensure optimal performance and reliability.",
  },
  {
    id: 4,
    question:
      "What makes Trinity different from other healthcare solution providers in the UAE?",
    answer:
      "Trinity stands out for its end-to-end support—from consultation and planning to delivery, training, and after-sales service. Our customer-first philosophy, combined with 15+ years of experience and global partnerships, makes us a trusted name in healthcare innovation.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-[#d4d0c8] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="font-bold text-green-700">Trinity</span> - Leading the Future of Sports Medicine & Rehabilitation in
            the UAE
          </h1>
          <p className="text-base sm:text-lg text-gray-800 leading-relaxed max-w-5xl">
            Trinity is a pioneering provider of advanced rehabilitation,
            physiotherapy, and sports medicine equipment—dedicated to enhancing
            health, performance, and recovery across clinical and athletic
            environments. Discover our range of rehabilitation solutions,
            physiotherapy systems, and performance monitoring technologies,
            designed to empower healthcare professionals and athletes alike. <br/>   
            At Trinity, bridge technology, care, and human performance—helping institutions
            and professionals deliver the next generation of sports medicine and
            rehabilitation excellence in the UAE and beyond.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          {/* FAQ Title */}
          <div className="lg:pt-2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              FAQs
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-0 border-t border-gray-900">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="border-b border-gray-900 transition-all duration-300"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between py-6 text-left group hover:bg-gray-900/5 transition-colors duration-200 px-0 sm:px-2"
                  aria-expanded={openId === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 pr-4 flex-1">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 ml-4 transition-transform duration-300 ease-in-out">
                    {openId === faq.id ? (
                      <Minus
                        className="w-6 h-6 text-gray-900"
                        strokeWidth={2}
                      />
                    ) : (
                      <Plus className="w-6 h-6 text-gray-900" strokeWidth={2} />
                    )}
                  </span>
                </button>

                {/* Answer */}
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === faq.id
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 px-0 sm:px-2">
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
