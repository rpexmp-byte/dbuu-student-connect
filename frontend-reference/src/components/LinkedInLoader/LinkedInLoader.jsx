/**
 * DBUU Student Connect loader component
 * Shows the circular DBUU crest with a navy & orange animated progress bar
 */
import React from "react";
import "./LinkedInLoader.css";

export default function LinkedInLoader() {
  return (
    <div className="linkedin-loader-wrapper">
      <div className="linkedin-loader-container">
        <div className="dbuu-loader-crest">
          <img src="/dbuu_crest.jpg" alt="DBUU Crest" />
        </div>
        <p className="dbuu-loader-title">DBUU STUDENT CONNECT</p>
        <div className="linkedin-loader-line">
          <div className="linkedin-loader-inner"></div>
        </div>
      </div>
    </div>
  );
}
