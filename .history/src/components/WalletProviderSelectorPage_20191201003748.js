import React from "react";
import Panel from "./UI/Panel";
import WalletProviderSelector from "./WalletProviderSelector";

const WalletProviderSelectorPage = () => (
  <Panel id="network-selector" style={{ textAlign: "center" }}>
    <img src="/static/images/logo.svg" style={{ maxWidth: 300 }} />
    <h1>Hệ thống quản lý văn bằng phân tán - Trang quản trị</h1>
    <p>Lựa chọn loại ví cho mạng</p>
    <WalletProviderSelector />
  </Panel>
);

export default WalletProviderSelectorPage;
