import React, {
  useState,
  useRef
 } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { servidores } from "../../../../servers/Serverx.json";
import { GrUserAdmin } from "react-icons/gr";
import {
  URL1,
  PORT,
  CONTAINER_NAME
} from '../../constants/Constants';

export const Header = () => {
  const [usrPassactive, setUsrPassActive] = useState(true);
  const [nLines, setNLines] = useState(true);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const selectedRef = useRef(null); 
  // const serverLoad =() useEffect;

  
  const selectOption = servidores.map((server, i) => {
    const options = {
      value: server.id,
      label: `${server.nameServer} (${server.ambiente.toUpperCase()})`,
      isDisabled: server.habilitado,
      title:server.nameServer,
    };
    return options;
  });
  
  let containers = [];
  const [inputs, setInputs] = useState({});

  const handleFocus = (e) => {

  }

  const optionSelected = (e) => {
    const { usrPassactive } = e.target.outerText;
    usrPassactive === true ? setUsrPassActive(!usrPassactive) : null;
    handleChange(e);
  };

  const handleBlur = (e, usrPassactive) => {
    if(usrPassactive === false){
      setNLines(!nLines);
    }
    // asyncCall();
    // fillInputs(e);
  }

  const handleChange  = (e) => {
    const name = e.target.name ? e.target.name : e.target.id;
    const value = e.target.value ? e.target.value : e.target.outerText;
    setInputs({
      ...inputs,
      [name]:value
    });
  };

  const asyncCall = async () => {
    try {
      const response = await fetch(`${URL1}${PORT}${CONTAINER_NAME}`,{
        method:'POST',
        mode:'cors',
        cache: 'no-cache',
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body:JSON.stringify(inputs),
      });

      const containersName = response.json();
      containers = containersName.map(name => name);
    } catch (errr) {
      alert(errr.message);
    }
  }

  // let selected = "";

  return (
    <div>
      <form action="#">
        <div className="header">
          <Select
            options={selectOption}
            onChange={() => optionSelected(event)}
            name="ipServer"
            id="ipServer"
          />
          <input
            type="text"
            name="user"
            id="user"
            placeholder="Usuario"
            aria-placeholder="usuario"
            required
            aria-required
            value={inputs.user}
            onChange={handleChange}
            onBlur={() => handleBlur(event, '')}
            readOnly={usrPassactive}
          />
          <input
            type="password"
            name="pass"
            id="pass"
            placeholder="Password"
            aria-placeholder="Password"
            required
            aria-required
            onFocus={handleFocus}
            readOnly={usrPassactive}
            onBlur={() => handleBlur(event,usrPassactive)}
            value={inputs.password}
          />
          <input
            type="number"
            name="lineas"
            id="lineas"
            min={0}
            placeholder="ver N número de líneas"
            readOnly={nLines}
            onFocus={asyncCall}
            value={inputs.number}
          />
          <Select
            options={containers}
            name="containers"
            id="containers"
            value={selectedContainer}
            onChange={(selected) => {
              setSelectedContainer(selected);
              selectedRef.current = selected; // Update the ref value
              getLogs(selected);
            }}
          />
          <Link to="admin">
            {" "}
            <GrUserAdmin title="Administración" />
          </Link>
        </div>
      </form>
    </div>
  );
};
