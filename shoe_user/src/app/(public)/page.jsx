import Banner from "@/components/layouts/banner";
import BannerAnother from "@/components/layouts/bannerAnother";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Slider from "@/components/layouts/slider";
import ProductBrand from "@/components/ProductBrand";
import ProductNew from "@/components/ProductNew";
import Testimonial from "@/components/testimonial";

export default function HomePage() {
  return (
    <>
      <Header/>
      <Slider/>
      <Banner/>
      <ProductBrand/>
      <BannerAnother/>
      <ProductNew/>
      <Testimonial/>
      <div className="newsleter-area"></div>
      <Footer/>
    </>
  )
}
