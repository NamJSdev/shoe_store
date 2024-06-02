'use client'
import homeAPI from '@/app/api/homeAPI';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import { useEffect, useState } from 'react';

const ProductDetail = ({ params }) => {
    const [id, setID] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {
        setID(params.id);
    }, [params.id]);

    useEffect(() => {
        if (id) {
            handleProductDetail(id);
        }
    }, [id]);

    const handleProductDetail = async (id) => {
        try {
            const res = await homeAPI.getProductDetail(id);
            if (res) {
                const data = res.data;
                setData(data);
            } else {
                console.log(`Product detail not found`);
            }
        } catch (error) {
            console.error("Error fetching product detail:", error);
        }
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="Single-product-location home2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="location">
                                <ul>
                                    <li>
                                        <a href="/" title="go to homepage">
                                            Trang chủ<span>/</span>
                                        </a>
                                    </li>
                                    <li>
                                        <strong> {data.name}</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="single-product-details">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="single-product-img tab-content">
                                {data.pictures.map((picture, index) => (
                                    <div
                                        key={index}
                                        className={`single-pro-main-image tab-pane ${index === 0 ? 'active' : ''}`}
                                        id={`pro-large-img-${index + 1}`}
                                    >
                                        <a href="#">
                                            <img
                                                className="optima_zoom"
                                                src={picture}
                                                data-zoom-image={picture}
                                                alt={`Product image ${index + 1}`}
                                            />
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <div className="nav product-page-slider">
                                {data.pictures.map((picture, index) => (
                                    <div key={index} className="single-product-slider">
                                        <a
                                            className={index === 0 ? 'active' : ''}
                                            href={`#pro-large-img-${index + 1}`}
                                            data-bs-toggle="tab"
                                        >
                                            <img src={picture} alt={`Thumbnail ${index + 1}`} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-product-details">
                                <a href="#" className="product-name">
                                    {data.name}
                                </a>
                                <div className="list-product-info">
                                    <div className="price-rating">
                                        <div className="ratings">
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star-half-o" />
                                            <a href="#" className="review">
                                                1 Review(s)
                                            </a>
                                            <a href="#" className="add-review">
                                                Add Your Review
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="avalable">
                                    <p>
                                        Availability:<span> In stock</span>
                                    </p>
                                </div>
                                <div className="item-price">
                                    <span>{data.price} VNĐ</span>
                                </div>
                                <div className="single-product-info">
                                    <p>{data.desc}</p>
                                    <div className="share">
                                        <img src="img/product/share.png" alt="Share" />
                                    </div>
                                </div>
                                <div className="action">
                                    <ul className="add-to-links">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-heart" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-refresh" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-envelope" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="select-catagory">
                                    <div className="color-select">
                                        <label className="required">
                                            <em>*</em> Color
                                        </label>
                                        <div className="input-box">
                                            <select id="select-1">
                                                <option value="">-- Please Select --</option>
                                                {data.colors.map((color) => (
                                                    <option key={color.color_id} value={color.color_code}>
                                                        {color.color_name} ({color.color_code})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="size-select">
                                        <label className="required">
                                            <em>*</em> Size
                                        </label>
                                        <div className="input-box">
                                            <select id="select-2">
                                                <option value="">-- Please Select --</option>
                                                <option value="L">L</option>
                                                <option value="M">M</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-item">
                                    <div className="price-box">
                                        <span>{data.price} VNĐ</span>
                                    </div>
                                    <div className="single-cart">
                                        <div className="cart-plus-minus">
                                            <label>Qty: </label>
                                            <input
                                                className="cart-plus-minus-box"
                                                type="text"
                                                name="qtybutton"
                                                defaultValue={1}
                                            />
                                        </div>
                                        <button className="cart-btn">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetail;
