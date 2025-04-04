import HeroBanner from "@/modules/shopping/components/hero-banner";
import HotProducts from "@/modules/shopping/components/hot-products";

export default function Page() {
  return (
    <div className="w-full h-full">
        <HeroBanner />
        <div className="px-10">
          <HotProducts />
        </div>
    </div>
  )
}