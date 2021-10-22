import React from "react";
import "./Loader.scss";
import ReactLoader from "react-loader-spinner";

interface LoaderProps {
  size?: number;
  marginTop?: number;
}

export const Loader = ({ size = 100, marginTop = 0 }: LoaderProps) => (
  <div className="loader" style={{ marginTop }}>
    <ReactLoader type="Oval" color="#ff6f00" height={size} width={size} />
  </div>
);
