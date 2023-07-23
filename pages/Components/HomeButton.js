import React from "react";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";

const HomeButton = () => {
  return (
    <Link href="/">
      <button className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded-lg">
        <RiArrowGoBackFill size={20} />
      </button>
    </Link>
  );
};

export default HomeButton;
