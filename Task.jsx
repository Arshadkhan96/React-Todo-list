import './Home.css'

const Tassk= ({title,description,onDelete}) =>{
   return(
           <div className="task">
       <div>
           <p>{title}</p>
           <span>{description}</span>
       </div>
       <button onClick={onDelete}>X</button>
       </div>
   )
}
export default Tassk;