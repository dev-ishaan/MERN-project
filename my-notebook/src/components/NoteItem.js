import React from 'react'

const NoteItem = (props) => {
    const {notes} = props
  return (
    <div className='col-md-3 my-3'>
      <div className="card">
        <div className="card-body">
            <div className="d-flex justify-content-between">
                <h5 className="card-title">{notes.title}</h5>
                <div className="icons">
                    <i className="fa-solid fa-trash mx-2"></i>
                    <i className="fa-solid fa-pen-to-square mx-2"></i>
                </div>
            </div>
            <p className="card-text">{notes.description}</p>
        </div>
        </div>
    </div>
  )
}

export default NoteItem
