import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext'

const About = () => {
  
  // const a = useContext(noteContext)
  
  // useEffect(() => {
  //   a.update()
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div>
      {/* This is about {a.state.name} and she is in class {a.state.class} */}
      This is about page
    </div>
  )
}

export default About
