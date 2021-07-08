import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./profile.css";

import formatDate from "../../utils/formatDate";

function BasicInfo({ hiddenData }) {
  return (
    <div>
      <div class="banner"></div>
      <div class="user-info">
        <div class="profile-circle"></div>
        <p class="bkash " id="bkash" data-tooltip="Bkash number for the user">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            width="40"
            viewBox="-6.6741 -11.07275 57.8422 66.4365"
          >
            <g fill="none">
              <path
                fill="#DF146E"
                d="M42.31 44.291H2.182C.981 44.291 0 43.308 0 42.107V2.186C0 .982.981 0 2.182 0H42.31c1.203 0 2.184.982 2.184 2.186v39.921c0 1.201-.981 2.184-2.184 2.184"
              />
              <path
                fill="#FFF"
                d="M31.894 24.251l-14.107-2.246 1.909 8.329zm.572-.682L21.374 8.16l-3.623 13.106zm-15.402-2.482L5.441 6.239l15.221 1.819zm-5.639-6.154l-6.449-6.08h1.695zm24.504 1.15L33.2 23.486l-4.426-6.118zM21.417 30.232l10.71-4.3.454-1.365zm-8.933 7.821l4.589-16.102 2.326 10.479zm24.099-21.914l-1.128 3.056 4.059-.07z"
              />
            </g>
          </svg>
          {hiddenData.bkash}
        </p>
        <div class="description">
          <h1>
            {hiddenData.username}
            {hiddenData.verfiedStatus && (
              <i
                class="fas fa-check-square "
                data-tooltip="User is verified"
                id="verified"
              ></i>
              // <FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon>
            )}
          </h1>
          <p style={{ textAlign: "left" }}>
            {hiddenData.details
              ? hiddenData.details
              : "Details about a user in 120 characters that will be taken from the sign up page. We will show it to them and the lender."}
          </p>
          <div class="" id="description">
            <div class="hidden-details " id="hidden-details">
              <div class="item">
                <span class="field">User Type</span>
                <span class="value">{hiddenData.usertype}</span>
              </div>
              <div class="item">
                <span class="field">Email</span>
                <span class="value">{hiddenData.email}</span>
              </div>
              <div class="item">
                <span class="field">Date Of Birth</span>
                <span class="value">{formatDate(hiddenData.dob)}</span>
              </div>
              <div class="item">
                <span class="field">Join Date</span>
                <span class="value">{formatDate(hiddenData.joinedDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
