"use client";
import ParallaxSection from '../../components/ParallaxSection'; 
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import NewsSlider from "../../components/NewsSlider";

export default function EnPage() {
  return (
    <div className="relative">
      <Header />
      <Banner />
      <NewsSlider />
      <ParallaxSection />
    </div>
  );
}
