const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
let accounts;

const provider = new HDWalletProvider(
    'sister argue awake atom raccoon judge pig kick pear gasp earn fly',
    'https://rinkeby.infura.io/v3/68cda400740645f79a35d7fedd77c5fe'
);

const web3 = new Web3(provider);

const deploy = async() => {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);

    const result = await new web3.eth.Contract(interface)
        .deploy({data: bytecode, arguments: ['Hi There']})
        .send({gas: 1000000, from: accounts[0]});

    console.log('Contract Deployed To: ', result.options.address);
}

deploy();