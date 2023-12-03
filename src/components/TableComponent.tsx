import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import TableRowComponent from "./TableRowComponent";
import { Checkbox } from "./ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableComponent = ({
  tableData,
  deleteEntry,
  selectedIds,
  addToSelectedIds,
  removeFromSelectedIds,
  selectPage,
  setSelectPage,
}: {
  tableData: TableData[];
  deleteEntry: (id: string) => void;
  selectedIds: string[];
  addToSelectedIds: (id: string[]) => void;
  removeFromSelectedIds: (id: string) => void;
  selectPage: boolean;
  setSelectPage: Dispatch<SetStateAction<boolean>>;
}) => {
  const [pageIds, setPageIds] = useState<string[]>([]);

  useEffect(() => {
    const ids: string[] = [];
    for (const data of tableData) ids.push(data.id);
    setPageIds(ids);
  }, [tableData]);

  useEffect(() => {
    console.log(selectPage);
    if (selectPage) {
      addToSelectedIds(pageIds);
    }
  }, [selectPage, pageIds]);

  return (
    <Table className="border table-auto lg:table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead>
            {/* <Checkbox
              checked={selectPage}
              onClick={() => {
                setSelectPage((prev) => !prev);
              }}
            /> */}
            {/* Sorry, I could not get the select all to work, so I am not shipping this feature */}
            {""}
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((data) => {
          return (
            <TableRowComponent
              key={data.id}
              data={data}
              deleteEntry={deleteEntry}
              selectedIds={selectedIds}
              addToSelectedIds={addToSelectedIds}
              removeFromSelectedIds={removeFromSelectedIds}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
