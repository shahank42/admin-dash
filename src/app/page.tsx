"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Pagination from "@/components/Pagination";
import TableComponent from "@/components/TableComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

const getPageSlice = (
  data: TableData[],
  pageNumber: number,
  pageSize: number
) => {
  const firstPageIndex = (pageNumber - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  return data.slice(firstPageIndex, lastPageIndex);
};

export default function Home() {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredTableData, setFilteredTableData] = useState<TableData[]>([]);
  const [paginatedTableData, setPaginatedTableData] = useState<TableData[]>([]);
  const [selectPage, setSelectPage] = useState<boolean>(false);

  useEffect(() => {
    if (tableData.length === 0)
      (async () => {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = (await res.json()) as TableData[];
        setTableData(data);
      })();
  });

  useEffect(() => {
    setFilteredTableData(
      searchTerm === ""
        ? tableData
        : tableData.filter((data) => data.name.includes(searchTerm as string))
    );
    console.log(filteredTableData);
  }, [searchTerm, tableData]);

  useEffect(() => {
    setPaginatedTableData(getPageSlice(filteredTableData, currentPage, 10));
    console.log(paginatedTableData);
  }, [filteredTableData, currentPage]);

  const deleteEntry = (id: string) => {
    setTableData((prev) => prev.filter((entry) => entry.id !== id));
  };

  const addToSelectedIds = (ids: string[]) => {
    // if (!selectedIds.includes(id))
    ids.forEach((id) => {
      if (!selectedIds.includes(id)) setSelectedIds([...selectedIds, ...[id]]);
    });

    console.log(selectedIds);
  };

  const removeFromSelectedIds = (id: string) => {
    setSelectedIds((prev) => prev.filter((prevId) => prevId !== id));
  };

  const deleteSelectedEntries = () => {
    for (const id of selectedIds) {
      deleteEntry(id);
      removeFromSelectedIds(id);
    }
  };

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex w-full justify-between py-3">
          <span className="w-96">
            <Input
              placeholder={"Search..."}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </span>
          <Button
            variant="destructive"
            disabled={selectedIds.length === 0}
            onClick={() => {
              deleteSelectedEntries();
            }}
          >
            <Trash />
          </Button>
        </div>
        <TableComponent
          tableData={paginatedTableData}
          deleteEntry={deleteEntry}
          selectedIds={selectedIds}
          addToSelectedIds={addToSelectedIds}
          removeFromSelectedIds={removeFromSelectedIds}
          selectPage={selectPage}
          setSelectPage={setSelectPage}
        />
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between w-full py-3">
          <span className="flex text-foreground/75 items-center">
            {selectedIds.length} of {tableData.length} selected
          </span>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={filteredTableData}
            setSelectPage={setSelectPage}
          />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
