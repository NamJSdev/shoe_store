"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import { ArrowUpDown } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  faEye,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@/components/ui/input";
import { ColorOption, ShoeProductsTypes } from "@/app/types/schemas.d";
import shoeModelAPI from "@/apis/shoeModelAPI";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import ReactSelect from "react-select";
import shoeConfigAPI from "@/apis/shoeConfigAPI";
import OptionTypeBase from "react-select";
import MultiImageUpload from "@/components/muti-image-upload";

export function ShoeProductsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState("");

  //State bo loc
  const [filterData, setFilter] = useState({
    priceFrom: "",
    priceTo: "",
    searchValue: "",
    typeId: "",
    materialId: "",
    brandId: "",
    sexId: "",
  });

  // State post data
  const [postData, setPostData] = useState({
    code: "",
    name: "",
    price: "",
    style_id: "",
    desc: "",
    type_id: "",
    brand_id: "",
    material_id: "",
    sex_id: "",
    color_ids: [],
    pictures: [] as File[],
  });

  // Thêm state cho trang hiện tại
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [rowsPerPage] = React.useState<number>(8); // Số lượng hàng mỗi trang
  const [filteredData, setFilteredData] = React.useState<ShoeProductsTypes[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [apiData, setApiData] = React.useState<ShoeProductsTypes[]>([]);

  const [brandOptions, setBrandOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [styleOptions, setStyleOptions] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

  const [pictures, setPictures] = useState<File[]>([]);

  const getData = async () => {
    try {
      const res = await shoeModelAPI.getModel(filterData);
      if (res) {
        const data = res.data;
        setApiData(data);
      } else {
        console.log(`shoe modal list option not found`);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
  };

  // lấy dữ liệu select
  const fetchOptions = async () => {
    try {
      const colors = await shoeConfigAPI.getColorsConfig();
      // const sexes = await shoeConfigAPI.get();

      setColorOptions(colors);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  const handleValueStyleChange = (value: string) => {
    setPostData({ ...postData, style_id: value });
  };
  const handleColorChange = (
    selectedOptions: OptionTypeBase | OptionTypeBase[] | null
  ): void => {
    if (selectedOptions) {
      const colorIds = Array.isArray(selectedOptions)
        ? selectedOptions.map((option: OptionTypeBase) => option.value)
        : [selectedOptions.value];
      setPostData({ ...postData, color_ids: colorIds });
    } else {
      setPostData((prevData) => ({
        ...prevData,
        color_ids: [],
      }));
    }
  };
  const colorData: ColorOption[] = colorOptions
    ? colorOptions.map((option) => ({
        value: option.id.toString(), // Đảm bảo rằng giá trị là chuỗi
        label: option.code,
      }))
    : [];

  //Them du lieu
  const handleAddModel = async () => {
    try {
      await shoeModelAPI.addModel(postData, pictures);
      getData(); // Refresh the color list
      toast.success("Thêm mới thành công!");

      // Reset form sau khi thêm thành công
      setPostData({
        code: "",
        name: "",
        price: "",
        style_id: "",
        desc: "",
        type_id: "",
        brand_id: "",
        material_id: "",
        sex_id: "",
        color_ids: [],
        pictures: [] as File[],
      });
    } catch (error) {
      console.error("Error adding brand:", error);
      toast.error("Thêm mới không thành công");
    }
  };
  //Xoa du lieu
  const handleDeleteData = async (id: number) => {
    // console.log(id)
    try {
      await shoeModelAPI.deleteData([id]);
      getData(); // Refresh list
      toast.success("Xóa thành công!");
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Xóa không thành công");
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  const columns: ColumnDef<ShoeProductsTypes>[] = [
    {
      accessorKey: "pictures",
      header: "Ảnh",
      cell: ({ row }) => {
        const pictures = row.original.pictures; // Lấy mảng pictures từ dữ liệu gốc của hàng
        const firstPicture = pictures ? pictures[0] : ""; // Lấy phần tử thứ nhất trong mảng nếu có
        return (
          <Avatar className="capitalize">
            <AvatarImage className="rounded-none" src={firstPicture} />
          </Avatar>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Mẫu",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "brand",
      header: "Thương Hiệu",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("brand")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Loại",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("code")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Giá Tiền
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase pl-7">{row.getValue("price")} VNĐ</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const data = row.original;
        return (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="mx-3"
                  // onClick={() => setSelectedFoodId(food.monAnID)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
              </DialogTrigger>
              {/* <UpDateFoodModal id={selectedFoodId} reloadData={getAllFoods} /> */}
            </Dialog>
            <Button
              variant="destructive"
              onClick={() => handleDeleteData(data.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    data: apiData,
    columns,
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(event) => {
            // handleSearch(event.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm"
        />
        {/* Thêm dữ liệu */}
        <Drawer>
          <DrawerTrigger className="w-full" asChild>
            <Button
              onClick={() => fetchOptions()}
              className="float-right w-[10%]"
              variant="outline"
            >
              <FontAwesomeIcon className="mr-1 size-4" icon={faPlus} />
              Thêm Mới
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[75%]">
            <div className="mx-auto w-[100%]">
              <DrawerHeader>
                <DrawerTitle className="text-center">Thêm Mẫu</DrawerTitle>
                <DrawerDescription className="text-center">
                  <i>(Không được để trống)</i>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="flex flex-col items-center">
                <form className="w-full flex flex-col items-center">
                  <div className="flex gap-5 justify-center w-full">
                    <div className="flex flex-col w-[35%] gap-5">
                      <Input
                        type="text"
                        placeholder="Code"
                        name="code"
                        value={postData.code}
                        onChange={(e) =>
                          setPostData({ ...postData, code: e.target.value })
                        }
                      />
                      <Input
                        type="text"
                        placeholder="Tên"
                        name="name"
                        value={postData.name}
                        onChange={(e) =>
                          setPostData({ ...postData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-col w-[35%] gap-5">
                      <Select onValueChange={handleValueStyleChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Dáng Giày" />
                        </SelectTrigger>
                        <SelectContent>
                          {styleOptions.map((option) => (
                            // eslint-disable-next-line react/jsx-key
                            <SelectItem value={`${option.id}`}>
                              {option.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <ReactSelect
                        isMulti
                        onChange={handleColorChange}
                        options={colorData}
                        placeholder="Chọn Màu"
                        className="w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <MultiImageUpload
                        pictures={pictures}
                        setPictures={setPictures}
                      />
                      <Input
                        type="text"
                        placeholder="Giá"
                        name="price"
                        value={postData.price}
                        onChange={(e) =>
                          setPostData({ ...postData, price: e.target.value })
                        }
                      />
                      <Input
                        type="text"
                        placeholder="Chú thích"
                        name="desc"
                        value={postData.desc}
                        onChange={(e) =>
                          setPostData({ ...postData, desc: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleAddModel}
                    type="button"
                    className="w-[25%] mt-5"
                  >
                    Thêm
                  </Button>
                </form>
                <DrawerClose asChild>
                  <Button className="w-[25%]" variant="outline">
                    Thoát
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
        {/* End */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="ml-4">
              <Link href="/#">Bộ Lọc</Link>
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                {isLoading ? (
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  </TableCell>
                ) : (
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không Tìm Thấy Thông Tin.
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trang Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(apiData.length / rowsPerPage))
              )
            }
            disabled={currentPage === Math.ceil(apiData.length / rowsPerPage)}
          >
            Trang Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
