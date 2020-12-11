import React, { Fragment } from "react";
import GoogleLogin from "react-google-login";

const GoogleConnect = () => {
  // Response containing one time auth code
  const responseGoogle = (e) => {
    console.log("Google Response::::", e);
  };
  return (
    <Fragment>
      <h1>Login with Google</h1>
      {/* Google Login Button */}
      <GoogleLogin
        clientId="1062228155409-ggkaciv0u6dc23l2235o3jfidnv65rg1.apps.googleusercontent.com"
        buttonText="Login"
        accessType="offline"
        responseType="code"
        approvalPrompt="force"
        prompt={("consent", "select_account")}
        scope={("https://www.googleapis.com/auth/adwords", "profile", "email")}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </Fragment>
  );
};

export default GoogleConnect;
