import { useContext, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { v4 as uuid } from "uuid";
import { ModuleListContext } from "../../App";

const UploadData = ({ toggleModal }) => {
  const { updateModuleList } = useContext(ModuleListContext);

  const fileInputRef = useRef();
  const fileNameInputRef = useRef();

  const handleUploadData = () => {
    const uniqueFileId = uuid().slice(0, 10);
    const file = fileInputRef.current.files[0];
    const fileName = fileNameInputRef.current.value;
    const fileLink = URL.createObjectURL(file);

    const module = {
      type: "File",
      name: fileName,
      fileLink: fileLink,
      fileData: file,
      fileType: file.type,
      mId: uniqueFileId,
    };

    updateModuleList(module);
    toggleModal();
  };

  return (
    <>
      {/* Modal Header */}
      <div className="flex justify-between items-center text-xl font-semibold text-black">
        <h1>Upload File</h1>
        <IoMdClose
          className="hover:cursor-pointer text-2xl hover:text-red-600"
          onClick={toggleModal}
        />
      </div>
      {/* Modal Body */}
      <div className="my-6">
        <label className="font-semibold" htmlFor="moduleName">
          File Name
        </label>
        <br />
        <input
          ref={fileNameInputRef}
          className="mt-3 w-[350px] border rounded-md p-2 text-lg"
          type="text"
          id="moduleName"
          placeholder="Enter File Name"
        />
        <br />
      </div>
      <div className="mb-6">
        <label className="font-semibold" htmlFor="file">
          Select File
        </label>
        <br />
        <input
          ref={fileInputRef}
          className="mt-3 w-[350px] border rounded-md p-2 text-lg"
          type="file"
          id="file"
          accept="image/png, image/jpeg, application/pdf"
        />
        <br />
      </div>
      <div className="flex justify-end items-center gap-3 mb-3">
        <button
          className="border-2 rounded-lg p-2 px-4 hover:border-red-400 hover:text-red-600 font-semibold box-border transition-all duration-200"
          onClick={toggleModal}
        >
          Cancel
        </button>
        <button
          className="border rounded-lg p-2 px-4 bg-teal-600 text-white"
          onClick={handleUploadData}
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default UploadData;
