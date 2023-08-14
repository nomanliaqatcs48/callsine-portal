import PropTypes, { InferProps } from "prop-types";
import { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";

// project imports
import { MENU_OPEN, SET_MENU } from "../../../../../store/actions";

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useAuth } from "../../../../../contexts/auth";
import { devLog } from "../../../../../helpers/logs";
import moment from "moment-timezone";

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItemPropTypes = {
  item: PropTypes.any,
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.any]),
};

type NavItemTypes = InferProps<typeof NavItemPropTypes>;

const NavItem = ({ item, level }: NavItemTypes) => {
  const theme: any = useTheme();
  const auth: any = useAuth();
  const dispatch = useDispatch();
  const customization = useSelector((state: any) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));
  const [timezone, setTimezone] = useState<any>(moment.tz.guess());

  const Icon = item?.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" color={"white"} />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width:
          customization.isOpen.findIndex((id: any) => id === item?.id) > -1
            ? 8
            : 6,
        height:
          customization.isOpen.findIndex((id: any) => id === item?.id) > -1
            ? 8
            : 6,
      }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps: any = {
    component: forwardRef((props, ref: any) => {
      let _to = item.url;
      let _now = moment.tz(timezone);
      let _termEnd = moment(auth?.subscription?.current_term_end).tz(timezone);
      let _diff = _now.diff(_termEnd);

      if (item?.isPremium && auth?.subscription?.status !== "active") {
        return (
          <>
            <Tooltip title="Upgrade your account to access this feature.">
              <Box
                ref={ref}
                {...props}
                sx={{ opacity: 0.6, cursor: "not-allowed!important" }}
              />
            </Tooltip>
          </>
        );
      }
      return <Link ref={ref} {...props} to={_to} target={itemTarget} />;
    }),
  };
  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const itemHandler = (id: any) => {
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: 0, //borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: "flex-start",
        backgroundColor: level > 1 ? "transparent !important" : "inherit",
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
        "&.Mui-selected": {
          color: "white",
          backgroundColor:
            item?.isPremium && auth?.subscription?.status !== "active"
              ? "transparent"
              : "#3dabd9",
          "&:hover": {
            backgroundColor:
              item?.isPremium && auth?.subscription?.status !== "active"
                ? "transparent"
                : "#3dabd9",
          },
          "& .MuiListItemIcon-root": {
            color: theme.menuSelected,
          },
        },
      }}
      selected={
        customization.isOpen.findIndex((id: any) => id === item.id) > -1
      }
      onClick={() => itemHandler(item.id)}
      className={`hover:tw-bg-transparent ${
        item?.title === "Dashboard" && auth?.team !== 24 ? "tw-hidden" : ""
      }`}
    >
      <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={
              customization.isOpen.findIndex((id: any) => id === item.id) > -1
                ? "h5"
                : "body1"
            }
            className="tw-text-white tw-font-medium tw-text-[18px]"
            color="inherit"
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.subMenuCaption }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = NavItemPropTypes;

export default NavItem;
