import { BsThreeDotsVertical } from "react-icons/bs";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import EditMenu from "../EditMenu/EditMenu";

const ModuleLinkItem = ({ module, open, toggleModal }) => {
  const id = module.mId;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleSingleClick = (e) => {
    e.preventDefault();
  };

  const handleDoubleClick = (e) => {
    window.open(module.fileLink, "_blank");
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex justify-between items-center border p-2 rounded-md text-lg mt-2 bg-white"
        onClick={handleSingleClick}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex ml-2 gap-3 w-fit items-center">
          {module.type === "Link" ? (
            <span className="text-3xl bg-blue-100 text-blue-600 border p-1 border-blue-200 rounded-md">
              <IoIosLink />
            </span>
          ) : (
            <span className="text-3xl bg-red-100 p-1 text-red-600 border border-red-200 rounded-md">
              <IoDocumentTextOutline />
            </span>
          )}
          <div>
            <h1 key={module.mId}>{module.name}</h1>
            <p className="text-sm text-slate-600">{module.type}</p>
          </div>
        </div>
        <div
          className="text-xl cursor-pointer hover:bg-slate-100 rounded-md p-2"
          onMouseDown={toggleModal}
        >
          <BsThreeDotsVertical />
        </div>
      </div>
      <EditMenu open={open} module={module} />
    </>
  );
};

export default ModuleLinkItem;
