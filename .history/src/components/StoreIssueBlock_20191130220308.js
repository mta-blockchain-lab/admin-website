import React, { Component } from "react";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import HashColorInput from "./UI/HashColorInput";
import { OrangeButton } from "./UI/Button";
import { isValidCertificateHash } from "../components/utils";

class StoreIssueBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateHash: "",
      certificateHashIsValid: true
    };

    this.onHashChange = this.onHashChange.bind(this);
    this.onIssueClick = this.onIssueClick.bind(this);
  }

  onHashChange(event) {
    this.setState({
      certificateHash: event.target.value,
      certificateHashIsValid: isValidCertificateHash(event.target.value)
    });
  }

  onIssueClick() {
    const { storeAddress, handleCertificateIssue } = this.props;
    const { certificateHash } = this.state;
    if (isValidCertificateHash(certificateHash)) {
      handleCertificateIssue({
        storeAddress,
        certificateHash
      });
    } else {
      this.setState({
        certificateHashIsValid: isValidCertificateHash(certificateHash)
      });
    }
  }

  render() {
    const { certificateHash, certificateHashIsValid } = this.state;
    const { issuingCertificate, issuedTx, networkId } = this.props;
    const certificateHashMessage = certificateHashIsValid
      ? ""
      : "Merkle root is not valid.";

    return (
      <div>
        <div>
          Issue certificates with the Merkle Root Hash
          <HashColorInput
            className="mt2"
            variant="pill"
            type="hash"
            hashee={certificateHash}
            onChange={this.onHashChange}
            value={certificateHash}
            message={certificateHashMessage}
            placeholder="0x…"
          />
        </div>
        <OrangeButton
          variant="pill"
          className="mt4"
          onClick={this.onIssueClick}
          disabled={issuingCertificate}
        >
          {issuingCertificate ? "Đang tiến hành lưu trữ..." : "Đã lưu trữ"}
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

export default StoreIssueBlock;

StoreIssueBlock.propTypes = {
  issuingCertificate: PropTypes.bool,
  issuedTx: PropTypes.string,
  storeAddress: PropTypes.string,
  handleCertificateIssue: PropTypes.func,
  networkId: PropTypes.number
};
