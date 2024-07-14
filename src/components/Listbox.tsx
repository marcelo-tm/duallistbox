import { useMemo } from "react";
import { cn } from "../utils/utils";

export type ListItem = {
  id: number;
  label: string;
};

type ListboxProps = {
  title: string;
  list: ListItem[];
  selectedList: ListItem[];
  onSelect: (item: ListItem) => void;
  removingList: ListItem[];
};

export const Listbox = ({
  title,
  list,
  selectedList,
  onSelect,
  removingList,
}: ListboxProps) => {
  const selectedIds = useMemo(
    () => selectedList.map((item) => item.id),
    [selectedList]
  );
  const removingIds = useMemo(
    () => removingList.map((item) => item.id),
    [removingList]
  );

  return (
    <div className="w-1/2 p-4 border rounded-md">
      <h2 className="text-xl mb-4">{title}</h2>
      <ul>
        {list.map((item) => (
          <li
            key={item.id}
            className={cn("mb-2 p-2 bg-gray-200 rounded-md cursor-pointer", {
              "bg-blue-500": selectedIds.includes(item.id),
              "animate-fade-out": removingIds.includes(item.id),
              "animate-fade-in": !removingIds.includes(item.id),
            })}
            onClick={() => onSelect(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
