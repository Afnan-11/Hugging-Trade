"use client";

import React, { useState, useEffect } from "react";
import AccordionComponent from "./AccordionComponent";
import { client } from "@/sanity/lib/client";
import { FaqPricingTypes } from "@/types";

async function getFaqAffiliate() {
  const query = `
    *[_type == "faqAffiliate"] {
     _id,
     question,
     answer,
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 10;

export default function AccordionAffiliate() {
  const [faqs, setFaqs] = useState<FaqPricingTypes[]>([]);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    getFaqAffiliate()
      .then((data) => setFaqs(data))
      .catch((error) => console.error("Failed to fetch FAQ:", error));
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-10 lg:mb-40">
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
