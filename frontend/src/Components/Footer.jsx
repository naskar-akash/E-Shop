import React from "react";
import { CiMail } from "react-icons/ci";
import { SlSocialYoutube } from "react-icons/sl";
import { TiSocialFacebook } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialGithub } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { SlSocialGithub } from "react-icons/sl";
import { CiShop } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="w-full min-h-[35vh] relative bottom-0 bg-black/90 p-10 mt-8">
      <div className="flex justify-between border-b-1 border-gray-600 pb-5">
        <div className="flex flex-col gap-5">
          <p className="text-sm text-stone-500">ABOUT</p>
          <ul className="flex flex-col text-white text-xs font-bold gap-1">
            <li>About us</li>
            <li>Contact us</li>
            <li>Careers</li>
            <li>Stories</li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-sm text-stone-500">HELP</p>
          <ul className="flex flex-col text-white text-xs font-bold gap-1">
            <li>Payment</li>
            <li>Shipping</li>
            <li>Cancellation</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-stone-500">CONSUMER POLICY</p>
          <ul className="flex flex-col text-white text-xs font-bold gap-1">
            <li>Terms of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Refund</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-stone-500">Mail Us:</p>
            <p className="flex flex-col text-white text-xs font-bold gap-1">
              mail@mail.com
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-stone-500">Social:</p>
            <div className="flex justify-center gap-2 text-white text-lg">
              <CiMail />
              <SlSocialYoutube />
              <TiSocialFacebook />
              <SlSocialInstagram />
            </div>
          </div>
        </div>
      </div>
      <div className="text-white flex justify-evenly items-center gap-8 py-4">
        <div className="flex justify-center items-center gap-1">
          <CiShop className="size-5 my-1 text-amber-400"/>
          <p className="">Become a seller</p>
        </div>
        <SlSocialGithub className="size-6 text-yellow-300"/>
        <TiSocialGithub className="size-6"/>
        <TiSocialLinkedin className="size-6 text-blue-500"/>
        <p>&copy; 2025 E-Shop </p>
      </div>
    </div>
  );
};

export default Footer;
