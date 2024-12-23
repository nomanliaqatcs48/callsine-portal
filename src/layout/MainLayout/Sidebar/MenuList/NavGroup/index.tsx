import PropTypes, { InferProps } from "prop-types";

// material-ui
import { Box, List, Switch, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import NavCollapse from "../NavCollapse";
import NavItem from "../NavItem";

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroupPropTypes = {
  item: PropTypes.shape({
    children: PropTypes.any,
    title: PropTypes.any,
    caption: PropTypes.any,
  }),
};

type NavGroupTypes = InferProps<typeof NavGroupPropTypes>;

const NavGroup = ({ item }: NavGroupTypes) => {
  const theme: any = useTheme();

  // menu list collapse & items
  const items = item?.children?.map((menu: any) => {
    switch (menu.type) {
      case "collapse":
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case "item":
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item?.title && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.menuCaption }}
              display="block"
              gutterBottom
            >
              {item?.title}
              {item?.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...theme.typography.subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {item?.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      {/*<Divider sx={{ mt: 0.25, mb: 1.25 }} />*/}
    </>
  );
};

NavGroup.propTypes = NavGroupPropTypes;

export default NavGroup;
