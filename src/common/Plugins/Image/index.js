import React from "react";

export const EditView = ({ id, src, readOnly }) => (
  <div style={{margin: '8px'}}>
    {
      readOnly ? null : (<div style={{position: 'absolute', zIndex: 1, top: '50%', width: '90%', right: '5%'}}><input style={{width: '100%'}} value={src} /></div>)
    }
    <img src={src} style={{width: '100%'}} />
  </div>
)

export default EditView