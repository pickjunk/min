import React from 'react';
import ReactDOM from "react-dom";
import { Router } from '@pickjunk/min/Router';
import routes from './config/routes';

ReactDOM.render(<Router routes={routes} notFound={() => {
  alert('404 should be redirect');
}} />, document.getElementById("min"));