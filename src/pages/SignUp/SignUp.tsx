import React from "react";
import styles from "@/assets/css/signUp/signUp.module.css";
import carry_logo from "@/assets/img/Carry UP.svg";
import google_icon from "@/assets/img/google.svg";
import eye_icon from "@/assets/img/eye_icon.svg";
import date_icon from "@/assets/img/calendar.svg";
import Image from "next/image";
import Link from "next/link";

function SignUp() {
  return (
    <div
      className={`${styles.signUp} flex justify-center items-center min-h-screen`}
    >
      <div className="w-[761px] h-[918px] p-[60px_105px_59px_104px] rounded-[21px] shadow-[0_2px_20px_0_rgba(218,236,255,0.15)] bg-white">
        <div className="flex items-center justify-center">
          <Image src={carry_logo} alt="carry_logo" />
        </div>
        <div className="mt-[70px]">
          <h2 className="text-2xl font-bold">Welcome!</h2>
          <span className="text-lg mt-2">Please create an account</span>
        </div>

        <form className="mt-4">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-[rgba(51,51,51,0.85)] text-lg font-normal"
              >
                Name*
              </label>
              <input
                type="text"
                id="name"
                className="border border-solid border-[rgba(145,158,171,0.2)] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="surname"
                className="block mb-2 text-[rgba(51,51,51,0.85)] text-lg font-normal"
              >
                Surname*
              </label>
              <input
                type="text"
                id="surname"
                className="border border-solid border-[rgba(145,158,171,0.2)] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Surname"
                required
              />
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="relative max-w-sm">
              <label
                htmlFor="birthday"
                className="block mb-2 text-[rgba(51,51,51,0.85)] text-lg font-normal"
              >
                Birthday*
              </label>
              {/* <input
                type="date"
                id="birthday"
                className="border border-solid border-[rgba(145,158,171,0.2)] bg-transparent text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="DD/MM/YYYY"
                required
              /> */}
              <input
                // datepicker
                id="birthday"
                type="date"
                className={`${styles.dateInput} border border-solid border-[rgba(145,158,171,0.2)] bg-transparent text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                placeholder="DD/MM/YYYY"
                required
              />

              <div className="absolute top-[58%] left-[86%]">
                <Image src={date_icon} alt={"date_icon"} />
              </div>
            </div>
            <div className="">
              <label
                htmlFor="gender"
                className="block mb-2 text-[rgba(51,51,51,0.85)] text-lg font-normal"
              >
                Gender*
              </label>
              <select
                className="w-full p-2.5 text-gray-500 text-sm border border-solid border-[rgba(145,158,171,0.2)] rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled selected>
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-[rgba(51,51,51,0.85)] text-lg font-normal"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                className="bg-transparent border border-solid border-[rgba(145,158,171,0.2)] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter"
                required
              />
            </div>
            <div>
              <label
                htmlFor="number"
                className="block mb-2 text-[rgba(51,51,51,0.85)] text-lg font-normal"
              >
                Number*
              </label>
              <input
                type="text"
                id="number"
                className="bg-transparent border border-solid border-[rgba(145,158,171,0.2)] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter"
                required
              />
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-2 text-[rgba(51,51,51,0.85)] text-lg font-normal"
              >
                Create password*
              </label>
              <input
                type="password"
                id="password"
                className="bg-transparent border border-solid border-[rgba(145,158,171,0.2)] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter"
                required
              />
              <span className="absolute top-[57%] left-[85%]">
                {" "}
                <Image src={eye_icon} alt="eye" />
              </span>
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-[rgba(51,51,51,0.85)] text-lg font-normal"
              >
                Confirm password*
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="bg-transparent border border-solid border-[rgba(145,158,171,0.2)] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter"
                required
              />
              <span className="absolute top-[57%] left-[85%]">
                {" "}
                <Image src={eye_icon} alt="eye" />
              </span>
            </div>
          </div>
          <div className="w-full flex gap-3 mb-3 items-center">
            <input type="checkbox" name="" id="" />
            <p className="text-lg font-normal">
              I have read and agree to{" "}
              <Link href="" className="text-[#45a8ff] font-medium text-lg">
                terms of services
              </Link>
            </p>
          </div>
          <div>
            <button className="bg-[#ADA7EB] text-white w-full py-2 rounded-md">
              Sign Up
            </button>
          </div>
          <div className="flex items-center my-[20px] mx-0">
            <span className="h-[1px] flex-grow bg-[rgba(51,51,51,0.4)]"></span>
            <p className="text-[18px] text-right text-[#333] mx-[20px] my-0">
              Or with
            </p>
            <span className="h-[1px] flex-grow bg-[rgba(51,51,51,0.4)]"></span>
          </div>
          <button
            type="button"
            className="h-[40px] flex justify-center items-center px-[16px] py-[8px] rounded-[8px] border border-[rgba(145,158,171,0.2)] transition-colors duration-300 ease-in-out w-full my-[24px]"
          >
            <Image src={google_icon} alt="google" />
          </button>
        </form>
        <div className="">
          <p className="text-lg font-normal">
            Already have an account?{" "}
            <Link href="/login" className="text-[#45a8ff] font-medium text-lg">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
