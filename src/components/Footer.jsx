import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const handleOpen = (modal) => setActiveModal(modal);
  const handleClose = () => setActiveModal(null);

  const modalContent = {
    terms: {
      title: "Terms & Conditions",
      text: "By using Green Space, you agree to our terms and conditions. This includes respecting event guidelines, providing accurate registration details, and not misusing platform features.",
    },
    privacy: {
      title: "Privacy Policy",
      text: "We value your privacy. Green Space collects minimal personal data, stores it securely, and never shares it with third parties without consent.",
    },
    cookies: {
      title: "Cookie Policy",
      text: "We use cookies to enhance your browsing experience. These help us remember preferences and analyze traffic anonymously.",
    },
    about: {
      title: "About Green Space",
      text: "Green Space is a community of plant lovers dedicated to making urban gardening accessible to everyone. We provide a platform to share knowledge, connect with fellow gardeners, and grow together in our green journeys.",
    },
  };

  const bgColor = "#2e4f2e";
  const textColor = "#f3f8f3";
  const accentColor = "#579857";

  return (
    <footer style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="max-w-11/12 mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand + Socials */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Green Space</h3>
            <p className="mb-4">
              Growing community, sharing knowledge, and nurturing green spaces
              together.
            </p>
            <div className="flex space-x-4 justify-center">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="hover:text-[#7db47d] transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                className="hover:text-[#7db47d] transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="hover:text-[#7db47d] transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                className="hover:text-[#7db47d] transition-colors"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#7db47d] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/explore-gardeners"
                  className="hover:text-[#7db47d] transition-colors"
                >
                  Explore Gardeners
                </Link>
              </li>
              <li>
                <Link
                  to="/browse-tips"
                  className="hover:text-[#7db47d] transition-colors"
                >
                  Browse Tips
                </Link>
              </li>
              <li>
                <button
                  onClick={()=> handleOpen("about")}
                  className="hover:text-[#7db47d] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a
                  href="mailto:info@greenthumbs.com"
                  className="hover:text-[#7db47d] transition-colors"
                >
                  info@greenthumbs.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <a
                  href="tel:+123456789"
                  className="hover:text-[#7db47d] transition-colors"
                >
                  +1 (234) 567-89
                </a>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>1234 Garden Street, Plant City</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">
              Subscribe to receive gardening tips and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md w-full bg-white focus:outline-none text-gray-800"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-r-md transition-colors"
                style={{ backgroundColor: accentColor, color: "white" }}
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 text-center text-sm border-t"
          style={{ borderColor: "#366236" }}
        >
          <p>
            &copy; {new Date().getFullYear()} Green Space. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <button
              onClick={() => handleOpen("privacy")}
              className="hover:text-[#7db47d] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleOpen("terms")}
              className="hover:text-[#7db47d] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => handleOpen("cookies")}
              className="hover:text-[#7db47d] transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-[#579857] text-lg">
              {modalContent[activeModal].title}
            </h3>
            <p className="py-4 text-black">{modalContent[activeModal].text}</p>
            <div className="modal-action">
              <button
                onClick={handleClose}
                className="btn text-white bg-[#579857]"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </footer>
  );
};

export default Footer;
