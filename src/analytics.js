// src/analytics.js
import ReactGA from "react-ga4";

const GA_TRACKING_ID = "G-LG65YM3SJF"; // tvoje GA4 ID

export const initGA = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

export const trackPage = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
