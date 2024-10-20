import React, {useEffect} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {z} from "zod";
import {BROKER_OPTIONS} from "@/utils/constants";
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setData((prev: any) => ({...prev, [name]: value}));
  };

  const getErrorMessage = (field: string) => {
    const error = errors.find((e) => e.path[0] === field);
    return error ? error.message : "";
  };

  useEffect(() => {
    const platform = BROKER_OPTIONS.find((broker) => broker.value === data.preferred_broker)?.platform;
    if (platform) {
      setData((prev: any) => ({...prev, platform: platform}));
    } else {
      setData((prev: any) => ({...prev, platform: "MT5"}));
    }
  }, [data.preferred_broker]);

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Enter your details</h2>
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
      </div>
    </>
  );
};

export default Step1;
