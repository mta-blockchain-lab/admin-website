import { Component } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadAdminAddress } from "../reducers/admin";
import { OrangeOutlineButton, OrangeButton } from "./UI/Button";
import Panel from "./UI/Panel";
import WalletProviderSelector from "./WalletProviderSelector";

const walletError = css`
  margin: "auto";
  width: "70%";
  text-align: "center";
  align-items: "middle";
  padding: "10px";
`;

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.toggleWalletProviderSelector = this.toggleWalletProviderSelector.bind(
      this
    );

    this.state = {
      showWalletProviderSelector: false
    };
  }

  toggleWalletProviderSelector() {
    this.setState({
      showWalletProviderSelector: !this.state.showWalletProviderSelector
    });
  }

  render() {
    const { showWalletProviderSelector } = this.state;
    return (
      <Panel style={{ textAlign: "center" }}>
        <div css={css(walletError)}>
          <img
            src={"../../static/images/wallet-error.svg"}
            style={{ width: "165px" }}
          />
          <h1>Không thể tương tác với blockchain do vấn đề về ví</h1>
          {!showWalletProviderSelector ? (
            <div>
              <p>
                Liên hệ {" "}
                <a href="http://fit.mta.edu.vn/">
                  here
                </a>{" "}
                để được hỗ trợ
              </p>
              <OrangeButton
                variant="pill"
                onClick={this.toggleWalletProviderSelector}
                className="danger"
              >
                Thay đổi ví
              </OrangeButton>
              <OrangeOutlineButton
                variant="pill"
                onClick={() => this.props.loadAdminAddress()}
              >
                Thử lại
              </OrangeOutlineButton>
            </div>
          ) : (
            <div>
              <p>Chọn nhà cung cấp ví khác</p>
              <WalletProviderSelector />
            </div>
          )}
        </div>
      </Panel>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadAdminAddress: payload => dispatch(loadAdminAddress(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(ErrorPage);

ErrorPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  rest: PropTypes.object,
  loadAdminAddress: PropTypes.func
};
