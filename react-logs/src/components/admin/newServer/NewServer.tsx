import React, { useState } from "react";
import "./newServer.css";

export const NewServer = () => {
  const [inputs, setInputs] = useState({
    ipServer: "",
    nameServer: "",
    ambiente: "",
    habilitado: false,
  });
  const [errors, setErrors] = useState({
    ipServer: "",
    nameServer: "",
    ambiente: "",
    habilitado: false,
  });

  const handleClick = (e) => {
    console.log(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleCheckChange = (e) => {
    console.log(e.target.value);
  };

  const handleBlur = (e) => {
    const { target } = e;
    const { name, value } = target;
    const IpRegex = /^((25[0-5]|2[0-4]\d|[0-1]?\d{1,2})\.){3}(25[0-5]|2[0-4]\d|[0-1]?\d{1,2})$/;

    switch (name) {
      case 'ipServer':
        if(IpRegex.test(name)) { validatesInputs(name, value); }break;
      case "nameServer":
        if(name === '' || name === null || name === undefined || name.length <4){ validatesInputs(name, value); } break;
      case 'ambiente':
        if(name === '' || name === null || name === undefined || name.length <4){ validatesInputs(name, value); } break;
      default: break;
  };
};

const validatesInputs = (name, value) =>{
  setErrors({
    ...errors,
    [name]: value,
  });
};

  return (
    <form className="pincipal" onSubmit={handleSubmit}>
      <p className="titulo">Agregar nuevo servidor</p>
      <div className="entradas">
        <input
          className={errors.ipServer ? "inputError" : "inputs"}
          type="text"
          name="ipServer"
          id="ipServer"
          placeholder="IP Servidor"
          value={inputs.ipServer}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <input
          className={errors.nameServer ? "inputError" : "inputs"}
          type="text"
          name="nameServer"
          id="nameServer"
          placeholder="Nombre Servidor"
          value={inputs.nameServer}
          onChange={handleInputChange}
        />
        <input
          className={errors.ambiente ? "inputError" : "inputs"}
          type="text"
          name="ambiente"
          id="ambiente"
          placeholder="Ambiente"
          value={inputs.ambiente}
          onChange={handleInputChange}
        />
        <div className="checkBoton">
          <label htmlFor="habilitado" className="lblHabilitado">
            ¿Habilitar servidor?
            <input
              type="checkbox"
              className="habilitado"
              name="habilitado"
              id="habilitado"
              // value={inputs.habilitado}
              onChange={handleCheckChange}
            />
          </label>
          <button
            className="boton"
            name="boton"
            id="boton"
            onClick={handleClick}
          >
            Crear servidor
          </button>
        </div>
      </div>
    </form>
  );
};
//https://www.escuelafrontend.com/formularios-en-react