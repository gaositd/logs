import React, { useState } from 'react';
import './newServer.css';

export const NewServer = () => {
  const [inputs, setInputs] = useState()
  
  const handleClick = (e) =>{
    console.log(e)
  }

  const handleSubmit = (e) => {
    
  }

  return (
    <form className="pincipal" onSubmit={handleSubmit}>
      <p className='titulo'>Agregar nuevo servidor</p>
      <div className="entradas">
        <input 
          className='inputs' 
          type="text" 
          name="ipServer" 
          id="ipServer" 
          placeholder='IP Servidor'
        />
        <input 
          className='inputs' 
          type="text" 
          name="nameServer" 
          id="nameServer" 
          placeholder='Nombre Servidor' 
        />
        <input 
          className='inputs' 
          type="text" 
          name="ambiente" 
          id="ambiente" 
          placeholder='Ambiente'
        />
        <div className='checkBoton'>
          <label 
            htmlFor="habilitado" 
            className='lblHabilitado'
          >
            ¿Habilitar servidor?
            <input 
              type='checkbox' 
              className='habilitado' 
              name='habilitado' 
              id='habilitado' 
            />
          </label>
          <button 
            className='boton'
            name='boton'
            id='boton'
            onClick={handleClick}
          >
            Crear servidor
          </button>
        </div>
      </div>
    </form>
  )
}
