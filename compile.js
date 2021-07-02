const path = require('path');
const fs = require('fs');
const solc = require('solc');



const helloPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(helloPath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const interface = output.contracts['Inbox.sol'].Inbox.abi;
const bytecode = output.contracts['Inbox.sol'].Inbox.evm.bytecode.object;

module.exports = {
    interface,
    bytecode,
};
