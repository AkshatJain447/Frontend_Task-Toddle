import { useContext, useState } from "react";
import { ModuleListContext } from "../../App";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ModuleItem from "../ModuleItem/ModuleItem";
import ModuleLinkItem from "../ModuleLinkItem/ModuleLinkItem";

const ModuleList = () => {
  const { moduleList } = useContext(ModuleListContext);
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleModal = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const renderList = (list) => {
    return (
      <SortableContext
        items={list.map((item) => item.mId)}
        strategy={verticalListSortingStrategy}
      >
        {list.map((item) => {
          if (item.type === "module") {
            return (
              <div key={item.mId}>
                <ModuleItem
                  module={item}
                  open={openMenuId === item.mId}
                  toggleModal={() => toggleModal(item.mId)}
                />
                {item.sublist && item.sublist.length > 0 && (
                  <div className="ml-4">{renderList(item.sublist)}</div>
                )}
              </div>
            );
          } else {
            return <ModuleLinkItem module={item} key={item.mId} />;
          }
        })}
      </SortableContext>
    );
  };

  return (
    <div className="rounded-lg m-auto w-[80%]">
      <h1 className="text-xl font-semibold">Modules</h1>
      {renderList(moduleList)}
    </div>
  );

  // return (
  //   <div className="rounded-lg m-auto w-[80%]">
  //     <h1 className="text-xl font-semibold">Modules</h1>
  //     <SortableContext
  //       items={moduleList.map((module) => module.mId)}
  //       strategy={verticalListSortingStrategy}
  //     >
  //       {moduleList.map((module) =>
  //         module.type === "module" ? (
  //           <ModuleItem
  //             module={module}
  //             key={module.mId}
  //             open={openMenuId === module.mId}
  //             toggleModal={() => toggleModal(module.mId)}
  //           />
  //         ) : (
  //           <ModuleLinkItem module={module} key={module.mId} />
  //         )
  //       )}
  //     </SortableContext>
  //   </div>
  // );
};

export default ModuleList;
