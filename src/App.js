import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { getData } from "./Saga";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ClearIcon from "@material-ui/icons/Clear";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      featuresList: [],
      id: ["TVSF2WYXTKAR7RAF"],
      ids: [],
      compareSummary: [],
      showDifference: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getData());
  }

  componentWillReceiveProps(props) {
    if (props.featuresList) {
      this.setState({
        featuresList: props.featuresList,
      });
    }

    if (props.compareSummary) {
      let ids = this.state.ids.slice();

      ids = Object.keys(props.compareSummary.titles);

      this.setState({
        compareSummary: props.compareSummary,
        ids: ids,
      });
    }
  }

  handleTitle = (event) => {
    let id = this.state.id.slice();
    id.push(event.target.value);
    this.setState({
      id: id,
    });
  };

  handleShowDifference = () => {
    this.setState({
      showDifference: !this.state.showDifference,
    });
  };

  handleDelete = (product) => {
    let id = this.state.id.slice();
    id.map((item) => {
      if (item == product) {
        let index = id.indexOf(product);
        id.splice(index, 1);
        this.setState({
          id: id,
        });
      }
    });
  };

  topSection = () => {
    return (
      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <div style={{ width: "400px" }}>
          <div className="comparetitle">Compare</div>

          <div>{this.state.id.length} items selected</div>
          <div style={{ marginTop: "50%" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.showDifference}
                  onChange={this.handleShowDifference}
                />
              }
              label="Show only differences"
            />
          </div>
        </div>
        {this.state.compareSummary.length !== 0 &&
          this.state.id.map((product, index) => (
            <>
              <div className="imageSection">
                <ClearIcon
                  style={{ display: index == 0 ? "none" : "inherit" }}
                  onClick={() => this.handleDelete(product)}
                />
                <img
                  className="image"
                  src={this.state.compareSummary.images[product]}
                />
                <div>{this.state.compareSummary.titles[product].title}</div>
                <div>
                  <span style={{ fontSize: "22px", padding: "4%" }}>
                    &#8377;{" "}
                    {
                      this.state.compareSummary.productPricingSummary[product]
                        .finalPrice
                    }
                  </span>
                  <span className="price">
                    {
                      this.state.compareSummary.productPricingSummary[product]
                        .price
                    }
                  </span>
                  <span className="discount">
                    {
                      this.state.compareSummary.productPricingSummary[product]
                        .totalDiscount
                    }
                    % off
                  </span>
                </div>
              </div>
            </>
          ))}
        <div style={{ marginTop: "2%" }}>
          <div
            style={{ width: "200px", height: "200px", background: "grey" }}
          ></div>
          {/* Add a product */}
          <FormControl>
            <InputLabel>Choose a product</InputLabel>
            <Select
              style={{ width: "400px" }}
              native
              onChange={this.handleTitle}
              label="Select Product"
            >
              <option aria-label="None" value="" />
              {this.props.compareSummary &&
                Object.keys(
                  this.props.compareSummary.titles
                ).map((title, index) =>
                  !this.state.id.includes(title) ? (
                    <option value={title}>
                      {this.props.compareSummary.titles[title].title}
                    </option>
                  ) : null
                )}
            </Select>
          </FormControl>
        </div>
      </div>
    );
  };

  render() {
    return (
      <Paper className="homepage">
        {this.topSection()}
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          {this.state.featuresList.length !== 0 && (
            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
              {this.state.featuresList.map((feature) => (
                <>
                  {" "}
                  <div className="featureTitle">{feature.title}</div>
                  {feature.features.map((item) => (
                    <div
                      style={{ display: "flex", flexDirection: "row", flex: 1 }}
                    >
                      <div className="featureValue">{item.featureName}</div>

                      {this.state.id.map((product) => (
                        <>
                          <div className="featureValue">
                            {item.properties &&
                            item.properties.isDifferent &&
                            this.state.showDifference
                              ? null
                              : item.values[product]}
                          </div>
                        </>
                      ))}
                    </div>
                  ))}
                </>
              ))}
            </div>
          )}
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.reducer.products,
    featuresList: state.reducer.featuresList,
    compareSummary: state.reducer.compareSummary,
  };
};

export default connect(mapStateToProps)(App);
