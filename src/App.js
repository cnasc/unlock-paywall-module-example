import React from 'react';
import logo from './logo.svg';
import { Paywall } from '@unlock-protocol/paywall';
import './App.css';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

let paywall;

async function startup () {
  console.log('starting up');
  const providerOptions = {
    /* See Provider Options Section */
    walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "8e53dac8bbb045d196e84c092fdb3704" // required
    }
  }
  };

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });

  const provider = await web3Modal.connect();


  //const config = {"unlockUserAccounts":true,"callToAction":{"default":"Become a member today and unlock this blog!"},"icon":"https://staging-app.unlock-protocol.com/static/images/svg/default.svg","locks":{"0x771e09a5bfef4c4b85d796a112d49e839c98d9da":{"name":" "},"0x3a892c7014cd05418e48ae516a6a9e700ccb3e39":{"name":" "}}};

  const config = {"unlockUserAccounts":true,"callToAction":{"default":"Become a member today and unlock this blog!"},"icon":"https://staging-app.unlock-protocol.com/static/images/svg/default.svg","locks":{"0x5958d124580813b714e4a4c6386a6e184f9c295d":{"name":" "},"0xbf75124def5d00e3165a5fc710df9fbcf3a7ebb9":{"name":" "}}};

  const moduleConfig = {
    unlockAppUrl: 'https://app.unlock-protocol.com',
    locksmithUri: 'https://locksmith.unlock-protocol.com',
    readOnlyProvider: 'https://eth-mainnet.alchemyapi.io/jsonrpc/6idtzGwDtRbzil3s6QbYHr2Q_WBfn100',
  };

  paywall = new Paywall(config, moduleConfig, provider);

  paywall.loadCheckoutModal();
}

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => paywall ? paywall.loadCheckoutModal() : startup()}>Check Out</button>
      </header>
    </div>
  );
}

export default App;
