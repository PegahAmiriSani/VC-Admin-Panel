import React from "react";
// import Component2 from "./Component2";
import Component1 from "./TakeNumber";
import instance from "../../axios.config";
import { useState } from "react";
import TakeNumber from "./TakeNumber";
import TakeCode from "./TakeCode";
const Login = () => {
  const [step, setStep] = useState(1);
  const [state, setState] = useState({ keyId: "", mobile: "" });

  const onSubmitFormComponent1 = async (mobile) => {
    // e.preventDefault();
    console.log(step, "step===============");
    setStep(2);

    try {
      const resHandshake = await instance.post(
        "/api/v1/oauth2/otp/handshake",
        {},
        {
          params: {
            deviceUID: "uid",
            deviceName: "name",
            deviceOs: "os",
            deviceOsVersion: "0",
            deviceType: "MOBILE_PHONE",
          },
        }
      );
      console.log(">>>>", resHandshake.data);

      //   const resAuth = await instance.post("", {}, { params: {} });
      //   console.log(">>>>", resAuth.data);
      console.log("4444444");

      setStep(2);
    } catch {
      // ..
    }

    setState({ keyId, mobile });
    setStep(2);
  };

  const onSubmitFormComponent2 = async (otpCode) => {
    try {
      const resVerify = await instance.post(
        "/api/v1/oauth2/otp/verify",
        {},
        {
          params: {
            keyId: "deviceUID ",
            identity: "name",
            otp: otpCode,
          },
        }
      );
      console.log(resHandshake);
      // ... redirect to panel
    } catch {
      // ..
    }
  };

  return (
    <div>
      {step === 2 ? (
        <TakeCode onSubmitForm={onSubmitFormComponent2} />
      ) : (
        <TakeNumber onSubmitForm={onSubmitFormComponent1} />
      )}
    </div>
  );
};

export default Login;
