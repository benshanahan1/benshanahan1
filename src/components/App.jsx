import React from "react";
import DocumentTitle from "react-document-title";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { HashRouter, Switch, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Footer from "./Footer";
import ProjectDescription from "./ProjectDescription";

const theme = createMuiTheme({
  typography: {
    palette: {},
    fontFamily: '"Crimson Text", serif',
    // fontFamily: '"Open Sans", sans-serif',
    fontSize: 18,
    // fontWeightLight: 300,
    // fontWeightRegular: 400,
    // fontWeightMedium: 500,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth, // eslint-disable-line
      height: window.innerHeight, // eslint-disable-line
    };

    /* Bind methods to `this`. */
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    // eslint-disable-next-line
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    // eslint-disable-next-line
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth, // eslint-disable-line
      height: window.innerHeight, // eslint-disable-line
    });
  }

  render() {
    const { width, height } = this.state;
    const isMobile = width < 700;
    const dimensions = { width, height, isMobile };

    const HomeView = (props) => (
      <div>
        <AboutMe dimensions={dimensions} {...props} />
        <Projects dimensions={dimensions} {...props} />
      </div>
    );

    const ProjectDescriptionView = (props) => (
      <ProjectDescription dimensions={dimensions} {...props} />
    );

    return (
      <DocumentTitle title="Benjamin Shanahan">
        <MuiThemeProvider theme={theme}>
          <Header dimensions={dimensions} />

          <HashRouter>
            <ScrollToTop>
              <Switch>
                <Route exact path="/:slug" component={ProjectDescriptionView} />
                <Route component={HomeView} />
              </Switch>
            </ScrollToTop>
          </HashRouter>

          <Footer dimensions={dimensions} />
        </MuiThemeProvider>
      </DocumentTitle>
    );
  }
}

export default App;
