import { useNavigate } from "react-router-dom";
import { Button, BackLink } from "govuk-react";
function goHere(props){
    const navigate = useNavigate();
    let type = props.type;
    const goThere =(props) => {
    navigate(props);


        }
        return (<>
            {type == "button" ? (
              <Button onClick={() => goThere(props.goTo)}></Button>
            ) : (
              <BackLink onClick={() => goThere(props.goTo)}></BackLink>
            )}
          </>)
}
export default goHere;

