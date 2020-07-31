import React from "react";
import history from "../history";

class Bbb extends React.Component {
  componentDidMount = () => {
    history.push("/aaa");
    console.log("Bbb");
  };

  render() {
    return <div>Bbb</div>;
  }
}

export default Bbb;
