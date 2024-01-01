import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { ResetPasswordValidation } from "@/lib/validation";
import { Navigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authActionCreators } from "@/_state";
import { useState } from "react";

const imagePath = import.meta.env.VITE_APP_STATIC_PATH + "/assets/images/logo.svg";

const ResetPassword = () => {

  const isLoading = false;
  const [requestSent, setRequestSent] = useState(false);

  //------------------------------------------------------------------------------

  const dispatch = useDispatch();
  const { reset_password } = bindActionCreators(authActionCreators, dispatch);

  //------------------------------------------------------------------------------

  const form = useForm<z.infer<typeof ResetPasswordValidation>>({
    resolver: zodResolver(ResetPasswordValidation),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof ResetPasswordValidation>) {
    console.log(values);

    reset_password(values.email);
    setRequestSent(true);
  }

  if (requestSent) {
    return <Navigate to='/' />;
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src={imagePath} alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Reset your account password
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter the details.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary mt-2">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Request a reset password"
            )}
          </Button>

        </form>
      </div>
    </Form>
  );
};

export default ResetPassword;