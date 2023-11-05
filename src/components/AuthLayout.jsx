import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const authStatus = useSelector((state) => state.userAuthenticated);

  useEffect(() => {
    // authentication by default true
    if (authentication && authStatus !== authentication) {
      // true && false != true
      // user not authenticated in app
      navigate("/login");
    }
    // parrent user passed authentication as false
    else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading ... </h1> : <>{children}</>;
}
