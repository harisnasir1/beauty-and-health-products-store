import React, { useEffect, useState } from "react";
import { All_products, Getall_Categories } from "../Utils/apiroutes";
import CategoryBox from "../Components/CategoryBox";
import axios, { all } from "axios";

const Categories_home = () => {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    axios
      .get(Getall_Categories)
      .then((res) => {
        setcategories(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const scroll_right = () => {
    let slider = document.getElementById("scroller");
    slider.scrollLeft += 500;
  };

  const scroll_left = () => {
    let slider = document.getElementById("scroller");
    slider.scrollLeft -= 500;
  };

  return (
    <div className="bg-blck mt-5 h-[660px] md:h-[430px] w-[100vw] overflow-hidden">
      <div className="bg-blck text-4xl md:text-5xl w-full md:w-[80vw] text-center font-GreatVibes  font-bold mt-7 flex justify-center ml-0 md:ml-44 mr-0 md:mr-4 capitalize  ">
        Categories
      </div>
      <div className=" w-[98%] md:w-full flex justify-center items-center h-full p-2">
       
        <div
          id="scroller"
          className=" w-[60%] md:w-[90%] mb-9 md:mb-1 flex justify-around flex-col-reverse md:flex-row h-[100%] bg-blck  text-base gap-1 mt-5 "
        >
          {categories.map(
            (data, index) =>
              data.Img && !data.Parent && <CategoryBox key={index} {...data} />
          )}
        </div>
       
      </div>
    </div>
  );
};

export default Categories_home;
