"use client";

import React, { useState, useEffect } from "react";
import AccordionComponent from "./AccordionComponent";
import { client } from "@/sanity/lib/client";
import { FaqAffiliateTypes } from "@/types";

async function getFaqAffiliate(): Promise<FaqAffiliateTypes[]> {
  const query = `
    *[_type == "faqAffiliate"] {
      _id,
      question,
      question_de,
      question_es,
      question_fr,
      question_it,
      question_pt,
      answer,
      answer_de,
      answer_es,
      answer_fr,
      answer_it,
      answer_pt,
    }
  `;
  const data: FaqAffiliateTypes[] = await client.fetch(query);
  return data;
}

export default function AccordionAffiliate({locale}: {locale: string}) {
  const [faqs, setFaqs] = useState<FaqAffiliateTypes[]>([]);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFaqAffiliate()
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch FAQ:", error);
        setError("Failed to load FAQs.");
        setLoading(false);
      });
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const getLocalizedText = (faq: FaqAffiliateTypes, field: "question" | "answer") => {
    const localizedField = `${field}_${locale}` as keyof FaqAffiliateTypes;
    return faq[localizedField] || faq[field];
  };

  if (loading) {
    return <p>Loading FAQs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (faqs.length === 0) {
    return <p>No FAQs available at the moment.</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-10 lg:mb-40">
      {faqs.map((faq, index) => (
        <AccordionComponent
          key={faq._id}
          title={getLocalizedText(faq, "question")}
          content={getLocalizedText(faq, "answer")}
          isOpen={activeIndex === index}
          onToggle={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
}
