import {
  ArrowLeft,
  ArrowRight,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const Pagination = ({
  currentPage,
  setCurrentPage,
  data,
  setSelectPage,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  data: TableData[];
  setSelectPage: Dispatch<SetStateAction<boolean>>;
}) => {
  const moveToNextPage = () => {
    if (currentPage < Math.ceil(data.length / 10)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const moveToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex gap-1">
      <Button
        variant="outline"
        onClick={() => {
          setCurrentPage(1);
        }}
        disabled={currentPage === 1}
      >
        <ChevronFirst className="w-3.5 h-3.5" />
      </Button>
      <Button
        variant="outline"
        onClick={moveToPreviousPage}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </Button>
      <div className="flex">
        {range(1, Math.ceil(data.length / 10)).map((num) => (
          <Button
            key={num}
            variant={currentPage === num ? "default" : "ghost"}
            className="text-xs md:text-sm w-1"
            onClick={() => {
              setCurrentPage(num);
            }}
          >
            {num}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        onClick={moveToNextPage}
        disabled={currentPage == Math.ceil(data.length / 10)}
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setCurrentPage(Math.ceil(data.length / 10));
        }}
        disabled={currentPage == Math.ceil(data.length / 10)}
      >
        <ChevronLast className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
};

export default Pagination;
