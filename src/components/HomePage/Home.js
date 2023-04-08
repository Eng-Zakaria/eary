import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./homePage.css";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import Hero from "./Hero";
import Features from "./Features";
const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
