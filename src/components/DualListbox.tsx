import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Listbox, ListItem } from "./Listbox";
import { useCallback, useState } from "react";

const initalLeftList = [
  { id: 1, label: "Item 1" },
  { id: 2, label: "Item 2" },
  { id: 3, label: "Item 3" },
];
const initalRightList = [
  { id: 4, label: "Item 4" },
  { id: 5, label: "Item 5" },
  { id: 6, label: "Item 6" },
];

export const DualListbox = () => {
  const [leftSelected, setLeftSelected] = useState<ListItem[]>([]);
  const [rightSelected, setrightSelected] = useState<ListItem[]>([]);
  const [leftList, setLeftList] = useState(initalLeftList);
  const [rightList, setRightList] = useState(initalRightList);
  const [removingItems, setRemovingItems] = useState<ListItem[]>([]);

  const onSelectItems = (
    item: ListItem,
    list: ListItem[],
    setList: (list: ListItem[]) => void
  ) => {
    list.some((i) => i.id === item.id)
      ? setList(list.filter((i) => i.id !== item.id))
      : setList([...list, item]);
  };

  const handleMoveItems = useCallback(
    (
      moveType: string,
      list: ListItem[],
      fromList: ListItem[],
      toList: ListItem[],
      setFromList: (list: ListItem[]) => void,
      setToList: (list: ListItem[]) => void
    ) => {
      setRemovingItems(moveType === "selected" ? list : fromList);
      setTimeout(() => {
        if (moveType === "selected") {
          const filterIds = list.map((item) => item.id);
          setFromList(fromList.filter((item) => !filterIds.includes(item.id)));
          setToList([...toList, ...list]);
        } else {
          setFromList([]);
          setToList([...toList, ...fromList]);
        }
        setLeftSelected([]);
        setrightSelected([]);
        setRemovingItems([]);
      }, 200);
    },
    []
  );

  const handleMoveSelectedLeftToRight = useCallback(
    () =>
      handleMoveItems(
        "selected",
        leftSelected,
        leftList,
        rightList,
        setLeftList,
        setRightList
      ),
    [handleMoveItems, leftSelected, leftList, rightList]
  );

  const handleMoveAllLeftToRight = useCallback(
    () =>
      handleMoveItems(
        "all",
        leftSelected,
        leftList,
        rightList,
        setLeftList,
        setRightList
      ),
    [handleMoveItems, leftSelected, leftList, rightList]
  );

  const handleMoveSelectedRightToLeft = useCallback(
    () =>
      handleMoveItems(
        "selected",
        rightSelected,
        rightList,
        leftList,
        setRightList,
        setLeftList
      ),
    [handleMoveItems, rightSelected, rightList, leftList]
  );

  const handleMoveAllRightToLeft = useCallback(
    () =>
      handleMoveItems(
        "all",
        rightSelected,
        rightList,
        leftList,
        setRightList,
        setLeftList
      ),
    [handleMoveItems, rightSelected, rightList, leftList]
  );

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-1/2 flex gap-3">
        <Listbox
          title="Left list"
          list={leftList}
          selectedList={leftSelected}
          onSelect={(item: ListItem) =>
            onSelectItems(item, leftSelected, setLeftSelected)
          }
          removingList={removingItems}
        />

        <div className="flex flex-col gap-6 justify-center">
          <button onClick={handleMoveSelectedLeftToRight}>
            <ChevronRight />
          </button>
          <button onClick={handleMoveAllLeftToRight}>
            <ChevronsRight />
          </button>
          <button onClick={handleMoveSelectedRightToLeft}>
            <ChevronLeft />
          </button>
          <button onClick={handleMoveAllRightToLeft}>
            <ChevronsLeft />
          </button>
        </div>

        <Listbox
          title="Right list"
          list={rightList}
          selectedList={rightSelected}
          onSelect={(item: ListItem) =>
            onSelectItems(item, rightSelected, setrightSelected)
          }
          removingList={removingItems}
        />
      </div>
    </div>
  );
};
