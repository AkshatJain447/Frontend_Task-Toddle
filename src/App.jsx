import { createContext, useEffect, useState } from "react";

import { DndContext, closestCorners } from "@dnd-kit/core";
import Dropdown from "./components/dropdown/Dropdown";
import ModuleList from "./components/ModuleList/ModuleList";
import Empty from "./components/Empty/Empty";

export const ModuleListContext = createContext();

function App() {
  const savedModuleList = localStorage.getItem("moduleList");
  const [moduleList, setModuleList] = useState(() => {
    return savedModuleList ? JSON.parse(savedModuleList) : [];
  });

  useEffect(() => {
    localStorage.setItem("moduleList", JSON.stringify(moduleList));
  }, [moduleList]);

  const updateModuleList = (value) => {
    setModuleList((prevList) => [...prevList, value]);
  };

  const handleRenameOrDelete = (mId, operation, newName = null) => {
    const updateItem = (list) => {
      return list
        .map((item) => {
          if (item.mId === mId) {
            if (operation === "rename") {
              return { ...item, name: newName };
            } else if (operation === "delete") {
              return null;
            }
          } else if (item.sublist) {
            return { ...item, sublist: updateItem(item.sublist) };
          }
          return item;
        })
        .filter(Boolean);
    };

    setModuleList((prevList) => updateItem(prevList));
  };

  const delModuleItem = (mId) => {
    handleRenameOrDelete(mId, "delete");
  };

  const renameModuleItem = (mId, newName) => {
    handleRenameOrDelete(mId, "rename", newName);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const findItemById = (list, id) => {
      for (const item of list) {
        if (item.mId === id) return item;
        if (item.sublist) {
          const subItem = findItemById(item.sublist, id);
          if (subItem) return subItem;
        }
      }
      return null;
    };

    const findParentAndIndex = (list, id) => {
      for (const [index, item] of list.entries()) {
        if (item.mId === id) return { parent: list, index };
        if (item.sublist) {
          const result = findParentAndIndex(item.sublist, id);
          if (result) return result;
        }
      }
      return null;
    };

    const draggedItem = findItemById(moduleList, active.id);
    const targetItem = findItemById(moduleList, over.id);

    if (!draggedItem || !targetItem) return;

    setModuleList((prevModuleList) => {
      const newModuleList = [...prevModuleList];

      const { parent: draggedParent, index: draggedIndex } = findParentAndIndex(
        newModuleList,
        active.id
      );
      const { parent: targetParent, index: targetIndex } = findParentAndIndex(
        newModuleList,
        over.id
      );

      if (draggedItem.type === "module") {
        if (targetItem.type === "module") {
          // reordering with other modules
          const [movedModule] = draggedParent.splice(draggedIndex, 1);
          targetParent.splice(targetIndex, 0, movedModule);
        }
      } else if (
        draggedItem.type !== "module" &&
        targetItem.type !== "module"
      ) {
        // If both dragged and target items are non-modules
        if (draggedParent === targetParent) {
          const [movedItem] = draggedParent.splice(draggedIndex, 1);
          targetParent.splice(targetIndex, 0, movedItem);
        }
      } else if (
        draggedItem.type !== "module" &&
        targetItem.type === "module"
      ) {
        // If dragged item is not a module and target item is a module
        const targetModule = targetParent[targetIndex];
        targetModule.sublist.push(draggedItem);
        draggedParent.splice(draggedIndex, 1);
      } else if (
        draggedItem.type !== "module" &&
        targetItem.type !== "module" &&
        draggedParent !== newModuleList
      ) {
        // If dragged item is a non-module and target item is not a module
        const [movedItem] = draggedParent.splice(draggedIndex, 1);
        const newIndex = newModuleList.findIndex(
          (item) => item.mId === over.id
        );
        newModuleList.splice(newIndex + 1, 0, movedItem);
      }

      return newModuleList;
    });
  };

  return (
    <ModuleListContext.Provider
      value={{ moduleList, updateModuleList, delModuleItem, renameModuleItem }}
    >
      <div>
        <div className="font-semibold text-lg flex w-[80%] items-center justify-between mx-auto my-8">
          <h1 className="font-bold text-xl">Course Builder</h1>
          <Dropdown />
        </div>
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          {moduleList.length > 0 ? <ModuleList /> : <Empty />}
        </DndContext>
      </div>
    </ModuleListContext.Provider>
  );
}

export default App;
