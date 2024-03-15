// eslint-disable-next-line @typescript-eslint/no-var-requires
import { EndpointId } from '@layerzerolabs/lz-definitions'

// const sepoliaContract = {
//     eid: EndpointId.SEPOLIA_V2_TESTNET,
//     contractName: 'MyOFT',
// }

// const fujiContract = {
//     eid: EndpointId.AVALANCHE_V2_TESTNET,
//     contractName: 'MyOFT',
// }

// const mumbaiContract = {
//     eid: EndpointId.POLYGON_V2_TESTNET,
//     contractName: 'MyOFT',
// }

// const localGHSTOFT = {
//     eid: EndpointId.BASE_MAINNET,
//     contractName: 'GHSTOFT',
// }

const mainGHSTOFT = {
    eid: EndpointId.BASE_MAINNET,
    contractName: 'GHSTOFT',
}

// const localGHSTAdapter = {
//     eid: EndpointId.POLYGON_MAINNET,
//     contractName: 'GHSTOFTAdapter',
// }

const mainGHSTAdapter = {
    eid: EndpointId.POLYGON_MAINNET,
    contractName: 'GHSTOFTAdapter',
}

export default {
    contracts: [
        // {
        //     contract: fujiContract,
        // },
        // {
        //     contract: sepoliaContract,
        // },
        // {
        //     contract: mumbaiContract,
        // },
        // {
        //     contract: localGHSTOFT,
        // },
        {
            contract: mainGHSTOFT,
        },
        // {
        //     contract: localGHSTAdapter,
        // },
        {
            contract: mainGHSTAdapter,
        },
    ],

    connections: [
        // {
        //     from: fujiContract,
        //     to: sepoliaContract,
        //     config: {},
        // },
        // {
        //     from: fujiContract,
        //     to: mumbaiContract,
        // },
        // {
        //     from: sepoliaContract,
        //     to: fujiContract,
        // },
        // {
        //     from: sepoliaContract,
        //     to: mumbaiContract,
        // },
        // {
        //     from: mumbaiContract,
        //     to: sepoliaContract,
        // },
        {
            from: mainGHSTAdapter, //polygon ghst proxy
            to: mainGHSTOFT, //base ghst OFT
        },
    ],
}
