import { IoMdArrowDropup } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import DropdownContent from "../DropdownContent/DropdownContent";
import { useEffect, useRef, useState } from "react";

const Dropdown = () => {
  const [open, setOpen] = useState(false);

  //Tracking Dropmenu click activity
  const dropdownRef = useRef();

  useEffect(() => {
    const handle = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, [dropdownRef]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* dropdown menu button */}
      <span
        ref={dropdownRef}
        className=" flex p-2 px-4 m-1 rounded-md text-white bg-red-600 justify-center items-center gap-2 cursor-pointer w-fit"
        onClick={toggleOpen}
      >
        <FaPlus />
        Add
        {open ? (
          <IoMdArrowDropup className="text-xl transition-all duration-150" />
        ) : (
          <IoMdArrowDropup className="text-xl transition-all duration-150 rotate-180" />
        )}
      </span>
      <DropdownContent open={open} />
    </div>
  );
};

export default Dropdown;
