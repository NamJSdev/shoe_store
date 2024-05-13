import BrandShoesTable from "@/app/(dashboard)/(routes)/shoeConfigs/brandShoes/app.table";
import ColorShoesTable from "@/app/(dashboard)/(routes)/shoeConfigs/colorShoes/app.table";
import MaterialShoesTable from "@/app/(dashboard)/(routes)/shoeConfigs/materialShoes/app.table";
import SizeShoesTable from "@/app/(dashboard)/(routes)/shoeConfigs/sizeShoes/app.table";
import StyleShoesTable from "@/app/(dashboard)/(routes)/shoeConfigs/styleShoe/app.table";
import TypeShoesTable from "@/app/(dashboard)/(routes)/shoeConfigs/typeShoes/app.table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ShoeConfigsTabs() {
  return (
    <Tabs defaultValue="colors" className="w-full">
      <TabsList>
        <TabsTrigger value="colors">Màu Sắc</TabsTrigger>
        <TabsTrigger value="options">Loại Giày</TabsTrigger>
        <TabsTrigger value="materials">Chất Liệu</TabsTrigger>
        <TabsTrigger value="trademarks">Thương Hiệu</TabsTrigger>
        <TabsTrigger value="shoeShapes">Dáng Giày</TabsTrigger>
        <TabsTrigger value="sizes">Size</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full mt-[20px]" value="colors">
        <ColorShoesTable />
      </TabsContent>
      <TabsContent value="options">
        <TypeShoesTable/>
      </TabsContent>
      <TabsContent value="materials">
        <MaterialShoesTable/>
      </TabsContent>
      <TabsContent value="trademarks">
        <BrandShoesTable/>
      </TabsContent>
      <TabsContent value="shoeShapes">
        <StyleShoesTable/>
      </TabsContent>
      <TabsContent value="sizes">
        <SizeShoesTable/>
      </TabsContent>
    </Tabs>
  );
}
