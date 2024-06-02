import Link from "next/link";
import {
    faCartArrowDown,
    faEye,
    faFilter,
    faPenToSquare,
    faPlus,
    faTrash,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Header() {
  return (
    <>
        {/* header area start */}
      <header>
        <div className="top-link">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 offset-lg-3 col-md-9 d-none d-md-block">
                <div className="site-option">
                  <ul>
                    <li className="currency">
                      <a href="#">
                        VNĐ{" "}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="call-support">
                  <p>
                    Hotline: <span> (+84) 977.188.002</span>
                  </p>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 position-relative">
                <div className="dashboard">
                  <div className="account-menu">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa fa-bars" />
                        </a>
                        <ul>
                          <li>
                            <a href="my-account.html">my account</a>
                          </li>
                          <li>
                            <a href="wishlist.html">my wishlist</a>
                          </li>
                          <li>
                            <a href="cart.html">my cart</a>
                          </li>
                          <li>
                            <a href="checkout.html">Checkout</a>
                          </li>
                          <li>
                            <a href="blog.html">Blog</a>
                          </li>
                          <li>
                            <a href="#">Log in</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="cart-menu">
                    <ul>
                      <li>
                        <a href="#">
                        <FontAwesomeIcon width="40%" icon={faCartArrowDown}/> <span>2</span>
                        </a>
                        <div className="cart-info">
                          <ul>
                            <li>
                              <div className="cart-img">
                                <img src="img/cart/1.png" alt="" />
                              </div>
                              <div className="cart-details">
                                <a href="#">Fusce aliquam</a>
                                <p>1 x $174.00</p>
                              </div>
                              <div className="btn-edit" />
                              <div className="btn-remove" />
                            </li>
                            <li>
                              <div className="cart-img">
                                <img src="img/cart/2.png" alt="" />
                              </div>
                              <div className="cart-details">
                                <a href="#">Fusce aliquam</a>
                                <p>1 x $777.00</p>
                              </div>
                              <div className="btn-edit" />
                              <div className="btn-remove" />
                            </li>
                          </ul>
                          <h3>
                            Subtotal: <span> $951.00</span>
                          </h3>
                          <a href="checkout.html" className="checkout">
                            checkout
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainmenu-area product-items">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="logo">
                  <a href="index.html">
                    <img className="img-fluid" src="img/logo.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="mainmenu">
                  <nav>
                    <ul>
                      <li>
                        <Link href="/">Trang Chủ</Link>
                      </li>
                      <li className="mega-women">
                        <a href="shop.html">Women</a>
                        <div className="mega-menu women">
                          <div className="part-1">
                            <span>
                              <a href="#">Dresses</a>
                              <a href="#">Cocktail</a>
                              <a href="#">Day</a>
                              <a href="#">Evening</a>
                              <a href="#">Sports</a>
                            </span>
                            <span>
                              <a href="#">shoes</a>
                              <a href="#">Sports</a>
                              <a href="#">run</a>
                              <a href="#">sandals</a>
                              <a href="#">Books</a>
                            </span>
                            <span>
                              <a href="#">Handbags</a>
                              <a href="#">Blazers</a>
                              <a href="#">table</a>
                              <a href="#">coats</a>
                              <a href="#">kids</a>
                            </span>
                            <span>
                              <a href="#">Clothing</a>
                              <a href="#">T-shirts</a>
                              <a href="#">coats</a>
                              <a href="#">Jackets</a>
                              <a href="#">jeans</a>
                            </span>
                          </div>
                          <div className="part-2">
                            <a href="#">
                              <img src="img/banner/menu-banner.png" alt="" />
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="mega-men">
                        <a href="shop.html">Men</a>
                        <div className="mega-menu men">
                          <span>
                            <a href="#">Bags</a>
                            <a href="#">Bootees Bags</a>
                            <a href="#">Blazers</a>
                          </span>
                          <span>
                            <a href="#">Clothing</a>
                            <a href="#">coats</a>
                            <a href="#">T-shirts</a>
                          </span>
                          <span>
                            <a href="#">Lingerie</a>
                            <a href="#">Bands</a>
                            <a href="#">Furniture</a>
                          </span>
                        </div>
                      </li>
                      <li className="mega-footwear">
                        <a href="shop.html">Footwear</a>
                        <div className="mega-menu footwear">
                          <span>
                            <a href="#">Footwear Man</a>
                            <a href="#">gifts</a>
                          </span>
                          <span>
                            <a href="#">Footwear Womens</a>
                            <a href="#">boots</a>
                          </span>
                        </div>
                      </li>
                      {/* <li className="mega-jewellery">
                        <a href="shop.html">Jewellery</a>
                        <div className="mega-menu jewellery">
                          <span>
                            <a href="#">Rings</a>
                          </span>
                        </div>
                      </li>
                      <li>
                        <a href="shop.html">accessories</a>
                      </li>
                      <li>
                        <a href="#">Pages</a>
                        <div className="sub-menu pages">
                          <span>
                            <a href="about-us.html">About us</a>
                          </span>
                          <span>
                            <a href="blog.html">Blog</a>
                          </span>
                          <span>
                            <a href="blog-details.html">Blog Details</a>
                          </span>
                          <span>
                            <a href="cart.html">Cart</a>
                          </span>
                          <span>
                            <a href="checkout.html">Checkout</a>
                          </span>
                          <span>
                            <a href="contact.html">Contact</a>
                          </span>
                          <span>
                            <a href="my-account.html">My account</a>
                          </span>
                          <span>
                            <a href="shop.html">Shop</a>
                          </span>
                          <span>
                            <a href="shop-list.html">Shop list</a>
                          </span>
                          <span>
                            <a href="single-product.html">Single Shop</a>
                          </span>
                          <span>
                            <a href="login.html">Login page</a>
                          </span>
                          <span>
                            <a href="register.html">Ragister page</a>
                          </span>
                          <span>
                            <a href="wishlist.html">Wishlist</a>
                          </span>
                        </div>
                      </li> */}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="mobile-menu">
                  <nav>
                    <ul>
                      <li>
                        <a href="index.html">Home</a>
                        <ul>
                          <li>
                            <a href="index.html">Home 1</a>
                          </li>
                          <li>
                            <a href="index-2.html">Home 2</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="shop.html">Women</a>
                        <ul>
                          <li>
                            <a href="#">Dresses</a>
                            <ul>
                              <li>
                                <a href="#">Coctail</a>
                              </li>
                              <li>
                                <a href="#">day</a>
                              </li>
                              <li>
                                <a href="#">evening</a>
                              </li>
                              <li>
                                <a href="#">sports</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#">shoes</a>
                            <ul>
                              <li>
                                <a href="#">Sports</a>
                              </li>
                              <li>
                                <a href="#">run</a>
                              </li>
                              <li>
                                <a href="#">sandals</a>
                              </li>
                              <li>
                                <a href="#">boots</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#">handbags</a>
                            <ul>
                              <li>
                                <a href="#">Blazers</a>
                              </li>
                              <li>
                                <a href="#">table</a>
                              </li>
                              <li>
                                <a href="#">coats</a>
                              </li>
                              <li>
                                <a href="#">kids</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#">clothing</a>
                            <ul>
                              <li>
                                <a href="#">T-shirts</a>
                              </li>
                              <li>
                                <a href="#">coats</a>
                              </li>
                              <li>
                                <a href="#">Jackets</a>
                              </li>
                              <li>
                                <a href="#">jeans</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="shop.html">Men</a>
                        <ul>
                          <li>
                            <a href="#">Bags</a>
                            <ul>
                              <li>
                                <a href="#">Bootees bag</a>
                              </li>
                              <li>
                                <a href="#">Blazers</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#">clothing</a>
                            <ul>
                              <li>
                                <a href="#">coats</a>
                              </li>
                              <li>
                                <a href="#">T-shirts</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#">Lingerie</a>
                            <ul>
                              <li>
                                <a href="#">Bands</a>
                              </li>
                              <li>
                                <a href="#">Furniture</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="shop.html">Foorwear</a>
                        <ul>
                          <li>
                            <a href="#">footwear men</a>
                            <ul>
                              <li>
                                <a href="#">gifts</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#">footwear women</a>
                            <ul>
                              <li>
                                <a href="#">boots</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="shop.html">Jewellery</a>
                        <ul>
                          <li>
                            <a href="#">Rings</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="shop.html">Accessories</a>
                      </li>
                      <li>
                        <a href="#">Pages</a>
                        <ul>
                          <li>
                            <a href="about-us.html">About us</a>
                          </li>
                          <li>
                            <a href="blog.html">Blog</a>
                          </li>
                          <li>
                            <a href="blog-details.html">Blog Details</a>
                          </li>
                          <li>
                            <a href="cart.html">Cart</a>
                          </li>
                          <li>
                            <a href="checkout.html">Checkout</a>
                          </li>
                          <li>
                            <a href="contact.html">Contact</a>
                          </li>
                          <li>
                            <a href="my-account.html">My account</a>
                          </li>
                          <li>
                            <a href="shop.html">Shop</a>
                          </li>
                          <li>
                            <a href="shop-list.html">Shop list</a>
                          </li>
                          <li>
                            <a href="single-product.html">Single Shop</a>
                          </li>
                          <li>
                            <a href="wishlist.html">Wishlist</a>
                          </li>
                          <li>
                            <a href="login.html">login page</a>
                          </li>
                          <li>
                            <a href="register.html">register page</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* header area end */}
    </>
  )
}
