import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ButtonBase } from "@mui/material";
import config from "../../../config";
import { MENU_OPEN } from "../../../store/actions";
import logo from "../../../assets/images/logos/CALLSINE-Web-Logo-White.png";

// ==============================|| MAIN LOGO ||============================== //

const LogoSectionSidebar = () => {
  const defaultId = useSelector((state: any) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      component={Link}
      to={config.defaultPath}
    >
      <img src={logo} alt="CallSine" width="auto" className="tw-pr-5" />
    </ButtonBase>
  );
};

export default LogoSectionSidebar;
