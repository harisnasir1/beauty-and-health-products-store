import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Header from '../Components/Header';
import { All_products, Getall_Categories } from '../Utils/apiroutes';
import ProductBox from '../Components/ProductBox';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Categories_products = () => {
    const [products, setProducts] = useState([]);
    const [fProducts, setFProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [parentCat, setParentCat] = useState("All");
    const [childCat, setChildCat] = useState("");
    const [toggle, setToggle] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setParentCat("All");
        axios.get(All_products)
            .then(res => {
                setProducts(res.data.allproducts);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(Getall_Categories)
            .then(res => {
                setCategories(res.data.result);
                getSubcategories();
                filterProducts();
            })
            .catch(error => {
                console.log(error);
            });
    }, [products]);

    const handleChildCat = (e) => {
        setChildCat(e.target.value);
        filterProducts(e.target.value);
    };

    const parentName = useCallback((startCat) => {
        let result = [];
        let currentCategory = categories.find(cat => cat?._id === startCat);
        result.push(currentCategory?.Catergoy_name);

        while (currentCategory && currentCategory?.parent?._id) {
            currentCategory = categories.find(cat => cat?._id === currentCategory.parent?._id);
            if (currentCategory?.Catergoy_name) {
                result.push(currentCategory?.Catergoy_name);
            }
        }

        return result;
    }, [categories]);

    const getAllChildren = useCallback((parentId) => {
        const getChildrenRecursive = (id) => {
            const directChildren = categories.filter(cat => cat.parent && cat.parent?._id.toString() === id.toString());
            return directChildren.flatMap(child => [child, ...getChildrenRecursive(child?._id)]);
        };

        return getChildrenRecursive(parentId);
    }, [categories]);

    const filterProducts = useCallback((child = "") => {
        if (id.length > 0 || child.length > 0) {
            const filter = products.filter((pro) => {
                const allParents = parentName(pro.Category?._id);
                return childCat.length > 0
                    ? pro.Category?.Catergoy_name === child || allParents.includes(child)
                    : (id.length > 0 && id !== "All")
                        ? pro.Category?.Catergoy_name === id || allParents.includes(id)
                        : true;
            });
            setFProducts(filter);
        }
    }, [products, id, childCat, parentName]);

    const getSubcategories = useCallback(() => {
        const currentCategory = categories.find(cat => cat?.Catergoy_name === id);
        const all = getAllChildren(currentCategory?._id);
        setSubcategories(all);
    }, [categories, id, getAllChildren]);

    const handleToggle = () => {
        setToggle(prevToggle => !prevToggle);
    };

    return (
        <div className='w-full bg-custom-white h-[100vh]'>
            <Header />
            <div className='ml-3 mt-4 md:mt-3 font-bold text-3xl'>
                <div className='flex p-0 m-0 gap-0 lg:gap-1 xl:gap-3 bg'>
                    <div className='fixed lg:static z-10'>
                        <div className='mt-5 flex justify-start xl:hidden cursor-pointer'>
                            <button className='z-40' onClick={handleToggle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                </svg>
                            </button>
                        </div>
                        {
                          subcategories.length>0?
                          <div className={`${toggle ? '-left-0' : '-left-full'} ease-in-out duration-500 bg-white border-r w-[20] md:w-[100] xl:w-[16vw] h-[80vh] md:h-[86vh] md rounded-xl z-10 fixed xl:static text-xl pl-5`}>
                            <h2 className='pt-10 text-xl'>Sub Categories</h2>
                            <div className='w-full h-[30%] overflow-auto pr-9'>
                                <div className='h-full flex flex-col justify-start mt-6 gap-6 text-center'>
                                    {subcategories.map((cat) =>
                                        cat.parent && (
                                            <div key={cat._id} className='grid grid-cols-category gap-3 p-0 m-0'>
                                                <div className='flex justify-end'>
                                                    <input type='radio'
                                                        id={`subcategory-${cat?.Catergoy_name}`}
                                                        value={cat?.Catergoy_name}
                                                        checked={childCat === cat?.Catergoy_name}
                                                        onChange={handleChildCat}
                                                    />
                                                </div>
                                                <div className='text-left font-light font-sans'>
                                                    <label htmlFor={`subcategory-${cat?.Catergoy_name}`}>{cat?.Catergoy_name}</label>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>:""}
                        
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-9 md:mr-20 text-base z-0 ml-14 md:ml-0 gap-12 mt-5 pb-3 w-[70vw] md:w-[100vw] h-[83vh] overflow-auto no-scrollbar scroll-smooth'>
                        {fProducts.map((data, index) => (
                            <ProductBox key={index} {...data} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categories_products;
