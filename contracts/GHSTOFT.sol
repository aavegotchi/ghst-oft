// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { OFT } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFT.sol";

import { IOptimismMintableERC20 } from "./interfaces/IOptimismMintableERC20.sol";

import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";

contract GHSTOFT is OFT, IOptimismMintableERC20 {
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        address _delegate,
        address _bridge,
        address _remoteToken
    ) OFT(_name, _symbol, _lzEndpoint, _delegate) Ownable(_delegate) {
        BRIDGE = _bridge;
        REMOTE_TOKEN = _remoteToken;
    }

    ///OptimismMintable functions///

    /// @notice Address of the StandardBridge on this network.
    address public immutable BRIDGE;

    /// @notice Address of the corresponding version of this token on the remote chain.
    address public immutable REMOTE_TOKEN;

    /// @notice Emitted whenever tokens are minted for an account.
    /// @param account Address of the account tokens are being minted for.
    /// @param amount  Amount of tokens minted.
    event Mint(address indexed account, uint256 amount);

    /// @notice Emitted whenever tokens are burned from an account.
    /// @param account Address of the account tokens are being burned from.
    /// @param amount  Amount of tokens burned.
    event Burn(address indexed account, uint256 amount);

    /// @notice A modifier that only allows the bridge to call.
    modifier onlyBridge() {
        require(msg.sender == BRIDGE, "GHSTOFT: only bridge can mint and burn");
        _;
    }

    /// @custom:legacy
    /// @notice Legacy getter for REMOTE_TOKEN.
    function remoteToken() public view returns (address) {
        return REMOTE_TOKEN;
    }

    /// @custom:legacy
    /// @notice Legacy getter for BRIDGE.
    function bridge() public view returns (address) {
        return BRIDGE;
    }

    /// @notice ERC165 interface check function.
    /// @param _interfaceId Interface ID to check.
    /// @return Whether or not the interface is supported by this contract.
    function supportsInterface(bytes4 _interfaceId) external pure virtual returns (bool) {
        bytes4 iface1 = type(IERC165).interfaceId;
        // Interface corresponding to the updated OptimismMintableERC20 (this contract).
        bytes4 iface2 = type(IOptimismMintableERC20).interfaceId;
        return _interfaceId == iface1 || _interfaceId == iface2;
    }

    /// @notice Allows the StandardBridge on this network to mint tokens.
    /// @param _to     Address to mint tokens to.
    /// @param _amount Amount of tokens to mint.
    function mint(address _to, uint256 _amount) external virtual override(IOptimismMintableERC20) onlyBridge {
        _mint(_to, _amount);
        emit Mint(_to, _amount);
    }

    /// @notice Prevents tokens from being withdrawn to L1.
    function burn(address _from, uint256 _amount) external virtual override(IOptimismMintableERC20) onlyBridge {
        _burn(_from, _amount);
        emit Burn(_from, _amount);
    }
}
