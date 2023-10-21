import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

const TakeCode = ({ code, setCode, onSubmitForm }) => {
  const [focus, setFocus] = useState(0);
  const [time, setTime] = useState(null);
  // const [code, setCode] = useState(["", "", "", "", "", ""]);

  const nextFocuse = (event, index) => {
    const value = event.target.value;
    if (!value || value.trim() === "") {
      return;
    }
    code[index] = code[index] === value[0] && value[1] ? value[1] : value[0];
    setCode([...code]);
    if (index + 1 >= 6) {
      return;
    }
    setFocus(index + 1);
  };

  const onSubmit = async (event) => {
    setFocus(-1);
    if (event) {
      event.preventDefault();
    }
  };

  const onEndCounter = () => {
    setTime(null);
  };

  const onFocus = (index) => {
    setFocus(index);
  };

  const handleKeyDown = (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 8) {
      if (code[focus] === "" && focus - 1 >= 0) {
        setFocus(focus - 1);
        code[focus - 1] = "";
        setCode([...code]);
        return;
      }
      code[focus] = "";
      setCode([...code]);
    }
  };

  return (
    <Box margin="10px" width="30%">
      <form
        noValidate
        autoComplete="off"
        //   className={classes.Form}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm();
          console.log("onsubmit");
        }}>
        <Box marginBottom="40px">
          <Typography variant="h6" component="h6" className="title">
            <b>کد به شماره </b>
            {/* <b style={{ margin: "0 3px" }}>{info.identity}</b> */}
            <b style={{ margin: "0 3px" }}>09352320775</b>

            <b> ارسال شد</b>
          </Typography>
        </Box>
        <Box mb={"12px"}>
          <Typography variant="body1" component="label">
            کد فعال سازی
          </Typography>
        </Box>
        <Box mb={3} display="flex" flexDirection="row-reverse">
          {code.map((c, index) => (
            <TextField
              key={index}
              variant="outlined"
              // className={classes.InputCode}
              onChange={(event) => nextFocuse(event, index)}
              inputRef={(input) => input && focus === index && input.focus()}
              value={c}
              onKeyDown={handleKeyDown}
              onFocus={() => onFocus(index)}
            />
          ))}
        </Box>
        <Box mb={4} textAlign="center">
          {time ? (
            <Typography variant="body2" component="label">
              ارسال کد فعال سازی
              <CountDown time={time} onEnd={onEndCounter} />
              ثانیه دیگر
            </Typography>
          ) : (
            <Box minHeight="25px">
              {/* <ResendCode onResend={() => setTime(120)} /> */}
            </Box>
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          // disabled={useVerifyHook.isLoading}
        >
          تایید
        </Button>
      </form>
    </Box>
  );
};

export default TakeCode;
