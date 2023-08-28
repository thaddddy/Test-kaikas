import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { 
	Flex,
  	ChakraProvider,
} from "@chakra-ui/react";
import "./App.scss";
import "./mdi/css/materialdesignicons.css";
import Dashboard from "./dashboard";
import Wallet from "./wallet";

function App() {
	return (
		<ChakraProvider>	
	        <Router>
	          <Switch>
	            <Route path="/" component={Dashboard} exact />
	            <Route path="/metamask" component={Wallet} />
	            <Route component={Dashboard} />
	          </Switch>
	        </Router>
		</ChakraProvider>
	)
}

export default App;
