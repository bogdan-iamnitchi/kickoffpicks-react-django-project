import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { SigninValidation } from "@/lib/validation";
import { Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { authActionCreators, State} from "@/_state";
import { useEffect, useState } from "react";


const SigninForm = () => {

  const isLoading = false;

  const { toast } = useToast()
  const [checkedErrors, setCheckedErrors] = useState(false);

  //------------------------------------------------------------------------------

  const dispatch = useDispatch();
  const { signin } = bindActionCreators(authActionCreators, dispatch);

  const state = useSelector((state: State) => state.authState);
  const { isAuthenticated, errors } = state;

  //------------------------------------------------------------------------------

  const continueWithGoogle = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${import.meta.env.VITE_APP_API_URL}/google`)

        window.location.replace(res.data.authorization_url);

        
    } catch (err) {
        
    }
  };

  const continueWithGitHub = async () => {
      try {
          const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/auth/o/github/?redirect_uri=${import.meta.env.VITE_APP_API_URL}/github`)

          window.location.replace(res.data.authorization_url);
      } catch (err) {

      }
  };

  //------------------------------------------------------------------------------

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    // This useEffect will be triggered whenever 'errors' in the state changes
    if(checkedErrors){
      for (let type in errors) {
        toast({
          title: "SignIn Failed!",
          variant: "destructive",
          description: errors[type].toString(),
        });
        console.log(errors[type]);
      }

      setCheckedErrors(false);
    }

  }, [errors]);


  const onSubmit = (values: z.infer<typeof SigninValidation>) => {
    try {
      
      signin(values.email, values.password);

      setCheckedErrors(true);
  
    } catch (err) {
      toast({
        title: "SignIn Failed!",
        variant: "destructive",
        description: "Something Wrong, try again", // Assuming the error object has a message property
      });
      console.error(err);
    }
  }

  if (isAuthenticated == true) {
    return <Navigate to='/' />;
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
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
              "Log in"
            )}
          </Button>

          <Button type="button" className="shad-button_red" onClick={continueWithGoogle}>
            Continue With Google
          </Button>

          <Button type="button" className="shad-button_green" onClick={continueWithGitHub}>
            Continue With GitHub
          </Button>
        </form>

        <p className="text-small-regular text-light-2  text-sm text-center mt-3">
          Forgot your password?
          <Link
            to="/reset-password"
            className="text-primary-500 text-sm font-medium ml-1">
            Reset Password
          </Link>
        </p>

        <p className="text-small-regular text-light-2  text-sm text-center mt-1">
          Don&apos;t have an account?
          <Link
            to="/sign-up"
            className="text-primary-500  text-sm font-medium ml-1">
            Sign up
          </Link>
        </p>
          
      </div>
    </Form>
  );
};

export default SigninForm;