import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { TiSocialGithub } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { SlSocialGithub } from "react-icons/sl";
import { CiShop } from "react-icons/ci";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col justify-center min-h-[35vh] relative bottom-0 bg-black/90 p-10 mt-8">
      <div className="grid grid-cols-2 gap-2 md:flex justify-evenly border-b-1 border-gray-600 pb-3">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-stone-500">ABOUT</p>
          <ul className="flex flex-col text-white text-xs font-bold gap-1">
            <li>
              <NavLink to="/about" className="hover:underline">
                About us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:underline">
                Contact us
              </NavLink>
            </li>
            <li>Careers</li>
            <li>Stories</li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-stone-500">HELP</p>
          <ul className="flex flex-col text-white text-xs font-bold gap-1">
            <li>Payment</li>
            <li>Shipping</li>
            <li>Cancellation</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-stone-500">CONSUMER POLICY</p>
          <ul className="flex flex-col text-white text-xs font-bold gap-1">
            <li>Terms of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Refund</li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-stone-500">Mail Us:</p>
            <a
              href="https://mail.google.com/mail/?view=cm&to=eshop.akash@gmail.com"
              target="blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <p className="flex flex-col text-white text-xs font-bold gap-1 hover:underline">
                eshop.akash@gmail.com
              </p>
            </a>
          </div>
          <div className="flex flex-row gap-4">
            <p className="text-sm text-stone-500">Social:</p>
            <div className="flex justify-center gap-2 text-white text-lg">
              <a
                href="https://mail.google.com/mail/?view=cm&to=eshop.akash@gmail.com"
                className="hover:text-blue-500 transition"
                target="blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <CiMail />
              </a>
              <a
                href="https://github.com/naskar-akash?tab=repositories"
                className="hover:text-red-600 transition"
                target="blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <SlSocialGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/akash-naskar-82b332373/"
                className="hover:text-teal-500 transition"
                target="blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <TiSocialLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white flex flex-col justify-evenly items-center gap-4 md:gap-8 py-4">
        <div className="flex justify-center gap-6 items-center">
        <div
          className="flex justify-center items-center gap-1 hover:underline cursor-pointer"
          onClick={() => navigate("/admin/create")}
        >
          <CiShop className="size-5 my-1 text-amber-400" />
          <p className="">Become a seller</p>
          </div>
          <p>&copy; 2025 E-Shop </p>
        </div>
        <div className="w-full flex justify-evenly items-center">
          <a
            href="https://github.com/naskar-akash?tab=repositories"
            className="text-yellow-300 hover:text-white transition"
            target="blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
          >
            <SlSocialGithub className="size-6" />
          </a>
          <a
            href="https://github.com/naskar-akash/E-Shop.git"
            className="text-pink-400 hover:text-white transition"
            target="blank"
            rel="noopener noreferrer"
            aria-label="Project GitHub Repository"
          >
            <TiSocialGithub className="size-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/akash-naskar-82b332373/"
            className="text-blue-500 hover:text-white transition"
            target="blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <TiSocialLinkedin className="size-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
