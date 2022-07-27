import React from "react";
import "./EmailList.css";
import { Checkbox, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RedoIcon from "@mui/icons-material/Redo";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardHideIcon from "@mui/icons-material/KeyboardHide";
import SettingsIcon from "@mui/icons-material/Settings";
import InboxIcon from "@mui/icons-material/Inbox";
import Section from "./Section";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EmailRow from "./EmailRow";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";

const EmailList = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setEmails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  });

  // const [michaels, setMichaels] = useState([]);
  // const id = [];
  // const [count, setCount] = useState(0);

  // function updateEmails() {
  //   setMichaels(emails);
  // }

  // const docRef = collection(db, "emails");

  // async function getId() {
  //   const docSnap = await getDocs(docRef);
  //   docSnap.forEach((item) => id.push(item.id));
  //   for (let i = 0; i < id.length; ++i) {
  //     const messageRef = doc(db, "emails", id[i]);
  //     async function getMessage() {
  //       const messageSnap = await getDoc(messageRef);
  //       const messageData = messageSnap.data();
  //     }
  //     getMessage();
  //   }
  //   for (let i = 0; i < id.length; ++i) {
  //     const messageRef = doc(db, "emails", id[i]);
  //     async function getMessage() {
  //       const messageSnap = await getDoc(messageRef);
  //       const messageData = messageSnap.data();
  //       emails.push(messageData);
  //     }
  //     getMessage();
  //   }
  // }
  // getId();

  return (
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emailList__settingsRight">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="emailList__sections">
        <Section Icon={InboxIcon} title="Primary" color="red" selected={true} />
        <Section Icon={PeopleIcon} title="Social" color="#1a73e8" />
        <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
      </div>

      <div className="emailList__list">
        {emails.map(({ id, data: { to, subject, message, timestamp}}) => (
          <EmailRow
          title={to}
          subject={subject}
          key={id}
          description={message}
          time={new Date(timestamp?.seconds * 1000).toUTCString()} />
        ))}
      </div>
    </div>
  );
};

export default EmailList;
