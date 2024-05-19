import React, { useState } from "react";
import { GoLink } from "react-icons/go";
import { RiUploadLine } from "react-icons/ri";
import { MdOutlineTableRows } from "react-icons/md";
import "./DropdownContent.css";
import Modal from "../Modal/Modal";
import CreateModule from "../CreateModule/CreateModule";
import AddLink from "../AddLink/AddLink";
import UploadData from "../UploadData/UploadData";

const DropdownContent = ({ open }) => {
  const [showCreateModule, setShowCreateModule] = useState(false);
  const [showAddLink, setShowAddLink] = useState(false);
  const [showUploadData, setShowUploadData] = useState(false);

  const toggleCreateModule = () => {
    setShowCreateModule(!showCreateModule);
  };
  const toggleAddLink = () => {
    setShowAddLink(!showAddLink);
  };
  const toggleUploadData = () => {
    setShowUploadData(!showUploadData);
  };

  return (
    <>
      <div
        className={`absolute right-[80px] w-[200px] flex flex-col justify-center items-start gap-1 rounded-lg shadow-xl border py-1 dropdown-content ${
          open ? "dropOpen" : ""
        }`}
      >
        <div
          className="flex p-1 px-4 justify-start items-center gap-2 hover:cursor-pointer hover:bg-slate-200 w-full transition-colors duration-150"
          onClick={toggleCreateModule}
        >
          <MdOutlineTableRows />
          Create Module
        </div>
        <div
          className="flex p-1 px-4 justify-start items-center gap-2 hover:cursor-pointer hover:bg-slate-200 w-full transition-colors duration-150"
          onClick={toggleAddLink}
        >
          <GoLink />
          Add a Link
        </div>
        <div
          className="flex p-1 px-4 justify-start items-center gap-2 hover:cursor-pointer hover:bg-slate-200 w-full transition-colors duration-150"
          onClick={toggleUploadData}
        >
          <RiUploadLine />
          Upload
        </div>
      </div>
      {showCreateModule && (
        <Modal>
          <CreateModule toggleModal={toggleCreateModule} />
        </Modal>
      )}
      {showAddLink && (
        <Modal>
          <AddLink toggleModal={toggleAddLink} />
        </Modal>
      )}
      {showUploadData && (
        <Modal>
          <UploadData toggleModal={toggleUploadData} />
        </Modal>
      )}
    </>
  );
};

export default DropdownContent;
