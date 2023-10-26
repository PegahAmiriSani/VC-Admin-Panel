import React from "react";
import { useForm } from "react-hook-form";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { Box, Typography, TextField, Button } from "@mui/material";

const TakeNumber = ({ onSubmitForm }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((values) => {
    console.log(">>>>", values);

    // setError("mobile", { type: "", message: "alighooli9" });
    // return;

    onSubmitForm(values.mobile);
  });

  return (
    <Box margin="10px" width="30%">
      <form
        noValidate
        autoComplete="off"
        // className={classes.Form}
        onSubmit={onSubmit}>
        <Box marginBottom="40px">
          <Typography variant="h5" component="h6" className="title">
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
            sx={{
              "&:hover": {
                borderColor: colors.greenAccent[600],
              },
            }}
            variant="outlined"
            placeholder="...09"
            fullWidth
            error={Boolean(errors?.mobile)}
            inputProps={{ style: { textAlign: "left" } }}
            {...register("mobile")}
            autoFocus={true}
          />
          {errors?.mobile?.message}
        </Box>
        <Button
          sx={{
            background: colors.greenAccent[600],
          }}
          variant="contained"
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
