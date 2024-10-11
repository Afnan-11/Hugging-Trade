"use client";

import React, { useState, useEffect } from "react";
import AccordionComponent from "./AccordionComponent";
import { client } from "@/sanity/lib/client";
import { FaqHomeTypes } from "@/types";

async function getFaqHome(): Promise<FaqHomeTypes[]> {
  const query = `
    *[_type == "faqHome"] {
     _id,
     question,
     answer,
    }
  `;
  const data: FaqHomeTypes[] = await client.fetch(query);
  return data;
}

export default function AccordionHome() {
  const [faqs, setFaqs] = useState<FaqHomeTypes[]>([]);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFaqHome()
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch FAQ:", error);
        setError("Failed to load FAQ data.");
        setLoading(false);
      });
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return <p>Loading FAQs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (faqs.length === 0) {
    return <p>No FAQs available.</p>;
  }

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
