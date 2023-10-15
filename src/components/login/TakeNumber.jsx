import React from "react";
import { useForm } from "react-hook-form";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Typography, TextField, Button } from "@mui/material";

const TakeNumber = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { onSubmitForm } = props;
  const { register } = useForm();

  return (
    <Box margin="10px" width="40%">
      <form
        noValidate
        autoComplete="off"
        // className={classes.Form}
        onSubmit={props.onSubmitForm}>
        <Box marginBottom="40px">
          <Typography variant="h6" component="h6" className="title">
            <b>لطفا شماره همراه خود را وارد کنید</b>
          </Typography>
          {/* {errorMessage && <Alert severity="error">{errorMessage}</Alert>} */}
        </Box>
        <Box mb={"12px"}>
          <Typography variant="body1" component="label">
            شماره همراه
          </Typography>
        </Box>
        <Box mb={3}>
          <TextField
            variant="outlined"
            placeholder="...09"
            fullWidth
            inputProps={{ style: { textAlign: "left" } }}
            // inputRef={numberRef}
            type="number"
            autoFocus={true}
            // error={!!errorMessage}
          />
        </Box>
        {/* <Box mb={4} textAlign="center">
          <Typography variant="body2" component="label">
            با ورود به برنامه تمامی
            <b> شرایط و قوانین استفاده و سیاست حفظ حریم </b>
            خصوصی کاربران برنامه را می پذیرم
          </Typography>
        </Box> */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={false}>
          درخواست کد فعال سازی
        </Button>
      </form>
    </Box>
  );
};

export default TakeNumber;
