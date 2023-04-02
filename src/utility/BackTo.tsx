import { useNavigate } from "react-router-dom";
import backToSvg from "../images/leftarrow.png";
const BackTo = ({...props}) => {
const {page,component}=props;
const navigate= useNavigate();
  return (

	<div className="flex p-1 border-t border-solid border-slate-200 rounded-b">
	
<button
style={{color:'rgb(66 88 124)'}}
  className="background-transparent font-bold text-sm outline-none focus:outline-none ml-2 ease-linear transition-all duration-150"
  type="button" 
>
	{
		!page ?  <img onClick={() => navigate(component)} src={backToSvg} alt="back to svg" width={50} height={20} style={{display:'inline-block'}} />
:<img onClick={() => navigate(component,{state:{page:page}})} src={backToSvg} alt="back to svg" width={50} height={20} style={{display:'inline-block'}} />

	}
</button>

</div>
  )
}

export default BackTo