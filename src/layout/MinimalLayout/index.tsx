import { Outlet } from "react-router-dom";
import Unauthenticated from "../../ui-component/authentication/Unauthenticated";

// project imports
// import Customization from "../Customization";

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <>
    <Unauthenticated>
      <Outlet />
    </Unauthenticated>
    {/*<Customization />*/}
  </>
);

export default MinimalLayout;
