import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import useResendCode from "Hooks/Handshake/useResendCode";

const ResendCode = (props) => {
  const { onResend } = props;
  const resendHook = useResendCode();

  const sendCode = async () => {
    resendHook.mutate({
      callBack: () => onResend(),
    });
  };
  return (
    <>
      {resendHook.isLoading ? (
        <CircularProgress size={15} color={"inherit"} />
      ) : (
        <Button onClick={sendCode}>ارسال مجدد کد فعال سازی</Button>
      )}
    </>
  );
};

export default ResendCode;
