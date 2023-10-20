import React from "react";
import instance from "../../axios.config";
import { useState } from "react";
import TakeNumber from "./TakeNumber";
import TakeCode from "./TakeCode";
import { Box } from "@mui/material";

//vorodi component ha hamishe obj e
const Login = ({ isLogin, setIsLogin }) => {
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ keyId: "", mobile: "" });

  const onSubmitTakeNumber = async (mobile) => {
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

      console.log(">>>>", resHandshake.data.result.keyId);
      const keyId = resHandshake.data.result.keyId;

      const resAuth = await instance.post(
        "/api/v1/oauth2/otp/authorize",
        {},
        {
          params: {
            keyId: keyId,
            identity: "09352320775",
          },
        }
      );
      console.log(">>>>", resAuth.data.result.identity);
      console.log("auth");

      setStep(2);
    } catch {
      //error handling
    }

    setInfo({ keyId, identity });
    setStep(2);
  };

  const onSubmitTakeCode = async (otpCode) => {
    try {
      const resVerify = await instance.post(
        "/api/v1/oauth2/otp/verify",
        {},
        {
          params: {
            keyId: info.keyId,
            identity: info.identity,
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%">
      {step === 2 ? (
        <TakeCode onSubmitForm={onSubmitTakeCode} />
      ) : (
        <TakeNumber onSubmitForm={onSubmitTakeNumber} />
      )}
    </Box>
  );
};

export default Login;
