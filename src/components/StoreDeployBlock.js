import React, { Component } from "react";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import Input from "./UI/Input";
import { OrangeButton } from "./UI/Button";

class StoreDeployBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issuerName: "",
      degreeSerial:"",
      degreeHash:"",
      issuerNameIsValid: true
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onSerialChange = this.onSerialChange.bind(this);
    this.onHashChange = this.onHashChange.bind(this);
    this.onDeployClick = this.onDeployClick.bind(this);
  }

  onNameChange(event) {
    this.setState({
      issuerName: event.target.value,
      issuerIsValid: isEmpty(event.target.value)
    });
  }

  onSerialChange(event) {
    this.setState({
      degreeSerial: event.target.value,
      issuerIsValid: isEmpty(event.target.value)
    });
  }

  onHashChange(event) {
    this.setState({
      degreeHash: event.target.value,
      issuerIsValid: isEmpty(event.target.value)
    });
  }

  onDeployClick() {
    const { handleStoreDeploy } = this.props;
    const { issuerName } = this.state;
    if (!isEmpty(issuerName)) {
      handleStoreDeploy({
        name: issuerName
      });
    } else {
      this.setState({
        issuerIsValid: isEmpty(issuerName)
      });
    }
  }

  render() {
    const { issuerIsValid, issuerName, degreeHash, degreeSerial } = this.state;
    const { deploying, deployedTx, networkId, storeAddress } = this.props;

    const inputMessage = issuerIsValid ? "Issuer name cannot be empty." : "";
    const inputSerialMessage = issuerIsValid ? "Số văn bằng không được để trống." : "";
    const inputHashMessage = issuerIsValid ? "Mã hash không được để trống" : "";

    return (
      <div className="w-100">
        <div className="mb4">
          <div>
            Mã văn bằng (Serial Number)
            <br />
            <Input
              className="mt2"
              variant="pill"
              type="text"
              placeholder="Mã văn bằng"
              onChange={this.onSerialChange}
              value={degreeSerial}
              message={inputSerialMessage}
              size={50}
              required
            />
          </div>
        </div>

        <div className="mb4">
          <div>
            Mã hash của văn bằng
            <br />
            <Input
              className="mt2"
              variant="pill"
              type="text"
              placeholder="Mã hash của văn bằng"
              onChange={this.onHashChange}
              value={degreeHash}
              message={inputHashMessage}
              size={50}
              required
            />
          </div>
        </div>

        <div className="mb4">
          <div>
            Issuer Name
            <br />
            <Input
              className="mt2"
              variant="pill"
              type="text"
              placeholder="Name of organization"
              onChange={this.onNameChange}
              value={issuerName}
              message={inputMessage}
              size={50}
              required
            />
          </div>
        </div>

        <OrangeButton
          variant="pill"
          onClick={this.onDeployClick}
          disabled={deploying}
        >
          {deploying ? "Deploying…" : "Deploy"}
        </OrangeButton>

        {deployedTx ? (
          <div className="mt5">
            <div>
              🎉 New store deployed at
              <HashColor hashee={storeAddress} type="address" />
            </div>
            <div className="mt2">
              Transaction ID
              <HashColor hashee={deployedTx} isTx networkId={networkId} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default StoreDeployBlock;

StoreDeployBlock.propTypes = {
  storeAddress: PropTypes.string,
  deploying: PropTypes.bool,
  deployedTx: PropTypes.string,
  networkId: PropTypes.number,
  handleStoreDeploy: PropTypes.func
};
