import { useContext, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { ModuleListContext } from "../../App";
import { v4 as uuid } from "uuid";

const CreateModule = ({ toggleModal }) => {
  const { updateModuleList } = useContext(ModuleListContext);
  const ModuleRef = useRef();

  const handleCreateModule = () => {
    const uniqueModuleId = uuid().slice(0, 10);
    const module = {
      type: "module",
      name: ModuleRef.current.value,
      mId: uniqueModuleId,
      sublist: [],
    };
    updateModuleList(module);
    toggleModal();
  };

  return (
    <>
      {/* Modal Header */}
      <div className=" flex justify-between items-center text-xl font-semibold text-black">
        <h1>Create Module</h1>
        <IoMdClose
          className="hover:cursor-pointer text-2xl hover:text-red-600"
          onClick={toggleModal}
        />
      </div>
      {/* Modal Body */}
      <div className="my-6">
        <label className="font-semibold" htmlFor="moduleName">
          Module Name
        </label>
        <br />
        <input
          ref={ModuleRef}
          className=" mt-3 w-[350px] border rounded-md p-2 text-lg"
          type="text"
          id="moduleName"
          placeholder="Enter Module Name"
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
          onClick={handleCreateModule}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateModule;
