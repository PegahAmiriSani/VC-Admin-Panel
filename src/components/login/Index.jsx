import React from "react";
import instance from "../../axios.config";
import { useState } from "react";
import TakeNumber from "./TakeNumber";
import TakeCode from "./TakeCode";
import { Box, Typography } from "@mui/material";

const Login = ({ isLogin, setIsLogin }) => {
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ keyId: "", identity: "" });
  const [code, setCode] = useState(["", "", "", "", "", ""]);

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

      // console.log(">>>>", resHandshake.data.result.keyId);
      const keyId = resHandshake.data.result.keyId;
      console.log("keyId is " + keyId);

      const resAuth = await instance.post(
        "/api/v1/oauth2/otp/authorize",
        {},
        {
          params: {
            identity: "09352320775",
          },
          headers: {
            keyId: keyId,
          },
        }
      );
      console.log(">>>>", resAuth.data.result.identity);

      setStep(2);
      // setInfo({ ...info, keyId: keyId });
      setInfo({ keyId: keyId, identity: "09352320775" });
    } catch {
      //error handling
    }

    // setInfo({ keyId, identity });
    setStep(2);
  };

  const onSubmitTakeCode = async () => {
    try {
      const resVerify = await instance.post(
        "/api/v1/oauth2/otp/verify",
        {},
        {
          params: {
            identity: info.identity,
            otp: code.join(""),
          },
          headers: {
            keyId: info.keyId,
          },
        }
      );
      console.log("verify done");
      console.log(resVerify.data);
      // ... redirect to panel
      if (resVerify.data.status === 200) {
        setIsLogin(true);
      }
      //save token into local storage
    } catch (err) {
      console.log(err);
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
        <TakeCode
          onSubmitForm={onSubmitTakeCode}
          code={code}
          setCode={setCode}
        />
      ) : (
        <TakeNumber onSubmitForm={onSubmitTakeNumber} />
      )}
    </Box>
  );
};

export default Login;
