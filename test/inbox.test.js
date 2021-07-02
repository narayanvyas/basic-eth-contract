const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');
let inbox;
let accounts;

beforeEach(async()=>{
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // Use one of those account to deploy contract

    inbox = await new web3.eth.Contract(interface).deploy({data: bytecode, arguments: ['Hi There']})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', ()=>{
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async() => {
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, 'Hi There');
    });

    it('has updated new message', async() => {
        await inbox.methods.setMessage('New Message').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, 'New Message');
    });
});