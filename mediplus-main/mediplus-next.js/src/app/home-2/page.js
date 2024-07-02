import HeaderTwo from "@/components/Header/HeaderTwo";
import Hero from "../Home/Hero";
import Features from "../Home/Features";
import Funfact from "../Home/Funfact";
import WhyChoose from "../Home/WhyChoose";
import CallAction from "../Home/CallAction";
import Portfolio from "../Home/Portfolio";
import Services from "../Home/Services";
import Testimonial from "../Home/Testimonials";
import Departments from "../Home/Departments";
import Pricing from "../Home/Pricing";
import Team from "../Home/Team";
import Blog from "../Home/Blog";
import Clients from "../Home/Clients";
import Appoinment from "../Home/Appoinment";

export default function HomeTwo() {
  return (
    <>
      <HeaderTwo />
      <Hero sectionName="slider index2" />
      <Features sectionName="Feautes index2 section" />
      <Funfact />
      <WhyChoose />
      <CallAction />
      <Portfolio />
      <Services />
      <Testimonial />
      <Departments />
      <Pricing />
      <Team />
      <Blog />
      <Clients />
      <Appoinment />
    </>
  );
}
