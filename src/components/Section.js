import React, { Component } from "react";
import Home from "./section/Home";
import Products from "./section/Products";
import Contact from "./section/Contact";
import About from "./section/About";
import Details from "./section/Details";
import { Route } from "react-router-dom";
import Cart from "./section/Cart";
import Payment from "./section/Payment";

export class Section extends Component {
  render() {
    return (
      <section>
        <Route path="/" component={Home} exact />
        <Route path="/product" component={Products} exact />
        <Route path="/contact" component={Contact} exact />
        <Route path="/about" component={About} exact />
        <Route path="/product/:id" component={Details} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/payment" component={Payment} exact />
      </section>
    );
  }
}

export default Section;
