import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {BROKER_OPTIONS} from "@/utils/constants";
import {z} from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Star, CheckCircle, Shield, Info, ExternalLink} from "lucide-react";
import Link from "next/link";

type Step1Props = {
  data: any;
  setData: (data: any) => void;
  errors: z.ZodIssue[];
};

const Step0 = ({data, setData, errors}: Step1Props) => {
  const getErrorMessage = (field: string) => {
    const error = errors.find((e) => e.path[0] === field);
    return error ? error.message : "";
  };

  const handleBrokerSelection = (broker: (typeof BROKER_OPTIONS)[0]) => {
    setData({...data, preferred_broker: broker.value});
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Select your preferred broker</h2>
      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2`}>
        {BROKER_OPTIONS.map((broker) => (
          <BrokerCard
            onClick={() => handleBrokerSelection(broker)}
            key={broker.value}
            broker={broker}
            isSelected={data.preferred_broker === broker.value}
          />
        ))}
      </div>
      {getErrorMessage("preferred_broker") && (
        <p className="mt-2 text-sm text-red-500">{getErrorMessage("preferred_broker")}</p>
      )}
    </>
  );
};

export default Step0;

type BrokerProps = {
  broker: {
    name: string;
    logo: string;
    countries: string;
    rating: number;
    reviews: number;
    benefits: string[];
    trustFactors: string[];
    url: string;
    guideLink: string;
  };
} & {onClick: () => void; isSelected: boolean};

function BrokerCard({broker, onClick, isSelected}: BrokerProps) {
  const {name, logo, countries, rating, reviews, benefits, trustFactors, url, guideLink} = broker;
  return (
    <Card className={`rounded-none shadow-none ${isSelected ? "border-2 border-primary" : ""}`}>
      <CardHeader className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Image
              src={logo}
              alt={`${name} logo`}
              width={100}
              height={40}
              className="invert dark:invert-0"
            />
            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          </div>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors duration-200 ease-in-out hover:bg-secondary/80"
          >
            Visit Website
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="flex items-center space-x-1">
          {Array.from({length: 5}).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-current stroke-current text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {rating} ({reviews.toLocaleString()} reviews)
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(60vh-16rem)]">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Available in:</h3>
              <p className="text-sm text-gray-600">{countries}</p>
            </div>
            <div>
              <h3 className="font-semibold">Benefits:</h3>
              <ul className="mt-2 space-y-2">
                {benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                  >
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Why you can trust {name}:</h3>
              <ul className="mt-2 space-y-2">
                {trustFactors.map((factor, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                  >
                    <Shield className="mr-2 h-5 w-5 text-blue-500" />
                    <span className="text-sm">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex-wrap gap-2">
        <Button
          variant="secondary"
          className="flex-1"
        >
          <Link
            href={guideLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Info className="mr-2 h-4 w-4" />
            Broker Setup Guide
          </Link>
        </Button>
        <Button
          className="flex-1"
          onClick={onClick}
        >
          Sign Up with {name}
        </Button>
      </CardFooter>
    </Card>
  );
}
