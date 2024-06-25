import noteContext from './NoteContext'
import {useState} from 'react'

const NoteState = (props) =>{

    // const s1 = {
    //     "name": "Harshita",
    //     "class": "10 B"
    // }

    // const [state, setState] = useState(s1)
    // const update = () =>{
    //     setTimeout(() => {
    //         setState({
    //             "name": "Ishaan",
    //             "class": "12 B"
    //         })
    //     }, 1000);
    // }
    return(
        // <noteContext.Provider value={{state, update}}>
        <noteContext.Provider value={{}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState