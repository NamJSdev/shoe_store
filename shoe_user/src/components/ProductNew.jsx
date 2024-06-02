'use client'

import homeAPI from '@/app/api/homeAPI';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function ProductNew() {
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
    const getProducts = async () => {
        try {
            const res = await homeAPI.getProduct(filterData);
            if (res) {
                const data = res.data;
                setProduct(data);
                const sorted = data.sort((a, b) => b.id - a.id).slice(0, 10);
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
    return (
        <>
            {/* new products area start */}
            <div className="new-products-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>NEW PRODUCTS</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="new-product-slider carousel-margin">
                            {sortedProducts.map((prod) => (
                                <div className="col">
                                    <div className="single-product">
                                        <div className="level-pro-new">
                                            <span>new</span>
                                        </div>
                                        <div className="product-img">
                                            <a href={`/product/${prod.id}`}>
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
                                        <div className="product-name">
                                            <a href={`/product/${prod.id}`} title="Fusce aliquam">
                                            {prod.name}
                                            </a>
                                        </div>
                                        <div className="price-rating">
                                            <span className="old-price">1.000.000VNĐ</span>
                                            <span>{prod.price}VNĐ</span>
                                            <div className="ratings">
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star-half-o" />
                                            </div>
                                        </div>
                                        <div className="actions">
                                            <button type="submit" className="cart-btn" title="Add to cart">
                                                add to cart
                                            </button>
                                            <ul className="add-to-link">
                                                <li>
                                                    <a
                                                        className="modal-view"
                                                        data-target="#productModal"
                                                        data-bs-toggle="modal"
                                                        href="#"
                                                    >
                                                        <i className="fa fa-search" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        {" "}
                                                        <i className="fa fa-heart-o" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        {" "}
                                                        <i className="fa fa-refresh" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* new products area end */}
        </>
    )
}
