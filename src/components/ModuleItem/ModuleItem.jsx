import { BsThreeDotsVertical } from "react-icons/bs";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import EditMenu from "../EditMenu/EditMenu";
import { useState } from "react";

const ModuleItem = ({ module, open, toggleModal, toggleModule }) => {
  const [iconState, setIconState] = useState(false);

  const id = module.mId;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleMinimize = () => {
    setIconState(!iconState);
    toggleModule(module.mId);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex justify-between items-center border p-2 rounded-md text-lg mt-2 bg-white"
      >
        <div className="flex ml-2 gap-3 w-fit items-center">
          <MdOutlineArrowDropDownCircle
            className={`text-4xl text-slate-700 p-1 rounded-md ${
              iconState ? "rotate-180" : ""
            } transition-all duration-150`}
            onMouseDown={handleMinimize}
          />
          <div>
            <h1>{module.name}</h1>
            {module.sublist.length > 0 ? (
              <p className="text-sm text-slate-600">
                {module.sublist.length} items
              </p>
            ) : (
              <p className="text-sm text-slate-600">Add items to this module</p>
            )}
          </div>
        </div>
        <div
          className="text-xl cursor-pointer hover:bg-slate-100 rounded-md p-2"
          onMouseDown={toggleModal}
        >
          <BsThreeDotsVertical />
        </div>
      </div>
      <EditMenu open={open} module={module} toggleModal={toggleModal} />
    </>
  );
};

export default ModuleItem;
