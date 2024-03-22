import React, 
  { 
    useEffect, 
    useState 
  } from "react";
  import { useParams } from "react-router-dom";
import { 
  URL1,
  PORT,
  UPDATESERVER,
  FIND_BY_ID,
  SERVER_NOT_FOUND,
} from "../../../constants/Constants";
import "../newServer/newServer.css";

export const UpdateServer = () => {
  const { id } = useParams();
  let servidores = {};

  const [inputs, setInputs] = useState({
    ipServer: "",
    nameServer: "",
    ambiente: "",
    habilitado: false,
  });
  
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    console.log(`${URL1}${PORT}${FIND_BY_ID}${id}`);
    
      const asyncCall = async () => {
        await fetch(`${URL1}${PORT}${FIND_BY_ID}${id}`)
          .then(response => response.json())
          .then(data => {

            data.hasOwnProperty('message') ? alert(data.message) : null;
            servidores = data;
            setInputs({
              ipServer: servidores.ipServer,
              nameServer: servidores.nameServer,
              ambiente: servidores.ambiente,
              habilitado: servidores.habilitado,
            });
            return;
          })
          .catch(errr => {
            console.log(errr);
            return;
          });
        console.log("servidores");
        console.log(servidores);
        console.log("inputs");
        console.log(inputs);
        return;
      };
      
      asyncCall()
    
  },[id]);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    try {
      const res = await fetch(`${URL1}${PORT}${UPDATESERVER}`,{
        method: 'UPDATE',
        mode: 'cors',
        cache:"no-cache",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(inputs),
      });
      // const data = await res.json();
      console.log(await res.json());
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
      [name]:value,
      habilitado: e.target.checked,
    });
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateInputs(name, value);
  };
  
  const handleClick = (e) => {};

  return (
    <form className="pincipal" onSubmit={handleSubmit}>
      <p className="titulo">Modificar servidor</p>
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
              onChange={() => setIsChecked(!isChecked)}
            />
          </label>
          <button
            className="boton"
            name="boton"
            id="boton"
            type="submit"
            onClick={handleClick}
          >
            Modificar servidor
          </button>
        </div>
      </div>
    </form>
  );
};
//https://www.escuelafrontend.com/formularios-en-react