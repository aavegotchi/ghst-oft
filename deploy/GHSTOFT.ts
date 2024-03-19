import assert from 'assert'

import { type DeployFunction } from 'hardhat-deploy/types'

const contractName = 'GHSTOFT'

const deploy: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments } = hre

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    assert(deployer, 'Missing named deployer account')

    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)

    // This is an external deployment pulled in from @layerzerolabs/lz-evm-sdk-v2
    //
    // @layerzerolabs/toolbox-hardhat takes care of plugging in the external deployments
    // from @layerzerolabs packages based on the configuration in your hardhat config
    //
    // For this to work correctly, your network config must define an eid property
    // set to `EndpointId` as defined in @layerzerolabs/lz-definitions
    //
    // For example:
    //
    // networks: {
    //   fuji: {
    //     ...
    //     eid: EndpointId.AVALANCHE_V2_TESTNET
    //   }
    // }

    const L2CrossDomainMessenger = '0x4200000000000000000000000000000000000007'
    const ghstAddressonETH = '0x1906fd9c4AC440561F7197Da0A4BD2E88DF5fA70'
    const endpointV2Deployment = await hre.deployments.get('EndpointV2')

    const { address } = await deploy(contractName, {
        from: deployer,
        args: [
            'Aavegotchi GHST Token', // name
            'GHST', // symbol
            endpointV2Deployment.address, // LayerZero's EndpointV2 address
            deployer, // owner,
            //Base bridge init details
            L2CrossDomainMessenger,
            ghstAddressonETH,
        ],
        log: true,
        skipIfAlreadyDeployed: false,
    })

    console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
}

deploy.tags = [contractName]

export default deploy
