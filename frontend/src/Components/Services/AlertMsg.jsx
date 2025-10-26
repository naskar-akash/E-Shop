import React,{ useState } from "react";

export default function AlertMsg(t) {
  const [serverMsg, setServerMsg] = useState("");
  const [status, setStatus] = useState("");
  // Show alert message
  const showAlert = (response,successStatus = "success",errorStatus = "error") => {
    let msg = "";
    let stat = errorStatus;

    if (response?.data?.message) {
      msg = response.data.message;
      stat = response.status === 200 || response.status === 201 ? successStatus : errorStatus;
    }else if (response?.message) {
      msg = response.message;
      stat = errorStatus;
    }else if (typeof response === "string"){
      msg = response;
      stat = successStatus;
    }
    else {
      msg = "Something went wrong. Please try again.";
      stat = errorStatus;
    }

    setServerMsg(msg);
    setStatus(stat);
    setTimeout(() => setServerMsg(""), t*1000);
  };
  return {serverMsg, status, showAlert};
}