/* eslint-disable react/prop-types */
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Button = ({ btnType, fn, children, bg, status, type }) => {
  const navigate = useNavigate();

  if (btnType === "back") {
    return (
      <button title="back" onClick={() => navigate(-1)}>
        <IoMdArrowBack className="rounded-md border border-white bg-orange text-2xl text-white hover:bg-amber-600 md:text-3xl" />
      </button>
    );
  }

  if (btnType === "normal") {
    return (
      <button
        type="button"
        className={`0 inline-flex w-full justify-center rounded-md ${bg ? "bg-orange text-white" : ""} border px-4 py-2 text-sm font-semibold hover:bg-amber-600 hover:text-white sm:ml-3 sm:w-auto`}
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
        className={`w-full rounded-md bg-orange py-2 font-medium text-white ${status ? "cursor-not-allowed" : ""} hover:bg-amber-600`}
      >
        {children}
      </button>
    );
  }

  return null;
};

export default Button;
