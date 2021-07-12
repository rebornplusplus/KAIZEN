import React, { useState } from "react";
import AppNavBar from "../navbar/navbar";
import "./registration.css";
import Axios from "axios";
import BASE_URL from "../Base_url";
import { faKickstarterK } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import CollateralPage from "./collateralPage";

function Registration() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Bkash, setBkash] = useState("");
  const [Nid, setNid] = useState("");
  const [AccountType, setAccountType] = useState("Lender");
  const [Dob, setDob] = useState(null);
  const [About, setAbout] = useState("");
  const [collateral, setCollateral] = useState("");
  const [willShowCollateralPage, setWillShowCollateralPage] = useState(false);
  const imgFileInput = React.createRef();
  const [imgSrc, setImgSrc] = useState("#");
  let pageHistory = useHistory();

  const sendData = async (e) => {
    console.log(
      FirstName +
        " " +
        LastName +
        " " +
        Bkash +
        " " +
        Nid +
        " " +
        AccountType +
        " " +
        Dob +
        " " +
        About +
        " " +
        collateral
    );

    e.preventDefault();

    await Axios({
      method: "POST",
      data: {
        fullname: FirstName + " " + LastName,
        bkash: Bkash,
        nid: Nid,
        usertype: AccountType,
        dob: Dob,
        about: About,
        collateral: collateral,
      },
      withCredentials: true,
      url: "http://localhost:5000/api/auth/registerdata",
    }).then((res) => {
      console.log("Registration POST response: ", res);
    });

    pageHistory.push("/");
  };

  const handleFileUpload = () => {
    let file = imgFileInput.current.files[0];
    let reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImgSrc(reader.result);
    };
  };

  if (willShowCollateralPage) {
    return (
      <CollateralPage
        collateral={collateral}
        setCollateral={setCollateral}
        onBack={() => setWillShowCollateralPage(false)}
        onSubmit={sendData}
      />
    );
  }

  return (
    <div className="Registration">
      <div class="main content-box">
        <div class="icon">
          <FontAwesomeIcon icon={faKickstarterK} size="6x"></FontAwesomeIcon>
        </div>
        <div class="registration">
          <div class="title-card">
            <h1>Personal Information</h1>
            <p>
              Tell us a bit about yourself. Some of this information except for
              the sensitive ones( NID , Bkash , DOB etc. ) will appear on your
              public profile, so that other users can get to know you better &
              in turn we can verify you.
            </p>
          </div>
          <div class="form">
            <div class="full-name inputs-div">
              <aside>
                <h3>Full Name</h3>
                <p>Example: Fazle Rafsani</p>
              </aside>
              <div class="input-field">
                <input
                  type="text"
                  class="name-input"
                  placeholder="First Name"
                  pattern="[A-Za-z]+"
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  class="name-input"
                  placeholder="Last Name"
                  pattern="[A-Za-z]+"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div class="small-input-field inputs-div">
              <aside>
                <h3>Bkash</h3>
              </aside>
              <div class="input-field">
                <input
                  type="tel"
                  class="small-input"
                  pattern="(?:\+88|01)?(?:\d{11}|\d{13})"
                  value={Bkash}
                  onChange={(e) => setBkash(e.target.value)}
                  required
                />
              </div>
            </div>
            <div class="small-input-field inputs-div">
              <aside>
                <h3>Date of Birth</h3>
              </aside>
              <div class="input-field">
                <input
                  type="date"
                  class="small-input"
                  value={Dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
            </div>
            <div class="small-input-field inputs-div">
              <aside>
                <h3>National ID</h3>
              </aside>
              <div class="input-field">
                <input
                  type="number"
                  class="small-input"
                  pattern="[0-9]{10}"
                  value={Nid}
                  onChange={(e) => setNid(e.target.value)}
                  required
                />
              </div>
            </div>
            <div class="text-area-input-field inputs-div">
              <aside>
                <h3>Who am I?</h3>
              </aside>
              <div class="input-field">
                <textarea
                  class="text-area-input"
                  cols="50"
                  rows="5"
                  // maxlength="140"
                  minlength="1"
                  value={About}
                  onChange={(e) => setAbout(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div class="small-input-field inputs-div">
              <aside>
                <h3>Profile Image</h3>
              </aside>
              <div class="input-field">
                <input
                  type="file"
                  class="small-input"
                  accept="image/*"
                  name="image"
                  id="file"
                  ref={imgFileInput}
                  onChange={handleFileUpload}
                />
                <img src={imgSrc} id="output" alt="your image" srcSet="" />
              </div>
            </div>
            <div class="account-type inputs-div">
              <aside>
                <h3>Account type</h3>
              </aside>
              <div class="input-field">
                <div class="custom-select">
                  <select
                    value={AccountType}
                    onChange={(e) => setAccountType(e.target.value)}
                  >
                    <option value="Lender">Lender</option>
                    <option value="Receiver">Receiver</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="buttons inputs-div">
              <a href="/" class="btn-form btn-light">
                Go Back
              </a>
              <a
                href="#"
                onClick={() => setWillShowCollateralPage(true)}
                class="btn-form btn-dark"
              >
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
