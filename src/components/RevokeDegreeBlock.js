import React, { Component } from "react";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import { OrangeButton } from "./UI/Button";
import Input from "./UI/Input";

class RevokeDegreeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degreeSerial:"",
      degreeSerialIsValid: true,
    };

    this.onSerialChange = this.onSerialChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);

  }

  onSerialChange(event) {
    this.setState({
      degreeSerial: event.target.value,
      degreeSerialIsValid: isEmpty(event.target.value)
    });
  }

  


 

  onAddClick(){
    const { handleRevokeDegree} = this.props;
    const { degreeSerial} = this.state;

      
      if (!isEmpty(degreeSerial)) {
        handleRevokeDegree({
          degreeSerial,
        });
      } else {
        this.setState({
          degreeSerialIsValid: isEmpty(degreeSerial)
        });
      }
  }

  render() {
    const {degreeSerialIsValid,  degreeSerial } = this.state;
    const { revokingDegree, revokedTx, networkId } = this.props;
    
    const inputSerialMessage = degreeSerialIsValid ? "Số văn bằng không được để trống." : "";

 
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

       <OrangeButton
          variant="pill"
          className="mt4"
          onClick={this.onAddClick}
          disabled={revokingDegree}
        >
          {revokingDegree ? "Đang thu hồi ..." : "Thu hồi"}
        </OrangeButton>

        {revokedTx && !revokingDegree ? (
          <div className="mt5">
            <p>🎉 Văn bằng đã được thu hồi được thêm vào Blockchain</p>
            <div>
              Mã giao dịch{" "}
              <HashColor hashee={revokedTx} isTx networkId={networkId}/>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default RevokeDegreeBlock;

RevokeDegreeBlock.propTypes = {
  revokingDegree: PropTypes.bool,
  revokedTx: PropTypes.string,
  handleRevokeDegree: PropTypes.func,
  networkId: PropTypes.number
};
