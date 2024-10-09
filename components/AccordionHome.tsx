"use client";

import React, { useState, useEffect } from "react";
import AccordionComponent from "./AccordionComponent";
import { client } from "@/sanity/lib/client";
import { FaqHomeTypes } from "@/types";

async function getFaqHome() {
  const query = `
    *[_type == "faqHome"] {
     _id,
     question,
     answer,
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 10;

export default function AccordionHome() {
  const [faqs, setFaqs] = useState<FaqHomeTypes[]>([]);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    getFaqHome()
      .then((data) => setFaqs(data))
      .catch((error) => console.error("Failed to fetch FAQ:", error));
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-40">
      {faqs.map((faq, index) => (
        <AccordionComponent
          key={faq._id}
          title={faq.question}
          content={faq.answer}
          isOpen={activeIndex === index}
          onToggle={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
}
