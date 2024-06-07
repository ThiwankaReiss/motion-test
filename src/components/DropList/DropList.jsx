import React from 'react'

const DropList = ({ array, setter, topic,current }) => {

    return (
       
            
            <div class="dropdown">
                <div>
                    Current status :{current}
                </div>
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {topic}
                </button>
                
                <ul class="dropdown-menu">
   
                    {array && array.length > 0 && array.map((data) => (
                        <li><a class="dropdown-item" onClick={()=>{setter(data)}} >{data}</a></li>
                    ))}
                </ul>
            </div>

    )
}

export default DropList