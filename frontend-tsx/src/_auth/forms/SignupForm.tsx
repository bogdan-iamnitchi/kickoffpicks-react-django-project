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
import { SignupValidation } from "@/lib/validation";
import { Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, AuthState} from "@/_state";
import { useState } from "react";

const imagePath = import.meta.env.VITE_APP_STATIC_PATH + "/assets/images/logo.svg";

const SignupForm = () => {

  const isLoading = false;

  const [accountCreated, setAccountCreated] = useState(false);
  const { toast } = useToast()

  //------------------------------------------------------------------------------

  const dispatch = useDispatch();
  const { signup, load_user } = bindActionCreators(actionCreators, dispatch);

  const state = useSelector((state: AuthState) => state.authState);
  const { isAuthenticated, errors } = state;

  //------------------------------------------------------------------------------

  const continueWithGoogle = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${import.meta.env.VITE_APP_API_URL}/google`)

        window.location.replace(res.data.authorization_url);
    } catch (err) {
        
    }
  };

  const continueWithGitHub= async () => {
      try {
          const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/auth/o/github/?redirect_uri=${import.meta.env.VITE_APP_API_URL}/github`)

          window.location.replace(res.data.authorization_url);
      } catch (err) {

      }
  };

  //------------------------------------------------------------------------------

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
  });

  const onSubmit = (values: z.infer<typeof SignupValidation>) => {
    try {
      
      signup(values.firstName, values.lastName, values.email, values.password, values.confirmPassword);
  
      for (let type in errors) {
        for (let message of errors[type]) {
          toast({
            title: "SignUp Failed!",
            variant: "destructive",
            description: message,
          });
          console.log(message);
        }
      }
  
      if (errors.length == 0) {
        load_user();
        setAccountCreated(true);
      }
    } catch (err) {
      toast({
        title: "SignIn Failed!",
        variant: "destructive",
        description: "Something Wrong, try again", // Assuming the error object has a message property
      });
      console.error(err);
    }
  }

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }
  if(accountCreated) {
      return <Navigate to='/sign-in' />;
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src={imagePath} alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full mt-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">First Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Last Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
              "Sign Up"
            )}
          </Button>

          <Button type="button" className="shad-button_red" onClick={continueWithGoogle}>
            Continue With Google
          </Button>

          <Button type="button" className="shad-button_green" onClick={continueWithGitHub}>
            Continue With GitHub
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account? 
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default SignupForm