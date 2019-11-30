import React, { Component } from "react";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import { OrangeButton } from "./UI/Button";
import Input from "./UI/Input";

class AddDegreeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degreeSerial:"",
      degreeHash:"",
    };

    this.onAddClick = this.onAddClick.bind(this);

    this.onSerialChange = this.onSerialChange.bind(this);
    this.onHashChange = this.onHashChange.bind(this);
  }

  onSerialChange(event) {
    this.setState({
      degreeSerial: event.target.value,
    });
  }

  onHashChange(event) {
    this.setState({
      degreeHash: event.target.value,
    });
  }


 

  onAddClick(){
    const { handleAddDegree} = this.props;
    const { degreeSerial, degreeHash} = this.state;
      handleAddDegree({
        degreeSerial,
        degreeHash
      });
  }

  render() {
    const inputSerialMessage = "" ? "Số văn bằng không được để trống." : "";
    const inputHashMessage = "" ? "Mã hash không được để trống" : "";

    const { degreeSerial, degreeHash } = this.state;
    const { addingDegree, issuedTx, networkId } = this.props;
    
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
        <OrangeButton
          variant="pill"
          className="mt4"
          onClick={this.onAddClick}
          disabled={addingDegree}
        >
          {addingDegree ? "Đang lưu thông tin ..." : "Lưu thông tin"}
        </OrangeButton>

        {issuedTx && !addingDegree ? (
          <div className="mt5">
            <p>🎉 Chứng chỉ đã được thêm vào Blockchain</p>
            <div>
              Mã giao dịch{" "}
              <HashColor hashee={issuedTx} networkId={networkId} isTx />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AddDegreeBlock;

AddDegreeBlock.propTypes = {
  addingDegree: PropTypes.bool,
  issuedTx: PropTypes.string,
  handleAddDegree: PropTypes.func,
  networkId: PropTypes.number
};
