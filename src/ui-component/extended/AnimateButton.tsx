import PropTypes, { InferProps } from "prop-types";
import { forwardRef } from "react";
// third-party
import { motion, useCycle } from "framer-motion";

// ==============================|| ANIMATION BUTTON ||============================== //

const AnimateButtonPropTypes = {
  children: PropTypes.node,
  offset: PropTypes.number,
  type: PropTypes.oneOf(["slide", "scale", "rotate"]),
  direction: PropTypes.oneOf(["up", "down", "left", "right"]),
  scale: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

type AnimateButtonTypes = InferProps<typeof AnimateButtonPropTypes>;

const AnimateButton = forwardRef(
  (
    {
      children,
      type = "scale",
      direction = "right",
      offset = 10,
      scale = {
        hover: 1,
        tap: 0.9,
      },
    }: AnimateButtonTypes,
    ref
  ) => {
    let offset1;
    let offset2;
    switch (direction) {
      case "up":
      case "left":
        offset1 = offset;
        offset2 = 0;
        break;
      case "right":
      case "down":
      default:
        offset1 = 0;
        offset2 = offset;
        break;
    }

    const [x, cycleX] = useCycle(offset1, offset2);
    const [y, cycleY] = useCycle(offset1, offset2);

    switch (type) {
      case "rotate":
        return (
          <motion.div
            // @ts-ignore
            ref={ref}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              repeatDelay: 0,
            }}
          >
            {children}
          </motion.div>
        );
      case "slide":
        if (direction === "up" || direction === "down") {
          return (
            <motion.div
              // @ts-ignore
              ref={ref}
              // @ts-ignore
              animate={{ y: y !== undefined ? y : "" }}
              onHoverEnd={() => cycleY()}
              onHoverStart={() => cycleY()}
            >
              {children}
            </motion.div>
          );
        }
        return (
          <motion.div
            // @ts-ignore
            ref={ref}
            // @ts-ignore
            animate={{ x: x !== undefined ? x : "" }}
            onHoverEnd={() => cycleX()}
            onHoverStart={() => cycleX()}
          >
            {children}
          </motion.div>
        );

      case "scale":
      default:
        if (typeof scale === "number") {
          scale = {
            hover: scale,
            tap: scale,
          };
        }
        return (
          <motion.div
            // @ts-ignore
            ref={ref}
            // @ts-ignore
            whileHover={{ scale: scale?.hover }}
            // @ts-ignore
            whileTap={{ scale: scale?.tap }}
          >
            {children}
          </motion.div>
        );
    }
  }
);

AnimateButton.propTypes = AnimateButtonPropTypes;

export default AnimateButton;
