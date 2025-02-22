import { useNavigation } from "react-router-dom";

type SubmitBtnProps = {
  text:string;
}

const SubmitBtn = ({text}:SubmitBtnProps) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting';
   

  return (
   <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
    {
      isSubmitting ? 
      <>
       <span className="loading loading-spinner"></span>
       sending...
      </> 
      : 
      text
     }
   </button>
   
  )
}

export default SubmitBtn