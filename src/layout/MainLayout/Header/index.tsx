import PropTypes, { InferProps } from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase } from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import SearchSection from "./SearchSection";
import ProfileSection from "./ProfileSection";
import NotificationSection from "./NotificationSection";

// assets
import { IconMenu2 } from "@tabler/icons-react";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const HeaderPropTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

type HeaderTypes = InferProps<typeof HeaderPropTypes>;

const Header = ({ handleLeftDrawerToggle }: HeaderTypes) => {
  const theme: any = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        {/*<Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>*/}
        <ButtonBase
          // className="md:tw-relative md:tw-left-12"
          sx={{ borderRadius: "12px", overflow: "hidden" }}
        >
          {/*@ts-ignore*/}
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: "white", //theme.palette.secondary.light,
              color: theme.palette.primary.main, //theme.palette.secondary.dark,
              "&:hover": {
                // background: theme.palette.secondary.dark,
                // color: theme.palette.secondary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={2} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      {/*<SearchSection />*/}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      {/*<NotificationSection />*/}
      <ProfileSection />
    </>
  );
};

Header.propTypes = HeaderPropTypes;

export default Header;
