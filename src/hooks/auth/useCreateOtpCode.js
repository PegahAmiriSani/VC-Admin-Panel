import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { ERequest } from "@interface/enum";
import { Fetch } from "frontend/utils/interceptor";

export default function useCreateOtpCode() {
  return useMutation(
    async (values) => {
      let url = `/auth/otp/handshake?device_uid=${values.device_uid}&amp;phone_number=${values.phone_number}`;
      if (values.username) {
        url += `&amp;username=${values.username}`;
      }
      const response = await Fetch({
        url,
        method: ERequest.POST,
      });
      return response?.data?.result;
    },
    {
      onSuccess: (result, values) => {
        values.onSuccess?.(result);
      },
      onError: (error) => {
        if (Object.hasOwn(error.response.data, "message")) {
          if (error.response.data.message[0] === "access_denied") {
            toast.error("شما دسترسی ندارید.");
          }
        }
      },
    }
  );
}
