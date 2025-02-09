import React, { useState, useEffect } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useCartContext } from "../../Context/CartContext";
import Swal from "sweetalert2";

import "./Cart.css";

const Cart = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    repetirEmail: "",
  });
  const [emailMatch, setEmailMatch] = useState(true);

  const { cartList, vaciarCarrito, sumTotal, eliminarProducto } =
    useCartContext();

  const insertarOrder = (evt) => {
    evt.preventDefault();
    const order = {};
    order.buyer = formData;

    const db = getFirestore();
    const ordersCollection = collection(db, "orders");

    addDoc(ordersCollection, order)
      .then((docRef) => {
        Swal.fire({
          title: "Agregado exitosamente!",
          text: `Su orden se genero exitosamente con el ID: ${docRef.id}`,
          icon: "success",
          showConfirmButton: true,
        });
        vaciarCarrito();
        setFormData({
          name: "",
          phone: "",
          email: "",
          repetirEmail: "",
        });
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (evt) => {
    if (evt.target.name === "phone") {
      setFormData({
        ...formData,
        [evt.target.name]: parseInt(evt.target.value),
      });
    } else {
      setFormData({
        ...formData,
        [evt.target.name]: evt.target.value,
      });
    }
  };

  useEffect(() => {
    setEmailMatch(formData.email === formData.repetirEmail);
  }, [formData.email, formData.repetirEmail]);

  return (
    <div className="container mt-5">
      <div>
        {cartList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {cartList.map((productos) => (
                <tr key={productos.id}>
                  <td>
                    <img src={productos.image} className="img-thumbnail w-25" />
                  </td>
                  <td>{productos.name}</td>
                  <td>ARS ${productos.price * productos.cantidad}</td>
                  <td>{productos.cantidad}</td>
                  <td>
                    <button
                      className="btn btn-eliminar"
                      onClick={() => eliminarProducto(productos.id)}
                    >
                      {" "}
                      X{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center empty-cart-message">
            <b>NO HAY PRODUCTOS EN EL CARRITO</b>
          </div>
        )}
      </div>

      {cartList.length > 0 && (
        <div className="d-flex justify-content-end mt-3">
          <p className="mr-3">Total: ARS ${sumTotal()}</p>
          <button className="btn btn-danger" onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
        </div>
      )}
      <br />
      <div className="text-center form-message">
        <b>FORMULARIO PARA COMPLETAR COMPRA</b>
      </div>
      <form className="form-container" onSubmit={insertarOrder}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Ingrese nombre"
            onChange={handleOnChange}
            value={formData.name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Ingrese teléfono"
            onChange={handleOnChange}
            value={formData.phone}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Ingrese email"
            onChange={handleOnChange}
            value={formData.email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="repetirEmail">Repetir Email:</label>
          <input
            type="email"
            name="repetirEmail"
            className="form-control"
            placeholder="Repetir el email"
            onChange={handleOnChange}
            value={formData.repetirEmail}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btnForm"
          //Se deshabilita el boton de generar orden cuando los email no coinciden
          disabled={!emailMatch}
        >
          {" "}
          Generar orden{" "}
        </button>
      </form>
    </div>
  );
};

export default Cart;
