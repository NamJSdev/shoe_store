// pages/product/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import homeAPI from '@/app/api/homeAPI';

const ProductDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             const res = await homeAPI.getProductDetail(id);
    //             if (res) {
    //                 setProduct(res.data);
    //             } else {
    //                 console.log('Product not found');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching product:', error);
    //         }
    //     };
        
    //     if (id) {
    //         fetchProduct();
    //     }
    // }, [id]);

    // if (!product) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            {/* <h1>{product.name}</h1>
            <img src={product.pictures[0]} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p> */}
            hi
            {/* Add more product details here */}
        </div>
    );
};

export default ProductDetail;
