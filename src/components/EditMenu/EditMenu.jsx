import { MdOutlineDelete } from "react-icons/md";
import { RiDownloadFill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import "./EditMenu.css";
import { useContext, useState } from "react";
import { ModuleListContext } from "../../App";
import EditModule from "../EditModule/EditModule";
import Modal from "../Modal/Modal";

const EditMenu = ({ open, module, toggleModal }) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  const toggleEditModule = () => {
    setOpenEditModal(!openEditModal);
  };

  const downloadFile = () => {
    const fileData = module.fileData;
    const blob = new Blob([fileData], { type: module.fileType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = module.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  const { delModuleItem } = useContext(ModuleListContext);

  return (
    <>
      <div
        className={`absolute right-[155px] -translate-y-3 w-[200px] flex flex-col justify-center items-start gap-1 rounded-lg shadow-xl border py-1 menu-content ${
          open ? "menuOpen" : ""
        }`}
      >
        <div
          className="flex p-1 px-4 justify-start items-center gap-2 hover:cursor-pointer hover:bg-slate-200 w-full transition-colors duration-150"
          onClick={toggleEditModule}
        >
          <CiEdit />
          Edit module Name
        </div>
        {module.type === "File" && (
          <div
            className="flex p-1 px-4 justify-start items-center gap-2 hover:cursor-pointer hover:bg-slate-200 w-full transition-colors duration-150 border-b pb-2"
            onClick={downloadFile}
          >
            <RiDownloadFill />
            Download
          </div>
        )}
        <div
          className="flex p-1 px-4 justify-start items-center gap-2 hover:cursor-pointer text-red-600 hover:bg-slate-200 w-full transition-colors duration-150"
          onClick={() => delModuleItem(module.mId)}
        >
          <MdOutlineDelete />
          Delete
        </div>
      </div>
      {openEditModal && (
        <Modal>
          <EditModule
            toggleModal={toggleEditModule}
            module={module}
            toggleEditMenu={toggleModal}
          />
        </Modal>
      )}
    </>
  );
};

export default EditMenu;
