import { useContext, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { ModuleListContext } from "../../App";

const EditModule = ({ toggleModal, module, toggleEditMenu }) => {
  const { renameModuleItem } = useContext(ModuleListContext);
  const ModuleRef = useRef();

  useEffect(() => {
    if (module) {
      ModuleRef.current.value = module.name;
    }
  }, [module]);

  const handleSaveModule = () => {
    if (module) {
      renameModuleItem(module.mId, ModuleRef.current.value);
    }
    toggleModal();
    toggleEditMenu();
  };

  return (
    <>
      {/* Modal Header */}
      <div className="flex justify-between items-center text-xl font-semibold text-black">
        <h1>Edit Module</h1>
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
          className="mt-3 w-[350px] border rounded-md p-2 text-lg"
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
          onClick={handleSaveModule}
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default EditModule;
