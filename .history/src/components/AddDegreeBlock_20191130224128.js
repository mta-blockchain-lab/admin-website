import React, { Component } from "react";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import HashColorInput from "./UI/HashColorInput";
import { OrangeButton } from "./UI/Button";
import { isValidCertificateHash } from "./utils";

class AddDegreeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateHash: "",
      degreeSerial:"",
      degreeHash:"",
      isValidInput: true
    };

    this.onIssueClick = this.onIssueClick.bind(this);

    this.onSerialChange = this.onSerialChange.bind(this);
    this.onHashChange = this.onHashChange.bind(this);
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


 

  onAddClick(){
    const { handleAddDegree} = this.props;
    const { degreeSerial, degreeHash} = this.state;
    if (isValidInput(degreeSerial, degreeHash)) {
      handleAddDegree({
        degreeSerial,
        degreeHash
      });
    } else {
      this.setState({
        certificateHashIsValid: isValidCertificateHash(certificateHash)
      });
    }
  }

  render() {
    const inputSerialMessage = issuerIsValid ? "Số văn bằng không được để trống." : "";
    const inputHashMessage = issuerIsValid ? "Mã hash không được để trống" : "";

    const { degreeSerial, degreeHash, isValidInput } = this.state;
    const { issuingCertificate, issuedTx, networkId } = this.props;
    
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
          onClick={this.onIssueClick}
          disabled={issuingCertificate}
        >
          {issuingCertificate ? "Đang lưu thông tin ..." : "Lưu thông tin"}
        </OrangeButton>

        {issuedTx && !issuingCertificate ? (
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
  issuingCertificate: PropTypes.bool,
  issuedTx: PropTypes.string,
  storeAddress: PropTypes.string,
  handleAddDegree: PropTypes.func,
  networkId: PropTypes.number
};
