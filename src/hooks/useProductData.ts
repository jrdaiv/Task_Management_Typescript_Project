import { useEffect, useState } from 'react'
import axios from 'axios';


export const useProductData = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState<Error | null >(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products', {
                })
                
                setProducts(response.data)
            }catch (error){
                setError(new Error)
                console.log(error)
            }
        }
        
        fetchProducts();
    }, [])



  return {products, error}


}
