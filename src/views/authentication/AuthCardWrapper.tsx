import PropTypes, { InferProps } from "prop-types";

// material-ui
import { Box } from "@mui/material";

// project import
import MainCard from "../../ui-component/cards/MainCard";

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapperPropTypes = {
  children: PropTypes.node,
};

type AuthCardWrapperTypes = InferProps<typeof AuthCardWrapperPropTypes>;

const AuthCardWrapper = ({ children, ...other }: AuthCardWrapperTypes) => (
  <MainCard
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      "& > *": {
        flexGrow: 1,
        flexBasis: "50%",
      },
    }}
    content={false}
    {...other}
  >
    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
);

AuthCardWrapper.propTypes = AuthCardWrapperPropTypes;

export default AuthCardWrapper;
