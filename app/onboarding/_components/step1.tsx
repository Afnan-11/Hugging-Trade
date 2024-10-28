import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {z} from "zod";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {InfoIcon} from "lucide-react";
import {BROKER_OPTIONS} from "@/utils/constants";
import Link from "next/link";

type Step1Props = {
  data: {
    login: string;
    password: string;
    server: string;
    platform: string;
    preferred_broker: string;
  };
  setData: (data: any) => void;
  errors: z.ZodIssue[];
};

const Step1 = ({data, setData, errors}: Step1Props) => {
  const [selectedBroker, setSelectedBroker] = useState<(typeof BROKER_OPTIONS)[0] | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setData((prev: any) => ({...prev, [name]: value}));
  };

  const getErrorMessage = (field: string) => {
    const error = errors.find((e) => e.path[0] === field);
    return error ? error.message : "";
  };

  console.log({selectedBroker});

  useEffect(() => {
    const broker = BROKER_OPTIONS.find((broker) => broker.value === data.preferred_broker);
    const platform = broker?.platform;
    setSelectedBroker(broker!);
    if (platform) {
      setData((prev: any) => ({...prev, platform: platform}));
    } else {
      setData((prev: any) => ({...prev, platform: "MT5"}));
    }
  }, [data.preferred_broker]);

  const getLeverageText = (brokerValue?: string) => {
    if (brokerValue === "ic_markets") return "I confirm my account leverage is set to 1:100";
    if (brokerValue === "oanda") return "I confirm my account leverage is set to 1:50";
    return "";
  };

  return (
    <>
      <div className="mb-8 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-700">Connect your IC Markets MT5 Account</h1>

        <Alert className="mt-4 border border-blue-200 bg-blue-50">
          <InfoIcon className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            Please enter your {selectedBroker?.name}
            <strong> LIVE </strong>
            trading account details below. Demo accounts are not supported.
          </AlertDescription>
        </Alert>

        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-700">
            You can find your {selectedBroker?.platform} login details:
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">
            <li>
              In your {selectedBroker?.name} client portal under {selectedBroker?.platform} accounts
            </li>
            <li>In the welcome email from {selectedBroker?.name}</li>
          </ul>
        </div>

        <div className="mt-4 flex items-center space-x-2 text-blue-600">
          <InfoIcon className="h-4 w-4" />
          <Link
            target="_blank"
            href={selectedBroker?.url || "#"}
            className="hover:underline"
          >
            {`Can't find your details? Contact ${selectedBroker?.name} Support`}
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="server">Server</Label>
          <Input
            name="server"
            value={data.server}
            onChange={handleInputChange}
          />
          {getErrorMessage("server") && <p className="text-sm text-red-500">{getErrorMessage("server")}</p>}
        </div>
        <div>
          <Input
            disabled
            name="platform"
            value={data.platform}
            onChange={handleInputChange}
          />
          {getErrorMessage("platform") && <p className="text-sm text-red-500">{getErrorMessage("platform")}</p>}
        </div>

        <div>
          <Label htmlFor="login">Login</Label>
          <Input
            name="login"
            value={data.login}
            onChange={handleInputChange}
            type="number"
          />
          {getErrorMessage("login") && <p className="text-sm text-red-500">{getErrorMessage("login")}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type="password"
            value={data.password}
            onChange={handleInputChange}
          />
          {getErrorMessage("password") && <p className="text-sm text-red-500">{getErrorMessage("password")}</p>}
        </div>
        {getLeverageText(data.preferred_broker) && (
          <div className="flex items-start space-x-2">
            <Checkbox
              id="leverageConfirmed"
              // checked={data.leverageConfirmed}
              // onCheckedChange={(checked) => {
              //   setData((prev: any) => ({
              //     ...prev,
              //     leverageConfirmed: checked,
              //   }));
              // }}
              required
              aria-required="true"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="leverageConfirmed"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {getLeverageText(data.preferred_broker)}
                <span className="ml-1 text-red-500">*</span>
              </Label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Step1;
