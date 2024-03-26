import 
  React
from 'react';
import { 
  Link,
  useNavigate
 } from 'react-router-dom';
import { VscNewFile } from 'react-icons/vsc';
import { BsPencilSquare } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';

import {
  URL1,
  PORT,
  DELETE_SERVER
} from '../../constants/Constants';

import { servidores } from '../../../../servers/Serverx.json';

export const Admin = () => {
  const navigate = useNavigate();

  const handleDeleteClick = async (id:string) => {
    const response = await fetch(`${URL1}${PORT}${DELETE_SERVER}${id}`,{
      method: 'DELETE'
    });

    if(response.ok){
      navigate('/admin')
    }else{
      alert("Falla al borrar servidor, dar aviso a admon sistemas");
      return;
    }
  };

  return (
    <>
      <div className='menu'>
        <div>
          <Link to='/admin/newServer' title='Nuevo Server'>
            <VscNewFile />
          </Link>
        </div>
        <div>
          <Link to='/' title='Página principal'>
          <FaArrowLeft />
          </Link>
        </div>
      </div>
      <table className='tableServer'>
        <caption>
          <span className='captionServer'>Servidores a modificar</span>
        </caption>
        <thead className='titleColumnsServer'>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>IP</th>
            <th scope='col'>Ambiente</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servidores.map((server: any) => (
            <tr key={server.id}>
              <td scope='col'>{server.id}</td>
              <td scope='col'>{server.nameServer}</td>
              <td scope='col'>{server.ipServer}</td>
              <td scope='col'>{server.ambiente}</td>
              <td>
                <div className='actionsServer'>
                  <div>
                    <Link to={`/admin/updateServer/`+server.id} title='Modificar server'>
                      <BsPencilSquare />
                    </Link>
                  </div>
                  <div>
                    <Link 
                      to='#'
                      title='Borrar  Server'
                      onClick={() => handleDeleteClick(server.id)}
                    >
                    <MdDeleteOutline />
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className='titleColumnsServer'>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>IP</th>
            <th scope='col'>Ambiente</th>
            <th scope='col'>Acciones</th>
          </tr>
        </tfoot>
      </table>
    </>
  );
};