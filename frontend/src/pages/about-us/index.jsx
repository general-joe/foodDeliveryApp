import React from "react";
import AboutTable from "../../components/About-Us";
import { members } from "../../assets/assets";

function AboutUs() {
  return (
    <div className="h-full">
      <h1 className="text-5xl text-center py-5 font-bold max-sm:text-2xl">
        About Us
      </h1>
      <AboutTable data={members} />
    </div>
  );
}
export default AboutUs;
