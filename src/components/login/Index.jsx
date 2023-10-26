import React from "react";
import instance from "../../axios.config";
import { useRef, useState } from "react";
import TakeNumber from "./components/TakeNumber";
import TakeCode from "./components/TakeCode";
import { useStyles } from "./Style";
import { Box, Typography } from "@mui/material";
import {
  isTablet,
  osName,
  osVersion,
  isMobile,
  isSmartTV,
  isConsole,
  getUA,
} from "react-device-detect";
import { v4 as uuidv4 } from "uuid";

const Login = ({ isLogin, setIsLogin }) => {
  const classes = useStyles();

  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ keyId: "", identity: "" });
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const onSubmitTakeNumber = async (mobile) => {
    console.log("HERE:", mobile);
    setInfo((prevStete) => ({ ...prevStete, identity: mobile }));

    // const number = numberRef.current?.value;
    // console.log(number);
    if (!mobile || mobile.trim() === "") {
      console.log("تلفن همراه را وارد نمایید");
      return;
    } else if (
      isNaN(parseInt(mobile)) ||
      mobile.length !== 11 ||
      !mobile.startsWith("09")
    ) {
      console.log("لطفا شماره همراه صحیح وارد کنید");
      return;
    }

    let deviceUID = localStorage.getItem("VC:UID");
    if (!deviceUID) {
      deviceUID = uuidv4();
      localStorage.setItem("VC:UID", deviceUID);
    }

    try {
      const resHandshake = await instance.post(
        "/api/v1/oauth2/otp/handshake",
        {},
        {
          params: {
            deviceUID: deviceUID,
            deviceName: getUA,
            deviceOs: osName,
            deviceOsVersion: osVersion,
            deviceType: isMobile
              ? "MOBILE_PHONE"
              : isTablet
              ? "TABLET"
              : isSmartTV
              ? "TV_DEVICE"
              : isConsole
              ? "CONSOLE"
              : "DESKTOP",
          },
        }
      );

      const keyId = resHandshake.data.result.keyId;
      console.log("Handshake done!");

      const resAuth = await instance.post(
        "/api/v1/oauth2/otp/authorize",
        {},
        {
          params: {
            identity: mobile,
          },
          headers: {
            keyId: keyId,
          },
        }
      );
      console.log("Authorize done!");

      setStep(2);
      setInfo({ keyId: keyId, identity: mobile });
    } catch (err) {
      console.log(err);
    }
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
      console.log("Verify done!");
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
