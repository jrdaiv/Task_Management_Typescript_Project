import { useEffect, useState } from 'react'
import axios from 'axios';


export const useProductData = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products', {
                })
                
                setProducts(response.data)
            }catch (error){
                setError(error.message)
            }
        }
        
        fetchProducts();
    }, [])



  return {products, error}


}
