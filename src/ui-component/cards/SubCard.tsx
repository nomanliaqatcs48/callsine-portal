import PropTypes, { InferProps } from "prop-types";
import { forwardRef } from "react";

// material-ui
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCardPropTypes = {
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
  sx: PropTypes.object,
  contentSX: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
};

type SubCardTypes = InferProps<typeof SubCardPropTypes>;

const SubCard = forwardRef<HTMLDivElement, SubCardTypes>(
  (
    {
      children,
      content = true,
      contentClass,
      darkTitle,
      secondary,
      sx = {},
      contentSX = {},
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card
        // @ts-ignore
        ref={ref}
        sx={{
          border: "1px solid",
          borderColor: theme.palette.primary.light,
          ":hover": {
            boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
          },
          ...sx,
        }}
        {...others}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            // @ts-ignore
            title={<Typography variant="h5">{title}</Typography>}
            // @ts-ignore
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            // @ts-ignore
            title={<Typography variant="h4">{title}</Typography>}
            // @ts-ignore
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && (
          <Divider
            sx={{
              opacity: 1,
              borderColor: theme.palette.primary.light,
            }}
          />
        )}

        {/* card content */}
        {content && (
          <CardContent
            sx={{ p: 2.5, ...contentSX }}
            className={contentClass || ""}
          >
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

SubCard.propTypes = SubCardPropTypes;

export default SubCard;
