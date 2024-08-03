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
    <div className="bg-blck mt-5 h-[430px] w-[100vw] overflow-hidden">
      <div className=" mr-32  text-center text-3xl md:text-4xl font-bold mt-5 flex justify-center ml-10 md:ml-44 capitalize ">
        Categories
      </div>
      <div className=" w-[98%] md:w-full flex justify-center items-center h-full p-2">
       
        <div
          id="scroller"
          className="w-[90%] grid grid-cols-2 justify-center h-[100%] bg-blck overflow-x-auto text-base gap-2 mt-5 no-scrollbar   scroll-smooth"
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
