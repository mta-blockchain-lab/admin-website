import * as React from "react";
import * as PropTypes from "prop-types";

// TODO: validation, use direct address hash instead of toHashCode
export default class HashColor extends React.Component {
  render() {
    if (this.props.hashee == null) {
      if (this.props.children == null) {
        return <div>Unknown</div>;
      }

      return this.props.children;
    }

    function chunkString(str, size = 99999) {
      if (!str) {
        return [];
      }

      if (str.length === 1) {
        return [str];
      }

      const re = new RegExp(`.{1,${size}}`, "g");
      return str.match(re);
    }

    const lineLength = Math.floor(this.props.hashee.length / this.props.lines);
    const chunks = chunkString(this.props.hashee, lineLength);

    return (
      <div
        className={["__hashcolor", this.props.clickable ? "copy" : ""].join(
          " "
        )}
        style={{
          color: this.props.color
            ? HashColor.color(this.props.hashee)
            : "inherit",
          wordBreak: "break-all"
        }}
        onClick={
          this.props.clickable
            ? () => {
                HashColor.viewOnEtherscan(
                  this.props.hashee,
                  this.props.networkId,
                  this.props.isTx
                );
                if (this.props.children) {
                  this.children.focus();
                }
              }
            : null
        }
        title={this.props.clickable ? "View wallet information" : ""}
      >
        {this.props.children
          ? this.props.children
          : chunks.map(c => <div key={c}>{c}</div>)}
        <style jsx>
          {`
            .__hashcolor {
              transition: color 0.1s ease-in;
            }

            .copy {
              cursor: pointer;
            }

            .copy:hover {
              text-decoration: underline;
            }

            .copy:active {
              filter: brightness(150%);
            }
          `}
        </style>
      </div>
    );
  }

  static copyToClipboard(content) {
    const textField = document.createElement("textarea");
    textField.innerText = content;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  }

  static viewOnEtherscan(hash, networkId, isTx) {
    let url;
    switch (networkId) {
      case 4:
        url = isTx
          ? `https://rinkeby.etherscan.io/tx/${hash}`
          : `https://rinkeby.etherscan.io/address/${hash}`;
        break;
      case 3:
        url = isTx
          ? `https://ropsten.etherscan.io/tx/${hash}`
          : `https://ropsten.etherscan.io/address/${hash}`;
        break;
      case 42:
        url = isTx
          ? `https://kovan.etherscan.io/tx/${hash}`
          : `https://kovan.etherscan.io/address/${hash}`;
        break;
      default:
        HashColor.copyToClipboard(hash);
        return;
    }
    const win = window.open(url, "_blank");
    win.focus();
  }

  static color(addr) {
    return `hsl(${Math.abs(HashColor.toHashCode(addr) % 190) + 80}, 90%, 35%)`; // random colour excluding reds
  }

  static toHashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
      hash += (str.charCodeAt(i) * 31) ** (str.length - i);
      // Convert to 32bit integer
      hash = hash & hash; // eslint-disable-line
    }
    return hash;
  }
}

HashColor.propTypes = {
  isTx: PropTypes.bool,
  networkId: PropTypes.number,
  clickable: PropTypes.bool,
  color: PropTypes.bool,
  children: PropTypes.element,
  hashee: PropTypes.string,
  lines: PropTypes.number,
  hashType: PropTypes.string
};

HashColor.defaultProps = {
  clickable: true,
  color: true,
  lines: 1
};
