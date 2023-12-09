import * as z from "zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { ResetConfirmValidation } from "@/lib/validation";
import { Navigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/_state";
import { useState } from "react";

const imagePath = import.meta.env.VITE_APP_STATIC_PATH + "/assets/images/logo.svg";

const ResetPasswordConfirm = () => {

  const isLoading = false;

  const params = useParams();
  let uid: string = '';
  let token: string = '';

  if(params.uid != null) {
    uid = params.uid;
  }

  if(params.token != null) {
    token = params.token;
  }

  const [requestSent, setRequestSent] = useState(false);

  //------------------------------------------------------------------------------

  const dispatch = useDispatch();
  const { reset_password_confirm } = bindActionCreators(actionCreators, dispatch);

  //------------------------------------------------------------------------------

  const form = useForm<z.infer<typeof ResetConfirmValidation>>({
    resolver: zodResolver(ResetConfirmValidation),
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
  });

  function onSubmit(values: z.infer<typeof ResetConfirmValidation>) {
    //console.log(values);

    reset_password_confirm(uid, token, values.password, values.confirmPassword);
    setRequestSent(true);
  }

  if (requestSent) {
    return <Navigate to='/' />
}

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src={imagePath} alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Reset Password Confirmation
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please provide the details.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full mt-4">

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">New Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
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
              "Reset Password"
            )}
          </Button>

        </form>
          
      </div>
    </Form>
  );
};

export default ResetPasswordConfirm;