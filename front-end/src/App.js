import { useEffect, useRef, useState } from "react";
import "./App.css";

import Modal from "./components/Modal";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faCircleInfo,
  faEdit,
  faInfo,
  faInfoCircle,
  faSave,
  faTrashAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { text } from "@fortawesome/fontawesome-svg-core";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [producto, setProducto] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalInsert, setShowModalInsert] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const Request = (e, action) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(JSON.stringify(data));
    fetch("http://api.com/producto", {
      method: action,
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        fetchProducts();
        switch (action) {
          case "POST":
            closeInsert();
            break;
          case "PUT":
            closeUpdate();
            break;
        }
      });
  };

  const openInfo = () => {
    setShowModalInfo(true);
  };

  const openInsert = () => {
    setShowModalInsert(true);
  };
  const closeInsert = () => {
    setShowModalInsert(false);
  };
  const openUpdate = () => {
    setShowModalUpdate(true);
  };
  const closeUpdate = () => {
    setShowModalUpdate(false);
  };
  const openDelete = () => {
    setShowModalDelete(true);
  };
  const closeDelete = () => {
    setShowModalDelete(false);
  };

  const selectProduct = (id, op) => {
    setSelectedProduct(producto.find((p) => p.idpro === id));
    switch (op) {
      case "INFO":
        openInfo();
        break;
      case "UPDATE":
        openUpdate();
        break;
      case "DELETE":
        openDelete();
        break;
    }
  };

  const fetchProducts = () => {
    fetch("http://api.com/producto")
      .then((response) => response.json())
      .then((data) => {
        setProducto(data.producto);
        console.log(producto);
        setIsLoading(false);
      });
  };

  const fetchFilter = (query) => {
    fetch(query)
      .then((response) => response.json())
      .then((data) => {
        setProducto(data.producto);

        setIsLoading(false);
      });
  };

  const deleteProduct = (c) => {
    fetch("http://api.com/dproducto/" + c).then((response) => {
      response.json();
      fetchProducts();
      closeDelete();
    });
  };

  const fetchCategoria = () => {
    fetch("http://api.com/categoria")
      .then((response) => response.json())
      .then((data) => {
        setCategoria(data.categoria);
        console.log(categoria);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoria();
  }, []);

  return (
    <div className="App">
      {showModalInfo ? (
        <Modal
          closeModal={() => {
            setShowModalInfo(false);
          }}
          modalTitle={selectedProduct.categoria + "/" + selectedProduct.nombre}
          modalBody={
            <>
              <img src={selectedProduct.imagen} width="200" height="200"></img>
              <h2>$ {selectedProduct.precio}</h2>
              <p>{selectedProduct.descripcion}</p>
            </>
          }
          modalFooter={
            <>
              <p>ID: {selectedProduct.idpro}</p>
              <p>Stock: {selectedProduct.stock}</p>
            </>
          }
        />
      ) : (
        ""
      )}

      {showModalInsert ? (
        <form onSubmit={(e) => Request(e, "POST")}>
          <Modal
            closeModal={() => {
              setShowModalInsert(false);
            }}
            modalTitle={
              <>
                <p>New Product</p>
              </>
            }
            modalBody={
              <>
                <p>
                  Producto: <input type="text" name="nombre" />
                </p>
                <p>
                  Categoria:
                  <select name="idcat">
                    {categoria.map((c) => (
                      <option key={c.idcat} value={c.idcat}>
                        {c.categoria}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  Precio: <input type="number" name="precio" step="0.10" />
                </p>
                <p>
                  Stock: <input type="number" name="stock" />
                </p>
                <p>
                  URL Imagen: <input type="text" name="imagen" />
                </p>
                <p>
                  Descripcion:{" "}
                  <textarea className="textarea-form" name="descripcion" />
                </p>
              </>
            }
            modalFooter={
              <>
                <p>
                  <button className="btn btn-success">
                    <FontAwesomeIcon icon={faSave} /> Save
                  </button>
                </p>
                <p>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={closeInsert}
                  >
                    <FontAwesomeIcon icon={faCancel} /> Cancel
                  </button>
                </p>
              </>
            }
          />
        </form>
      ) : (
        ""
      )}

      {showModalUpdate ? (
        <form onSubmit={(e) => Request(e, "PUT")}>
          <Modal
            closeModal={() => {
              setShowModalUpdate(false);
            }}
            modalTitle={
              <>
                <p>Update Product</p>
              </>
            }
            modalBody={
              <>
                <p>
                  ID:
                  <input
                    type="text"
                    name="idpro"
                    defaultValue={selectedProduct.idpro}
                    readOnly
                  />
                </p>
                <p>
                  Producto:
                  <input
                    type="text"
                    name="nombre"
                    defaultValue={selectedProduct.nombre}
                  />
                </p>
                <p>
                  Categoria:
                  <select name="idcat">
                    {categoria.map((c) => (
                      <option key={c.idcat} value={c.idcat}>
                        {c.categoria}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  Precio:
                  <input
                    type="number"
                    name="precio"
                    defaultValue={selectedProduct.precio}
                    step="0.10"
                  />
                </p>
                <p>
                  Stock:
                  <input
                    type="number"
                    name="stock"
                    defaultValue={selectedProduct.stock}
                  />
                </p>
                <p>
                  URL Imagen:
                  <input
                    type="text"
                    name="imagen"
                    defaultValue={selectedProduct.imagen}
                  />
                </p>
                <p>
                  Descripcion:
                  <textarea
                    className="textarea-form"
                    name="descripcion"
                    defaultValue={selectedProduct.descripcion}
                  />
                </p>
              </>
            }
            modalFooter={
              <>
                <p>
                  <button className="btn btn-success">
                    <FontAwesomeIcon icon={faUpload} /> Update
                  </button>
                </p>
                <p>
                  <button className="btn btn-danger" onClick={closeUpdate}>
                    <FontAwesomeIcon icon={faCancel} /> Cancel
                  </button>
                </p>
              </>
            }
          />
        </form>
      ) : (
        ""
      )}

      {showModalDelete ? (
        <Modal
          closeModal={() => {
            setShowModalDelete(false);
          }}
          modalTitle={
            <>
              <p>Delete Product</p>
            </>
          }
          modalBody={
            <>
              <p>
                Do you want to remove the product with the following ID?
                <input
                  type="text"
                  name="idpro"
                  defaultValue={selectedProduct.idpro}
                />
              </p>
            </>
          }
          modalFooter={
            <>
              <p>
                <button
                  className="btn btn-danger"
                  onClick={(e) => deleteProduct("" + selectedProduct.idpro)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                </button>
              </p>
              <p>
                <button className="btn btn-secondary" onClick={closeDelete}>
                  <FontAwesomeIcon icon={faCancel} /> Cancel
                </button>
              </p>
            </>
          }
        />
      ) : (
        ""
      )}

      <header className="App-header">
        <p>
          Filtrar:{" "}
          <button className="btn btn-warning" onClick={fetchProducts}>
            TODOS
          </button>
          <span> </span>
          <button
            className="btn btn-warning"
            onClick={() => fetchFilter("http://api.com/fcategoria/1")}
          >
            Carnes
          </button>
          <span> </span>
          <button
            className="btn btn-warning"
            onClick={() => fetchFilter("http://api.com/fcategoria/2")}
          >
            Bebidas
          </button>
          <span> </span>
          <button
            className="btn btn-warning"
            onClick={() => fetchFilter("http://api.com/fcategoria/3")}
          >
            Frutas y Verduras
          </button>
          <span> </span>
          <button className="btn btn-success" onClick={openInsert}>
            Nuevo
          </button>
        </p>

        <div className="container-characters">
          {!producto ? (
            <>
              <h1></h1>
            </>
          ) : (
            producto.map((producto) => {
              return (
                <div className="character-container" key={producto.idpro}>
                  <img src={producto.imagen} width="350" height="350"></img>
                  <h6>{producto.nombre}</h6>
                  <h6>$ {producto.precio}</h6>
                  <button
                    className="btn btn-success"
                    onClick={() => selectProduct(producto.idpro, "UPDATE")}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <span> </span>
                  <button
                    className="btn btn-danger"
                    onClick={() => selectProduct(producto.idpro, "DELETE")}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </button>
                  <span> </span>
                  <button
                    className="btn btn-primary"
                    onClick={() => selectProduct(producto.idpro, "INFO")}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} /> Detail
                  </button>
                </div>
              );
            })
          )}
        </div>
        <p></p>
      </header>
    </div>
  );
}

export default App;
