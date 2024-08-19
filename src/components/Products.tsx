import React, { useMemo } from 'react'
import { useProductData } from '../hooks/useProductData';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Card, Container, ListGroup } from 'react-bootstrap';
import { addToCart, calculateTotals } from '../features/cartListSlice'
import '../App.css'
import NavBar from './NavBar';
import NavBarHome from './NavBarHome';

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


const Products: React.FC= () => {
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
      <NavBarHome />
      <div className="container-sm container-md" >
        <div className="row">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <Card style={{width: '19rem'}}>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    {product.description}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Category: {product.category}</ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>Rating: {product.rating.rate}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </Card.Body>
              </Card>
            </div>
          ))}

        </div>


      </div>
    </>


  )



}

export default React.memo(Products)