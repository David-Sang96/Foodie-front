/* eslint-disable react/prop-types */
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Button = ({ btnType, fn, children, bg, status, type }) => {
  const navigate = useNavigate();

  const normalBtnClass =
    "0 inline-flex w-full justify-center rounded-md transition-all duration-500 ease-out border px-4 py-2 text-sm font-semibold hover:bg-amber-600 hover:text-white sm:ml-3 sm:w-auto";

  const formBtnClass =
    "w-full rounded-md bg-orange py-2 font-medium text-white transition-all duration-500 ease-out hover:bg-amber-600";

  if (btnType === "back") {
    return (
      <button title="back" onClick={() => navigate(-1)}>
        <IoMdArrowBack className="rounded-md border border-white bg-orange text-2xl text-white transition-all duration-500 ease-out hover:bg-amber-600 md:text-4xl" />
      </button>
    );
  }

  if (btnType === "normal") {
    return (
      <button
        type="button"
        className={twMerge(normalBtnClass, bg ? "bg-orange text-white" : "")}
        onClick={fn}
      >
        {children}
      </button>
    );
  }

  if (btnType === "formBtn") {
    return (
      <button
        type={type}
        disabled={status}
        className={twMerge(formBtnClass, status ? "cursor-not-allowed" : "")}
      >
        {children}
      </button>
    );
  }

  return null;
};

export default Button;
