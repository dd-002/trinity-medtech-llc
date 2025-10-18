"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import WordsPullUpMotion from "../animations/WordsPullUp";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";

export default function BrandSection() {
  const categories = [
    {
      title: "Cosmed",
      description:
        "COSMED, since 1980, designs innovative solutions for Lung function, Metabolic, and Body Composition Assessment.",
      image: "/products/brands/cosmed/cycleergometers.webp",
      linkText: "BROWSE COSMED",
      href: "/products/cosmed/categories",
    },
    {
      title: "h/p/cosmos",
      description:
        "h/p/cosmos stands for convincing technology, advanced design and safety in the production of running machines",
      image: "/products/brands/hpcosmos/treadmill.png",
      linkText: "BROWSE h/p/cosmos",
      href: "/products/hpcosmos/categories",
    },
    {
      title: "Contemplas",
      description:
        "Professional video analysis systems for fast and precise visualisation through to high-end markerless motion analysis.",
      image: "/products/brands/contemplas/swimming.png",
      linkText: "BROWSE Contemplas",
      href: "/products/contemplas/categories",
    },
    {
      title: "Ergoline",
      description:
        "State-of-the-art microelectronics, precise measuring and control technology, and constructive solutions ",
      image: "/products/brands/ergoline/treadmill.png",
      linkText: "BROWSE Ergoline",
      href: "/products/ergoline/categories",
    },
    {
      title: "Zebris",
      description:
        "As an innovative technology company, zebris Medical GmbH looks back on more than 30 years of experience in biomechanics.",
      image: "/products/brands/zebris/zebris.png",
      linkText: "BROWSE Zebris",
      href: "/products/zebris/categories",
    },
    {
      title: "Kinvent",
      description:
        "Kinvent's expertise lies in creating innovative biomechanical solutions for performance, rehabilitation, and scientific research.",
      image: "/products/brands/kinvent/kinvent.png",
      linkText: "BROWSE Kinvent",
      href: "/products/kinvent/categories",
    },
    {
      title: "HumacNorm",
      description:
        "Humac Norm delivers advanced isokinetic dynamometer systems for precise evaluation and rehabilitation of human performance.",
      image: "/products/brands/humacnorm/humacnorm.png",
      linkText: "BROWSE HumacNorm",
      href: "/products/humacnorm/categories",
    },
    {
      title: "Ametris (ActiGraph)",
      description:
        "Ametris offers cutting-edge wearable technology through ActiGraph, enabling precise measurement and analysis of human activity and sleep patterns.",
      image: "/products/brands/ametris/actigraph.png",
      linkText: "BROWSE Ametris",
      href: "/products/ametris/categories",
    },
    {
      title: "CTN",
      description:
        "CTN provides advanced medical and research instrumentation solutions, specializing in precise data collection .",
      image: "/products/brands/ctn/ctn.png",
      linkText: "BROWSE CTN",
      href: "/products/ctn/categories",
    },
    {
      title: "Cellit",
      description:
        "Cellit delivers innovative IHHT  systems for cellular-level health optimization .",
      image: "/products/brands/cellit/cellit.png",
      linkText: "BROWSE Cellit",
      href: "/products/cellit/categories",
    },
    {
      title: "Neurosoft TMS",
      description:
        "Neurosoft is a global leader in Transcranial Magnetic Stimulation (TMS) technology,",
      image: "/products/brands/neurosoft/neurosoft.png",
      linkText: "BROWSE Neurosoft TMS",
      href: "/products/neurosoft/categories",
    },
    {
      title: "Movendo",
      description:
        "Movendo Technology combines robotics and AI to deliver intelligent rehabilitation solutions .",
      image: "/products/brands/movendo/movendo.png",
      linkText: "BROWSE Movendo",
      href: "/products/movendo/categories",
    },
  ];

  // Define the main animation variants for the card (container)
  // This will handle the parent's entrance and stagger its children
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        // Stagger the child animations (title and description) after the card is visible
        staggerChildren: 0.2, // Time between each child's animation start
        delayChildren: 0.1, // Delay before the first child starts
      },
    },
  };

  // Define the animation variants for the text elements (children)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="bg-[#1a1a1a] py-16 px-4 sm:px-6 lg:px-8 mt-2 rounded-xl">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 tracking-wide">
          Browse By
          <br />
          <WordsPullUpMotion
            text="BRANDS"
            color={"#6fe86f"}
            fontSize={"4.5rem"}
            delay={0.5}
          />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {categories.map((category) => {
            const ref = useRef(null);
            // useInView will trigger once when the ref element enters the viewport
            const inView = useInView(ref, { once: true, margin: "-100px 0px" });
            const controls = useAnimation();

            useEffect(() => {
              if (inView) {
                controls.start("visible");
              }
            }, [inView, controls]);

            return (
              <motion.div
                key={category.title}
                ref={ref}
                className="group relative overflow-hidden rounded-lg h-80"
                initial="hidden"
                animate={controls} // Animate based on the controls
                variants={containerVariants} // Use the parent variants
              >
                <Link href={category.href}>
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 text-white">
                    {/* Title/Pill */}
                    <motion.p
                      className="inline-block max-w-max bg-white/30 text-white text-sm font-semibold px-3 py-1 rounded-full mb-2 backdrop-blur-sm"
                      variants={itemVariants} // Use the child variants
                    >
                      {category.title}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      className="text-sm leading-relaxed mb-4"
                      variants={itemVariants} // Use the child variants
                    >
                      {category.description}
                    </motion.p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}