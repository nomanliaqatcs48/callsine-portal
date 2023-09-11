import { useSelector } from "react-redux";

import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// routing
import Routes from "./routes";

// defaultTheme
import themes from "./themes";

// project imports
import { MendableChatBubble } from "@mendable/search";
import logo from "./assets/images/logos/callsine-logo-white-only.png";
import NavigationScroll from "./layout/NavigationScroll";

const App = () => {
  const customization = useSelector((state: any) => state.customization);

  const style = { darkMode: false, accentColor: "#cccc", zIndex: "1000" };

  const floatingButtonStyle = {
    color: "#fff",
    backgroundColor: "#1976d2",
  };

  const icon = <img src={logo} />;
  const currentRoute = window.location.pathname;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        {currentRoute.startsWith("/pricing") ? (
          <MendableChatBubble
            dialogPlaceholder="Anything you want to know about Callsine, at your fingertips."
            style={style}
            icon={icon}
            floatingButtonStyle={floatingButtonStyle}
            anon_key={"8fb50d66-58ba-40f6-86fb-ab2caeb2911e"}
            cmdShortcutKey={"k"}
            welcomeMessage={"Welcome to the future, how can I help you?"}
            messageSettings={{ hideSources: true }}
          />
        ) : (
          ""
        )}

        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
