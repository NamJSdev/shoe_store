"use client";
import React, { useEffect, useState } from "react";
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
  faFilter,
  faPenToSquare,
  faPlus,
  faTrash,
  faXmark,
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
import { ColorOption, ShoeModelsTypes } from "@/app/types/schemas.d";
import shoeModelAPI from "@/app/api/shoeModelAPI";
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
import shoeConfigAPI from "@/app/api/shoeConfigAPI";
import OptionTypeBase from "react-select";
import MultiImageUpload from "@/components/muti-image-upload";
import { useAppContext } from "@/app/AppProvider";
import { setSessionToken } from "@/app/api/axiosClient";

export function ShoeModelTable() {
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
  const [filteredData, setFilteredData] = React.useState<ShoeModelsTypes[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [apiData, setApiData] = React.useState<ShoeModelsTypes[]>([]);

  const [brandOptions, setBrandOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [styleOptions, setStyleOptions] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [selectedSexId, setSelectedSexId] = useState(null);
  const [pictures, setPictures] = useState<File[]>([]);

  const { sessionToken } = useAppContext();

  useEffect(() => {
    if (sessionToken) {
      setSessionToken(sessionToken);
    }
  }, [sessionToken]);

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
      const brands = await shoeConfigAPI.getTrademarksConfig();
      const types = await shoeConfigAPI.getTypesConfig();
      const styles = await shoeConfigAPI.getStylesConfig();
      const materials = await shoeConfigAPI.getMaterialsConfig();
      const colors = await shoeConfigAPI.getColorsConfig();
      // const sexes = await shoeConfigAPI.get();

      setBrandOptions(brands);
      setTypeOptions(types);
      setStyleOptions(styles);
      setMaterialOptions(materials);
      setColorOptions(colors);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  const handleValueStyleChange = (value: string) => {
    setPostData({ ...postData, style_id: value });
  };
  const handleValueMaterialChange = (value: string) => {
    setPostData({ ...postData, material_id: value });
    setFilter({ ...filterData, materialId: value });
  };
  const handleValueTypeChange = (value: string) => {
    setPostData({ ...postData, type_id: value });
    setFilter({ ...filterData, typeId: value });
  };
  const handleValueBrandChange = (value: string) => {
    setPostData({ ...postData, brand_id: value });
    setFilter({ ...filterData, brandId: value });
  };
  const handleValueSexChange = (value: string) => {
    setPostData({ ...postData, sex_id: value });
    setFilter({ ...filterData, sexId: value });
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

  // Tìm kiếm dữ liệu
  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    setFilter((prevState) => ({
      ...prevState,
      searchValue: value,
    }));
    getData();
  };
  // Xóa bộ lọc dữ liệu
  const clearFilter = () => {
    setFilter({
      priceFrom: "",
      priceTo: "",
      searchValue: "",
      typeId: "",
      materialId: "",
      brandId: "",
      sexId: "",
    });
    getData();
  };
  React.useEffect(() => {
    getData();
  }, []);

  const columns: ColumnDef<ShoeModelsTypes>[] = [
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
              {/* Sửa dữ liệu */}
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    // onClick={() => fetchOptions()}
                    className="mx-3"
                    variant="secondary"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[75%]">
                  <div className="mx-auto w-[100%]">
                    <DrawerHeader>
                      <DrawerTitle className="text-center">Sửa Dữ Liệu</DrawerTitle>
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
                              value={data.code}
                              onChange={(e) =>
                                setPostData({ ...postData, code: e.target.value })
                              }
                            />
                            <Input
                              type="text"
                              placeholder="Tên"
                              name="name"
                              value={data.name}
                              onChange={(e) =>
                                setPostData({ ...postData, name: e.target.value })
                              }
                            />

                            <Select onValueChange={handleValueSexChange} defaultValue={data.sex}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Giới Tính" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">Nam</SelectItem>
                                <SelectItem value="2">Nữ</SelectItem>
                                <SelectItem value="3">Tất Cả</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select onValueChange={handleValueMaterialChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chất Liệu" />
                              </SelectTrigger>
                              <SelectContent>
                                {materialOptions.map((option) => (
                                  // eslint-disable-next-line react/jsx-key
                                  <SelectItem value={`${option.id}`}>
                                    {option.code}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                            <Select onValueChange={handleValueTypeChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Loại Giày" />
                              </SelectTrigger>
                              <SelectContent>
                                {typeOptions.map((option) => (
                                  // eslint-disable-next-line react/jsx-key
                                  <SelectItem value={`${option.id}`}>
                                    {option.code}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select onValueChange={handleValueBrandChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Thương Hiệu" />
                              </SelectTrigger>
                              <SelectContent>
                                {brandOptions.map((option) => (
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
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(event) => {
            handleSearch(event.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm"
        />
        {/* Thêm dữ liệu */}
        <Drawer>
          <DrawerTrigger className="w-full" asChild>
            <Button
              onClick={() => fetchOptions()}
              className="float-right w-[10%] ml-3"
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

                      <Select onValueChange={handleValueSexChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Giới Tính" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Nam</SelectItem>
                          <SelectItem value="2">Nữ</SelectItem>
                          <SelectItem value="3">Tất Cả</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select onValueChange={handleValueMaterialChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chất Liệu" />
                        </SelectTrigger>
                        <SelectContent>
                          {materialOptions.map((option) => (
                            // eslint-disable-next-line react/jsx-key
                            <SelectItem value={`${option.id}`}>
                              {option.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={handleValueTypeChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Loại Giày" />
                        </SelectTrigger>
                        <SelectContent>
                          {typeOptions.map((option) => (
                            // eslint-disable-next-line react/jsx-key
                            <SelectItem value={`${option.id}`}>
                              {option.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select onValueChange={handleValueBrandChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Thương Hiệu" />
                        </SelectTrigger>
                        <SelectContent>
                          {brandOptions.map((option) => (
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
        {/* Bộ Lọc */}
        <Drawer>
          <DrawerTrigger className="w-full" asChild>
            <Button
              onClick={() => fetchOptions()}
              className="float-right w-[10%] ml-3"
              variant="outline"
            >
              <FontAwesomeIcon className="mr-1 size-4" icon={faFilter} />
              Bộ Lọc
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[75%]">
            <div className="mx-auto w-[100%]">
              <DrawerHeader>
                <DrawerTitle className="text-center">Lọc Dữ Liệu</DrawerTitle>
                <DrawerDescription className="text-center">
                  <i>(Không được để trống)</i>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="flex flex-col items-center">
                <form className="w-full flex flex-col items-center">
                  <div className="flex gap-5 justify-center w-full">
                    <div className="flex flex-col w-[45%] gap-5">
                      <Select onValueChange={handleValueMaterialChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chất Liệu" />
                        </SelectTrigger>
                        <SelectContent>
                          {materialOptions.map((option) => (
                            // eslint-disable-next-line react/jsx-key
                            <SelectItem value={`${option.id}`}>
                              {option.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select onValueChange={handleValueTypeChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Loại Giày" />
                        </SelectTrigger>
                        <SelectContent>
                          {typeOptions.map((option) => (
                            // eslint-disable-next-line react/jsx-key
                            <SelectItem value={`${option.id}`}>
                              {option.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select onValueChange={handleValueBrandChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Thương Hiệu" />
                        </SelectTrigger>
                        <SelectContent>
                          {brandOptions.map((option) => (
                            // eslint-disable-next-line react/jsx-key
                            <SelectItem value={`${option.id}`}>
                              {option.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col w-[45%] gap-5">
                      <label className="text-center">
                        <i>_Lọc Theo Khoảng Giá_</i>
                      </label>
                      <div className="flex w-[100%] gap-5">
                        <Input
                          type="number"
                          placeholder="Từ"
                          name="priceFrom"
                          value={filterData.priceFrom}
                          onChange={(e) =>
                            setPostData({
                              ...filterData,
                              priceFrom: e.target.value,
                            })
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Đến"
                          name="priceTo"
                          value={filterData.priceTo}
                          onChange={(e) =>
                            setPostData({
                              ...filterData,
                              priceTo: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Select onValueChange={handleValueSexChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Giới Tính" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Nam</SelectItem>
                          <SelectItem value="2">Nữ</SelectItem>
                          <SelectItem value="3">Tất Cả</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    onClick={getData}
                    type="button"
                    className="w-[25%] mt-5"
                  >
                    Lọc
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
        <Button
          onClick={() => clearFilter()}
          className="float-right w-[10%] ml-3"
          variant="outline"
        >
          <FontAwesomeIcon className="mr-1 size-4" icon={faXmark} />
          Xóa Bộ Lọc
        </Button>
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
