import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCartContext } from '../../Context/CartContext';
import ItemCount from '../Item/ItemCount';

import './Product.css'

const ProductDetail = ({ productos }) => {

  const { agregarCarrito } = useCartContext()

  const onAdd = (cant)=>{
    console.log(cant)
    agregarCarrito( productos, cant )
  }

  const { cartList } = useCartContext()
    console.log(cartList)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {productos.map((producto) => (
        <div key={producto.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card mx-2 mb-4" style={{width: "300px"}}>
            <div className='card-header text-center'>
              {producto.name}
            </div>
            <div className='card-body text-center'>
              <img src={producto.image} alt='imagen' className='product-image w-100'/>
            </div>
            <div className='card-body text-center'>
                <p>{producto.description}</p>
            </div>
            <div className='card-body text-center'>
              <strong>ARS ${producto.price}</strong>
            </div>
            <div className='card-body text-center'>
              <NavLink to={'/'} className="btn btn-dark btn-large"> Atras </NavLink>
            </div>
          </div>
          <ItemCount onAdd={onAdd} style={{ marginLeft: 'auto' }}/>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;

