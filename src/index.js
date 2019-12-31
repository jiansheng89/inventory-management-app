import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

//ADAL
import { runWithAdal } from 'react-adal';
import { authContext } from './utils/adalConfig';


//Theme
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "./themes";

//Layout
import { LayoutProvider } from "./context/LayoutContext";



// const DO_NOT_LOGIN = false;
console.log("env variable")
console.log(process.env)

runWithAdal(authContext, () => {

    ReactDOM.render(
        <LayoutProvider>
            <ThemeProvider theme={Themes.default}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </LayoutProvider>,
    document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
}, false);
