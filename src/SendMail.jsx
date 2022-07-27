import React from "react";
import "./SendMail.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "./features/mailSlice";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore"
import firebase from "firebase/compat/app";

const SendMail = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    console.log(formData);
    addDoc(collection(db, "emails"), {
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(closeSendMessage())
  };
  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon
          onClick={() => dispatch(closeSendMessage())}
          className="sendMail__close"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="to"
          placeholder="To:"
          type="email"
          {...register("to", { required: true })}
        />
        {errors.to && <p className="sendMail__error">This field is required</p>}
        <input
          name="subject"
          placeholder="Subject:"
          type="text"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className="sendMail__error">This field is required</p>
        )}
        <input
          {...register("message", { required: true })}
          name="message"
          placeholder="Message..."
          type="text"
          className="sendMail__message"
        />
        {errors.message && (
          <p className="sendMail__error">This field is required</p>
        )}
        <div className="sendMail__options">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="sendMail__send"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMail;
