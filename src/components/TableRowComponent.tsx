import { Pencil, Trash, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";

const TableRowComponent = ({
  data,
  deleteEntry,
  selectedIds,
  addToSelectedIds,
  removeFromSelectedIds,
}: {
  data: TableData;
  deleteEntry: (id: string) => void;
  selectedIds: string[];
  addToSelectedIds: (id: string[]) => void;
  removeFromSelectedIds: (id: string) => void;
}) => {
  const [selected, setSelected] = useState<boolean>(
    selectedIds.includes(data.id)
  );
  const [toEditRow, setToEditRow] = useState<boolean>(false);

  const [name, setName] = useState<string>(data.name);
  const [email, setEmail] = useState<string>(data.email);
  const [role, setRole] = useState<string>(data.role);

  useEffect(() => {
    selected ? addToSelectedIds([data.id]) : removeFromSelectedIds(data.id);
  }, [selected]);

  return (
    <TableRow
      className={cn("", {
        "bg-foreground/10 hover:bg-foreground/10": selected,
      })}
    >
      <TableCell>
        <Checkbox
          checked={selected}
          onClick={() => {
            setSelected((prev) => !prev);
          }}
        />
      </TableCell>
      <TableCell>
        {!toEditRow ? (
          <span>{name}</span>
        ) : (
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {!toEditRow ? (
          <span>{email}</span>
        ) : (
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {!toEditRow ? (
          <span>{role}</span>
        ) : (
          <Input
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          />
        )}
      </TableCell>
      <TableCell>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setToEditRow((prev) => !prev);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              deleteEntry(data.id);
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
