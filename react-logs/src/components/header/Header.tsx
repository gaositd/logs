import React, {
  useState,
  useRef,
  useEffect,
 } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { servidores } from "../../../../servers/Serverx.json";
import { GrUserAdmin } from "react-icons/gr";

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

  const containers = [
    { value: 0, label: "Contenedor", isDisabled: true },
    { value: 1, label: "Docker 1", isDisabled: false },
    { value: 2, label: "Docker 2", isDisabled: false },
    { value: 3, label: "Docker 3", isDisabled: false },
    { value: 4, label: "Docker 4", isDisabled: false },
  ];
  
  const getLogs = () => {
    console.log(selected);
  };

  const optionSelected = (e) =>
    usrPassactive === true ? setUsrPassActive(!usrPassactive) : null;

  const enableNLines = (usrPassactive) => {
    if(usrPassactive === false){
      setNLines(!nLines);
    }

  }

  let selected = "";

  return (
    <div>
      <form action="#">
        <div className="header">
          <Select
            options={selectOption}
            onChange={() => optionSelected(event?.target.outerText)}
            name="IP"
            id="IP"
          />
          <input
            type="text"
            name="user"
            id="user"
            placeholder="Usuario"
            aria-placeholder="usuario"
            required
            aria-required
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
            readOnly={usrPassactive}
            onBlur={() => enableNLines(usrPassactive)}
          />
          <input
            type="number"
            name="lineas"
            id="lineas"
            min={0}
            placeholder="ver N número de líneas"
            readOnly={nLines}
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
            // onMenuClose={() => {
            //   if (selectedRef.current) { // Access the ref value correctly
            //     setSelectedContainer(selectedRef.current);
            //     console.log(selectedRef.current);
            //   }
            // }}
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
