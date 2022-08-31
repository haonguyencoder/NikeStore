import React, { Component } from "react";

export const DataContext = React.createContext();

export class DataProvider extends Component {
  state = {
    products: [
      {
        _id: "1",
        title: "Nike Air Force 1 '07",
        src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoe-WrLlWX.png",
        description: "Men's Shoe",
        content:
          "The radiance lives on in the Nike Air Force 1 '07, the b-ball OG that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
        price: 230,
        colors: ["red", "black", "crimson", "teal"],
        count: 1,
      },
      {
        _id: "2",
        title: "Nike Zoom Mercurial Vapor 15",
        src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1c465a01-bbdc-4cfe-a5b2-5073cdd98ec7/zoom-mercurial-vapor-15-academy-tf-football-shoes-L8JgP4.png",
        description: "Turf Football Shoes",
        content:
          "The pitch is yours when you lace up in the Vapor 15 Academy TF. It's loaded with a Zoom Air unit and flexible NikeSkin up top for exceptional touch, so you can dominate in the waning minutes of a match—when it matters most. Fast is in the Air.",
        price: 190,
        colors: ["red", "crimson", "teal"],
        count: 1,
      },
      {
        _id: "3",
        title: "Nike Tiempo Legend 9",
        src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/87b3d9f8-ba76-43da-8392-b1b8d8f0d37c/tiempo-legend-9-academy-mg-multi-ground-football-boot-8Vvl8G.png",
        description: "Multi-Ground Football Boot",
        content:
          "1 of our lightest Tiempos to date, the Nike Tiempo Legend 9 Academy MG lets you go on the offensive with a low-profile design that's reinvented for attackers. The upper has raised textures backed by soft foam pods for precise dribbling, passing and shooting, while studs on the bottom provide traction for quick cuts and sudden stops.",
        price: 120,
        colors: ["Phantom", "Sunset Glow", "Yellow Strike"],
        count: 1,
      },
      {
        _id: "4",
        title: "Nike Phantom GT2",
        src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1d78c0ba-35bf-4d92-a6f0-48961dfbc85b/phantom-gt2-academy-mg-multi-ground-football-boot-Mnr9D7.png",
        description: "Multi-Ground Football Boots",
        content:
          "Building on the Phantom GT, the Nike Phantom GT2 MG has an updated design and patterning that is engineered to help you place your shots with pinpoint accuracy. Off-centre lacing provides a clean strike zone to help you dribble, pass and score with precision.",
        price: 150,
        colors: ["orange", "black", "crimson", "teal"],
        count: 1,
      },
      {
        _id: "5",
        title: "Nike Air Max Flyknit Racer",
        src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1492bfe1-0bd0-4697-b20b-cb41ec5b4f6b/air-max-flyknit-racer-shoes-Q9lN71.png",
        description: "Men's Shoes",
        content:
          "Paying homage to both heritage and innovation, we've blended 2 icons (old and new) to go beyond what's expected in the Nike Air Max Flyknit Racer. Incredibly light and airy Flyknit is paired with oh-so-comfy Air Max cushioning. Lace up and let your feet do the talking.",
        price: 250,
        colors: ["orange", "black", "crimson", "teal"],
        count: 1,
      },
      {
        _id: "6",
        title: "Nike Air Zoom G.T. Cut 2",
        src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0b8f1169-295f-42d7-81e3-80f555cfa326/air-zoom-gt-cut-2-basketball-shoes-KDW90P.png",
        description: "Basketball Shoes",
        content:
          "In today's game, slow-footed slugs get sought out and exposed. Space makers stay on the floor. The Nike Air Zoom G.T. Cut 2 helps you stop in an instant and accelerate back into the open lane in a low-to-the-ground design that helps minimise court contact while switching direction. Separate the players from the playmakers in a model that's built on creating separation but supportive enough to help you play all day.",
        price: 170,
        colors: ["orange", "black", "crimson", "teal"],
        count: 1,
      },
    ],
    cart: [],
    total: 0,
  };

  addCart = (id) => {
    const { products, cart } = this.state;
    const check = cart.every((item) => {
      return item._id !== id;
    });
    if (check) {
      const data = products.filter((product) => {
        return product._id === id;
      });
      this.setState({ cart: [...cart, ...data] });
    } else {
      alert("The product has been added to cart.");
    }
  };

  reduction = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };

  increase = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count += 1;
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };

  removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      const { cart } = this.state;
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      this.setState({ cart: cart });
      this.getTotal();
    }
  };

  getTotal = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    this.setState({ total: res });
  };

  componentDidUpdate() {
    localStorage.setItem("dataCart", JSON.stringify(this.state.cart));
    localStorage.setItem("dataTotal", JSON.stringify(this.state.total));
  }

  componentDidMount() {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart !== null) {
      this.setState({ cart: dataCart });
    }
    const dataTotal = JSON.parse(localStorage.getItem("dataTotal"));
    if (dataTotal !== null) {
      this.setState({ total: dataTotal });
    }
  }

  render() {
    const { products, cart, total } = this.state;
    const { addCart, reduction, increase, removeProduct, getTotal } = this;
    return (
      <DataContext.Provider
        value={{
          products,
          addCart,
          cart,
          reduction,
          increase,
          removeProduct,
          total,
          getTotal,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
