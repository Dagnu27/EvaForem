import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div>
        <div className="logo logo--light">NET<span>/</span>WKU</div>
        <div className="footer__socials">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><FaFacebookF /></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><FaYoutube /></a>
        </div>
      </div>
      <div>
        <h4>Useful Link</h4>
        <a href="#">How it works</a>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy policy</a>
      </div>
      <div>
        <h4>Contact Info</h4>
        <p>wku Networks</p>
        <p>support@wkuNetwork.com</p>
        <p>+1-202-386-2702</p>
      </div>
    </div>
  </footer>
);

export default Footer;