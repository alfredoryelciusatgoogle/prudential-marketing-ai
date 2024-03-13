import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import SideBar from "./components/SideBar";
import CampaignGenerator from "./pages/campaign-generator";
import ContentGenerator from "./pages/content-generator";

const muiTheme = createTheme({
  palette: {
    error: {
      main: "#ED1B2E",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontSize: "inherit",
      fontWeight: "normal",
      fontFamily: "inherit",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <div className="p-8 flex flex-row gap-8 w-full h-full">
        <BrowserRouter>
          <SideBar></SideBar>
          <Switch>
            <Route path="/campaign-generator">
              <CampaignGenerator></CampaignGenerator>
            </Route>
            <Route path="/content-generator">
              <ContentGenerator></ContentGenerator>
            </Route>
            <Redirect to="/campaign-generator"></Redirect>
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
