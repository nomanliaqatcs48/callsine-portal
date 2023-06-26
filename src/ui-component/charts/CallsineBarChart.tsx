import { useMediaQuery } from "@mui/material";
import { BarChart } from "@mui/x-charts";

type CallsineBarChartTypes = {
  [x: string]: any;
  _xs?: number;
  _sm?: number;
  _md?: number;
  _lg?: number;
  _xl?: number;
  _2xl?: number;
  _3xl?: number;
  _4xl?: number;
};

const CallsineBarChart = ({
  _xs = 290,
  _sm = 600,
  _md = 480,
  _lg = 380,
  _xl = 340,
  _2xl = 420,
  _3xl = 510,
  _4xl = 550,
  ...props
}: CallsineBarChartTypes) => {
  const isSm = useMediaQuery("(min-width:640px)");
  const isMd = useMediaQuery("(min-width:768px)");
  const isLg = useMediaQuery("(min-width:1024px)");
  const isXl = useMediaQuery("(min-width:1280px)");
  const is2xl = useMediaQuery("(min-width:1536px)");
  const is3xl = useMediaQuery("(min-width:1800px)");
  const is4xl = useMediaQuery("(min-width:1920px)");

  const barChartWidth = (): number => {
    if (is4xl) {
      return _4xl;
    } else if (is3xl) {
      return _3xl;
    } else if (is2xl) {
      return _2xl;
    } else if (isXl) {
      return _xl;
    } else if (isLg) {
      return _lg;
    } else if (isMd) {
      return _md;
    } else if (isSm) {
      return _sm;
    }

    return _xs;
  };

  return (
    <>
      <BarChart
        className="callsine-bar-chart"
        xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        width={barChartWidth()}
        height={275}
        {...props}
      />
    </>
  );
};

export default CallsineBarChart;
