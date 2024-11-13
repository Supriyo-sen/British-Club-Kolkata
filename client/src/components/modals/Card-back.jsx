import React from "react";
import logo from "../../assets/images/LOGO.png";
import VirtualCardStyle from "../../style/virtualCard.module.css";

function BackView({ Qrcode, backendRef }) {
  return (
    <div className={VirtualCardStyle.card} ref={backendRef}>
      <div className="container">
        <p className={VirtualCardStyle.cardHeader}>British Club Kolkata</p>
      </div>
      <div className="container flex items-center  justify-between pt-4">
        <img className="w-32 h-32" src={logo} alt="logo" />
        <img className={VirtualCardStyle.cardImage} src={Qrcode} alt="error" />
      </div>
    </div>
  );
}

export default BackView;

const qrLink =
  "https://qr.rebrandly.com/v1/qrcode?shortUrl=https%3A%2F%2Frebrand.ly%2Fv574wuj&source=com.rebrandly.app&size=128&dummy=0.8802666156629211&logo=rebrandly";
