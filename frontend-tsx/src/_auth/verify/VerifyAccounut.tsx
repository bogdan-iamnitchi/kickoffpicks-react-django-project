import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { Navigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/_state";
import { useState } from "react";


const VerifyAccount = () => {

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

  const [verified, setVerified] = useState(false);

  //------------------------------------------------------------------------------

  const dispatch = useDispatch();
  const { verify } = bindActionCreators(actionCreators, dispatch);

  //------------------------------------------------------------------------------

  const verifyAccount = () => {
    //console.log(values);

    verify(uid, token);
    setVerified(true);
  }

  if (verified) {
    return <Navigate to='/' />;
  }

  return (
      <>
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Verify Account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Hello there! Please press the button to verify your account.
        </p>

        <Button type="submit" className="shad-button_primary mt-6 w-96" onClick={verifyAccount}>
          {isLoading ? (
            <div className=" flex-center gap-2">
              <Loader /> Loading...
            </div>
          ) : (
            "Verify Account"
          )}
        </Button>
      </>
  );
};

export default VerifyAccount;