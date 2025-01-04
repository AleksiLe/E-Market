"use client"
import ProductCard from '../../components/productCard.jsx';
import { useEffect, useState } from 'react';
import getProducts from '../../services/getProducts.js';

export default function ProductWindow(props) {
    
    const [products, setProducts] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (isMounted) {
            return;
        } else {
            getProducts().then(setProducts);
            setIsMounted(true);
        }
    }, [isMounted]);
        
    return (
        <div className='flex flex-wrap'>
            {products && products.map((product) => (
                <ProductCard key={product._id} name={product.name} description={product.description} />
            ))}
        </div>
    );
}