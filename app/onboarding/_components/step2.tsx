import React, {useEffect} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {z} from "zod";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";

type Step2Props = {
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

const Step2 = ({data, setData, errors}: Step2Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setData((prev: any) => ({...prev, [name]: value}));
  };

  const getErrorMessage = (field: string) => {
    const error = errors.find((e) => e.path[0] === field);
    return error ? error.message : "";
  };

  useEffect(() => {
    setData((prev: any) => ({...prev, platform: data.preferred_broker === "oanda" ? "MT4" : "MT5"}));
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
          <Label htmlFor="platform">
            Platform <span className="text-[10px] text-muted-foreground">Only MT5 platforms</span>
          </Label>
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

export default Step2;
