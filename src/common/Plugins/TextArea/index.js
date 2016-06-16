import React from "react";

const EditView = ({content, id, readOnly}) => (
  <div>
    {
      readOnly
        ? <div dangerouslySetInnerHTML={{__html: content}}/>
        : <textarea className="form-control" value={content}/>
    }
  </div>
)

export default EditView