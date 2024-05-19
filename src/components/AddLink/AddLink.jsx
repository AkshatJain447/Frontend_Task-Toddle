import { useContext, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { v4 as uuid } from "uuid";
import { ModuleListContext } from "../../App";

const AddLink = ({ toggleModal }) => {
  const { updateModuleList } = useContext(ModuleListContext);

  const linkRef = useRef();
  const linkNameRef = useRef();

  const handleAddLink = () => {
    const uniqueLinkId = uuid().slice(0, 10);
    const link = linkRef.current.value;
    const linkName = linkNameRef.current.value;
    const module = {
      type: "Link",
      name: linkName,
      fileLink: link,
      mId: uniqueLinkId,
    };
    updateModuleList(module);
    toggleModal();
  };

  return (
    <>
      {/* Modal Header */}
      <div className=" flex justify-between items-center text-xl font-semibold text-black">
        <h1>Add new Link</h1>
        <IoMdClose
          className="hover:cursor-pointer text-2xl hover:text-red-600"
          onClick={toggleModal}
        />
      </div>
      {/* Modal Body */}
      <div className="my-6">
        <label className="font-semibold" htmlFor="moduleName">
          URL
        </label>
        <br />
        <input
          ref={linkRef}
          className=" mt-3 w-[350px] border rounded-md p-2 text-lg"
          type="text"
          id="moduleName"
          placeholder="Enter resource URL"
        />
        <br />
      </div>
      <div className="my-6">
        <label className="font-semibold" htmlFor="moduleName">
          Display name
        </label>
        <br />
        <input
          ref={linkNameRef}
          className=" mt-3 w-[350px] border rounded-md p-2 text-lg"
          type="text"
          id="moduleName"
          placeholder="Enter name to display"
        />
        <br />
      </div>
      <div className="flex justify-end items-center gap-3 mb-3">
        <button
          className="border-2 rounded-lg p-2 px-4 hover:border-red-400 hover:border-2 hover:text-red-600 font-semibold box-border transition-all duration-200"
          onClick={toggleModal}
        >
          Cancel
        </button>
        <button
          className="border rounded-lg p-2 px-4 bg-teal-600 text-white"
          onClick={handleAddLink}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddLink;
