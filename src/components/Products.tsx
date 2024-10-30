import React, { useMemo } from 'react'
import { useProductData } from '../hooks/useProductData';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addToCart, calculateTotals } from '../features/cartListSlice'
import NavBar from './NavBar';
import { Card, CardBody, CardFooter } from '@material-tailwind/react';

interface Product {
  id: number,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string,
  rating: {
    rate: number,
    count: number
  }
}


const Products: React.FC = () => {
  const { products: initialProducts } = useProductData();
  const queryClient = useQueryClient();

  const searchProducts = queryClient.getQueryData<Product[]>(['productSearch']);
  const products = useMemo(() => searchProducts || initialProducts, [searchProducts, initialProducts]);

  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    dispatch(calculateTotals());
    console.log(product);
    alert(`${product.title} added to cart`)

  }

  return (


    <>
      {/* <NavBar /> */}
      <NavBar />
      <div className="flex flex-wrap gap-4 p-10 ml-16 text-black" >
        {products.map((product, index) => (
          <div key={index}>
            <Card className='w-[300px] shadow-2xl' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <CardBody className='w-[300px] h-[420px]' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <img src={product.image} alt={product.title} className="w-[250px] h-64" />
                <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              </CardBody>
              <CardFooter className='flex ' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <button className="bg-black mt-auto text-white px-4 py-2 rounded-2xl" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
                <p className="text-gray-600 mt-1 ml-auto">${product.price}</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </>


  )



}

export default React.memo(Products)