import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AlertBox() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert.options);

  const options = {
    onClose: (props) => dispatch({ type: "HIDDEN_ALERT" }),
    toastId: alert.msg,
  };

  useEffect(() => {
    if (alert.type != undefined && alert.msg != undefined) {
      if (alert.type == "success") return toast.success(alert.msg, options);
      if (alert.type == "error") return toast.error(alert.msg, options);
      if (alert.type == "warning") return toast.warning(alert.msg, options);
    }
  }, [alert]);

  return <ToastContainer />;
}

export default AlertBox;
