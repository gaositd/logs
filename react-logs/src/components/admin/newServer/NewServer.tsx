import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  URL1,
  PORT,
  NEW_SERVER
} from "../../../constants/Constants";
import "./newServer.css";

export const NewServer = () => {

  const [inputs, setInputs] = useState({
    ipServer: "",
    nameServer: "",
    ambiente: "",
    habilitado: false,
  });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    try {
      const res = await fetch(`${URL1}${PORT}${NEW_SERVER}`,{
        method: 'POST',
        mode: 'cors',
        cache:"no-cache",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(inputs),
      });
      navigate('/');
    } catch (errr) {
      console.log(`${errr} Estatus: res.status`);
    }
  };

  function setInputsErrors(name, flag){
    setErrors({
      ...errors,
      [name]: flag
    });
  }

  function validateInputs(name, value){
    const IpRegex = /^((25[0-5]|2[0-4]\d|[0-1]?\d{1,2})\.){3}(25[0-5]|2[0-4]\d|[0-1]?\d{1,2})$/;
    const valueRegex = /^(?!\-\-)(?![<>{}()&;`$!@#$%^~*+=\\/\[\]]|\s)(?!docker\s.*run)(?!.*[<>{}()&;`$!@#$%^~*+=\\/\[\]]).*$/;

    switch(name){
      case 'ipServer':{
        IpRegex.test(value) ? setInputsErrors(name, true): setInputsErrors(name, false);
        break;
      }
      case 'nameServer':
      case 'ambiente':{
        valueRegex.test(value) ? setInputsErrors(name, true): setInputsErrors(name, false);
        break;
      }
      default: break;
    }
  }

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]:value
    });
    e.target.name === 'habilitado' 
      ? setInputs({
        ...inputs,
        habilitado: e.target.checked
      })
      : null;
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateInputs(name, value);
  };
  
  const handleClick = (e) => {};

  return (
    <form className="pincipal" onSubmit={handleSubmit}>
      <p className="titulo">Agregar nuevo servidor</p>
      <div className="entradas">
        <input
          className={errors.ipServer ? "inputs" : "inputError"}
          type="text"
          name="ipServer"
          id="ipServer"
          placeholder="IP Servidor"
          value={inputs.ipServer}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <input
          className={errors.nameServer ? "inputs" : "inputError"}
          type="text"
          name="nameServer"
          id="nameServer"
          placeholder="Nombre Servidor"
          value={inputs.nameServer}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <input
          className={errors.ambiente ? "inputs" : "inputError"}
          type="text"
          name="ambiente"
          id="ambiente"
          placeholder="Ambiente"
          value={inputs.ambiente}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <div className="checkBoton">
          <label htmlFor="habilitado" className="lblHabilitado">
            ¿Habilitar servidor?
            <input
              type="checkbox"
              className="habilitado"
              name="habilitado"
              id="habilitado"
              checked={inputs.habilitado}
              onChange={handleInputChange}
            />
          </label>
          <button
            className="boton"
            name="boton"
            id="boton"
            type="submit"
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