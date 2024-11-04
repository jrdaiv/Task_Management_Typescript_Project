import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, calculateTotals } from '../features/cartListSlice';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { Card, CardBody, CardFooter } from '@material-tailwind/react';

interface CartItem {
  id: number,
  title: string,
  price: number,
  image: string,
  quantity: number,
  category: string
}
interface State {
  cart: {
    items: CartItem[],
    totalAmount: number
  }
}

const ShoppingCart: React.FC = () => {
  const cartItems = useSelector((state: State) => state.cart.items);
  const totalAmount = useSelector((state: State) => state.cart.totalAmount);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch])


  return (
    <>
      <NavBar />
      <div className='cart-container p-5'>
        <h2 className='mt-5 mb-5 flex justify-center font-bold underline text-2xl text-black'>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className='text-center'>Your cart is empty. Start shopping!</p>
        ) : (
          <>
            <div className='flex flex-wrap gap-6 mx-auto items-center justify-center'>
              {cartItems.map(item => (
                <Card className='w-[400px] h-[260px] shadow-2xl' key={item.id} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <CardBody className='flex flex-wrap items-center gap-4' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <img src={item.image} alt={item.title} className='w-[100px] h-[100px]' />
                    <div className='flex-1'>
                      <h3 className='font-semibold text-black flex flex-wrap'>{item.title}</h3>
                      <p className='text-sm'>Price: ${item.price.toFixed(2)}</p>
                      <p className='text-sm'>Quantity: {item.quantity}</p>
                    </div>
                  </CardBody>
                  <CardFooter className='mt-auto' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <button
                      className='bg-black text-white font-semibold rounded-2xl py-1 w-full'
                      onClick={() => dispatch(removeFromCart(item))}
                    >
                      Remove
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className='mt-8 text-right'>
              <h3 className='text-lg font-semibold'>Total: ${totalAmount.toFixed(2)}</h3>
              <button
                className='bg-black text-white rounded-2xl w-full py-1 mt-3'
                disabled={cartItems.length === 0}
                onClick={() => {
                  dispatch(clearCart());
                  navigate('/products');
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );

}












export default React.memo(ShoppingCart)