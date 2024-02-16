import React from 'react';

export const Main = () => {
  return (
    <div className='textAreaContainer'>
      <textarea
        className='maintextArea' 
        name="logs" 
        id="logs" 
        placeholder='Logs del contenedor' 
        aria-placeholder='Logs del contenedor'
      >
      </textarea>
    </div>
  )
}
