import React, { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { updateWeb3, getNetwork, getCustomRpc } from "../reducers/application";
import { NETWORK_TYPES } from "../config";

const divBase = css`
  border-radius: 50px;
  padding: 0.2em 0.5em;
`;

class AdminContainer extends Component {
  constructor(props) {
    super(props);

    this.handleNetworkChange = this.handleNetworkChange.bind(this);
  }

  handleNetworkChange(e) {
    this.props.updateWeb3({
      network: e.target.value
    });
  }

  render() {
    const { INJECTED, LEDGER_MAIN, LEDGER_ROPSTEN } = NETWORK_TYPES;

    return (
      <React.Fragment>
        <div className="fr ba" css={css(divBase)}>
          <select
            className="pa2 provider-selector"
            value={this.props.network}
            onChange={this.handleNetworkChange}
          >
            <option value={INJECTED}>Metamask</option>
            <option value={LEDGER_MAIN}>Ledger Nano (Mainnet)</option>
            <option value={LEDGER_ROPSTEN}>Ledger Nano (Ropsten)</option>
          </select>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  network: getNetwork(store),
  customRpc: getCustomRpc(store)
});

const mapDispatchToProps = dispatch => ({
  updateWeb3: payload => dispatch(updateWeb3(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer);

AdminContainer.propTypes = {
  network: PropTypes.string,
  customRpc: PropTypes.string,
  updateWeb3: PropTypes.func
};
