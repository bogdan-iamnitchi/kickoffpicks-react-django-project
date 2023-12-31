import * as z from "zod";
import { set, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { ChatSignInValidation } from "@/lib/validation";
import { Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, AuthState} from "@/_state";
import { useEffect, useState } from "react";

import { Chat } from ".";


const ChatAuth = () => {

  const isLoading = false;

  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState('');

  const { toast } = useToast()
  const [checkedErrors, setCheckedErrors] = useState(false);

  //------------------------------------------------------------------------------

  const dispatch = useDispatch();
  const { chat_engine_signin, load_user } = bindActionCreators(actionCreators, dispatch);

  const state = useSelector((state: AuthState) => state.authState);
  const { isChatEngineAuthenticated, errors, user } = state;


  //------------------------------------------------------------------------------

  useEffect(() => {

    load_user();

  }, []);

  const form = useForm<z.infer<typeof ChatSignInValidation>>({
    resolver: zodResolver(ChatSignInValidation),
    defaultValues: {
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

  const onSubmit = (values: z.infer<typeof ChatSignInValidation>) => {
    try {
      
      chat_engine_signin(user.email, values.password);

      setEmail(user.email);
      setSecret(values.password);

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

  if (isChatEngineAuthenticated == true) {
    return <Chat email={email} secret={secret}/>;
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Please re-enter your password
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          This is to ensure that you are the owner of this account
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full mt-4">

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_orange mt-2">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

        </form>

        <p className="text-small-regular text-light-2  text-sm text-center mt-3">
          Forgot your password?
          <Link
            to="/reset-password"
            className="text-orange-600 text-sm font-medium ml-1">
            Reset Password
          </Link>
        </p>

        <p className="text-small-regular text-light-2  text-sm text-center mt-1">
          Go back?
          <Link
            to='/'
            className="text-orange-600 text-sm font-medium ml-1">
            Home
          </Link>
        </p>
          
      </div>
    </Form>
  );
};

export default ChatAuth;