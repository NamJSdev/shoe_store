"use client";
import shoeConfigAPI from "@/app/api/shoeConfigAPI";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { ShoeConfigsTypes } from "@/app/types/schemas.d";
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
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function StyleShoesTable() {
  const [dataAPI, setData] = React.useState<ShoeConfigsTypes[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(5);
  const [newData, setNewData] = React.useState<{ code: string; desc: string }>({
    code: "",
    desc: "",
  });
  const [sampleData, setSampleData] = React.useState<{
    id: number;
    code: string;
    desc: string;
  }>({ id: 0, code: "", desc: "" }); // State để lưu trữ dữ liệu mẫu
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(
    null
  ); // State để lưu trữ id của hàng đang được chọn

  const getData = async () => {
    const res = await shoeConfigAPI.getStylesConfig();
    console.log(res);
    if (res) {
      setData(res);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  //Phan trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataAPI.slice(indexOfFirstItem, indexOfLastItem);
  const calculateStartIndex = (currentPage: number, itemsPerPage: number) => {
    return (currentPage - 1) * itemsPerPage + 1;
  };
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1); // Reset currentPage when dataAPI changes
  }, [dataAPI]);

  //Them moi
  const handleAddDataConfig = async () => {
    try {
      // Kiểm tra dữ liệu trống trước khi thêm mới
      if (!newData.code || !newData.desc) {
        toast.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      await shoeConfigAPI.addShoesStyle(newData);
      getData(); // Refresh the color list
      toast.success("Thêm mới thành công!");

      // Reset form sau khi thêm thành công
      setNewData({ code: "", desc: "" });
    } catch (error) {
      console.error("Error adding brand:", error);
      toast.error("Thêm mới không thành công");
    }
  };

  //setup dữ liệu input post thay doi
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Xoa du lieu
  const handleDeleteData = async (id: number) => {
    try {
      await shoeConfigAPI.deleteDataConfig([id]);
      // Sau khi xóa thành công, cập nhật lại danh sách màu sắc
      getData(); // Refresh the color list
      toast.success("Xóa thành công!");
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error("Xóa không thành công");
    }
  };

  // Thiết lập dữ liệu mẫu cho input dựa vào id
  useEffect(() => {
    if (selectedItemId !== null) {
      const selectedItem = dataAPI.find((item) => item.id === selectedItemId);
      if (selectedItem) {
        setSampleData({
          id: selectedItem.id,
          code: selectedItem.code,
          desc: selectedItem.desc,
        });
      }
    }
  }, [selectedItemId, dataAPI]);

  //Sua du lieu
  const handleEditData = async () => {
    try {
      if (sampleData) {
        // Gửi yêu cầu cập nhật dữ liệu lên server
        await shoeConfigAPI.updateDataConfig(sampleData);
        // Sau khi cập nhật thành công, cập nhật lại danh sách màu sắc
        getData();
        toast.success("Cập nhật thành công!");
      }
    } catch (error) {
      console.error("Error updating:", error);
      toast.error("Cập nhật không thành công");
    }
  };
  return (
    <div>
      {/* Thêm dữ liệu */}
      <Drawer>
        <DrawerTrigger className="w-full" asChild>
          <Button className="float-right w-[10%]" variant="outline">
            <FontAwesomeIcon className="mr-1 size-4" icon={faPlus} />
            Thêm Mới
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[65%]">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="text-center">Thêm Mới</DrawerTitle>
              <DrawerDescription className="text-center">
                <i>(Không được để trống)</i>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <form>
                <Input
                  type="text"
                  placeholder="CODE"
                  name="code"
                  value={newData.code}
                  onChange={handleInputChange}
                />
                <Input
                  className="mt-6 mb-6"
                  type="text"
                  placeholder="Chú Thích"
                  name="desc"
                  value={newData.desc}
                  onChange={handleInputChange}
                />
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleAddDataConfig}
                >
                  Thêm
                </Button>
              </form>
              <DrawerClose asChild>
                <Button variant="outline">Thoát</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      {/* End */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">STT</TableHead>
            <TableHead>CODE</TableHead>
            <TableHead>Chú Thích</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {calculateStartIndex(currentPage, itemsPerPage) + index}
              </TableCell>
              <TableCell>{data.code}</TableCell>
              <TableCell>{data.desc}</TableCell>
              <TableCell className="text-right">
                {/* Sửa dữ liệu */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      className="mx-3"
                      onClick={() => setSelectedItemId(data.id)} // Lưu id của hàng được chọn khi nhấp vào nút sửa
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Chỉnh Sửa</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="code" className="text-right">
                          Code
                        </Label>
                        {/* Sử dụng sampleData để đặt giá trị mặc định cho input */}
                        <Input
                          id="code"
                          className="col-span-3"
                          placeholder="Code"
                          value={sampleData ? sampleData.code : ""}
                          onChange={(e) =>
                            setSampleData((prevState) => ({
                              ...prevState,
                              code: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                          Chú thích
                        </Label>
                        {/* Sử dụng sampleData để đặt giá trị mặc định cho input */}
                        <Input
                          id="desc"
                          className="col-span-3"
                          placeholder="Chú thích"
                          value={sampleData ? sampleData.desc : ""}
                          onChange={(e) =>
                            setSampleData((prevState) => ({
                              ...prevState,
                              desc: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleEditData}>
                        Lưu
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {/* End edit */}
                {/* Button delete */}
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteData(data.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                {/* End Delete */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <ul className="flex space-x-2">
          {Array.from(
            { length: Math.ceil(dataAPI.length / itemsPerPage) },
            (_, i) => (
              <li key={i}>
                <button
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
