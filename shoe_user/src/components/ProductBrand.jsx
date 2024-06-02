'use client'

import homeAPI from '@/app/api/homeAPI';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function ProductBrand() {
    const [newBrand, setNewBrand] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [filterData, setFilterData] = useState({
        priceFrom: "",
        priceTo: "",
        searchValue: "",
        typeId: "",
        materialId: "",
        brandId: "",
        sexId: "",
    });
    const [product, setProduct] = useState([]);
    const chunkArray = (array, size) => {
        const chunked = [];
        for (let i = 0; i < array.length; i += size) {
            chunked.push(array.slice(i, size + i));
        }
        return chunked;
    }
    // const getBrands = async () => {
    //     try {
    //         const res = await homeAPI.getTrademarksConfig();
    //         if (res && Array.isArray(res) && res.length > 0) {
    //             const firstBrandId = res[0].id;
    //             setFilterData(prevState => ({
    //                 ...prevState,
    //                 brandId: firstBrandId
    //             }));
    //             setNewBrand(res);
    //             setCurrentBrandId(firstBrandId); // Set current brand ID to the first brand ID
    //             getProducts();
    //         } else {
    //             console.log('No brands available');
    //         }
    //     } catch (error) {
    //         console.error("Error fetching brands:", error);
    //     }
    // }

    const getProducts = async () => {
        try {
            const res = await homeAPI.getProduct(filterData);
            if (res) {
                const data = res.data;
                setProduct(data);
                const sorted = data.sort((a, b) => a.id - b.id).slice(0, 5);
                setSortedProducts(sorted);
            } else {
                console.log(`shoe modal list option not found`);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);
    console.log(sortedProducts);
    return (
        <>
            <div className="sell-area home2">
                <div className="sell-heading">
                    <h2>Best seller</h2>
                    <p>
                        Top các sản phẩm bán chạy nhất của chúng tôi trong quý 5...
                    </p>
                </div>
                <div className="sell-slider">
                    {sortedProducts.map((prod) => (
                        <div className="single-product">
                            <div className="level-pro-new">
                                <span>best seller</span>
                            </div>
                            <div className="product-img">
                                <a href="single-product.html">
                                    <img src={prod.pictures[0]} className="primary-img" />
                                    <img src={prod.pictures[1]} className="secondary-img" />
                                </a>
                            </div>
                            <div className="actions">
                                <button type="submit" className="cart-btn" title="Add to cart">
                                    add to cart
                                </button>
                            </div>
                            <div className="product-price">
                                <div className="product-name">
                                    <a href="single-product.html" title="Fusce aliquam">
                                        {prod.name}
                                    </a>
                                </div>
                                <div className="price-rating">
                                    <span>{prod.price} VNĐ</span>
                                    <div className="ratings">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star-half-o" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <>
                {/* feature products area start */}
                <div className="features-product home2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="product-title">
                                    <h2>featured products</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="features-home2-slider">
                                {chunkArray(product, 2).map((productPair, colIndex) => (
                                    <div key={colIndex} className="col">
                                        {productPair.map(prod => (
                                            <div className="single-product">
                                                <div className="level-pro-new">
                                                    <span>hot</span>
                                                </div>
                                                <div className="product-img">
                                                    <a href="single-product.html">
                                                        <img
                                                            src={prod.pictures[0]}
                                                            alt=""
                                                            className="primary-img"
                                                        />
                                                        <img
                                                            src={prod.pictures[1]}
                                                            alt=""
                                                            className="secondary-img"
                                                        />
                                                    </a>
                                                </div>
                                                <div className="actions">
                                                    <button type="submit" className="cart-btn" title="Add to cart">
                                                        add to cart
                                                    </button>
                                                </div>
                                                <div className="product-price">
                                                    <div className="product-name">
                                                        <a href="single-product.html" title="Fusce aliquam">
                                                            {prod.name}
                                                        </a>
                                                    </div>
                                                    <div className="price-rating">
                                                        <span>{prod.price}VND</span>
                                                        <div className="ratings">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-half-o" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* feature products area end */}
            </>

        </>
    )
}
