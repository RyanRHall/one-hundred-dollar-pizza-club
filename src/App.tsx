import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { LinkTokenFactory } from '@chainlink/contracts/ethers/v0.4/LinkTokenFactory'
import { ethers } from 'ethers'

// @ts-ignore
window.ethereum.enable()
// @ts-ignore
const provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
const signer = provider.getSigner()

const linkTokenFactory = new LinkTokenFactory(signer)

const enroll = async () => {
  const address = await signer.getAddress()
  const transferAndCallData =
    // @ts-ignore
    web3.sha3('onTokenTransfer(address,uint256,bytes)').substring(0, 10) +
    ethers.utils.AbiCoder.prototype
      .encode(['address', 'uint256'], [address, 25])
      .slice(2)

  await linkTokenFactory
    .connect(signer)
    .attach('0xa36085f69e2889c224210f603d836748e7dc0088')
    .transferAndCall(await signer.getAddress(), 25, transferAndCallData)
}

function App() {
  const [enrolled, setEnrolled] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {enrolled ? <Enrolled /> : <Enroll setEnrolled={setEnrolled} />}
      </header>
    </div>
  )
}

function Enroll({ setEnrolled }: any) {
  const handleEnroll = async () => {
    await enroll()
    setEnrolled(true)
  }
  return (
    <>
      <p>One Hundred Dollar Pizza Club</p>
      <p>
        <button className="App-button" onClick={handleEnroll}>
          Enroll
        </button>
      </p>
    </>
  )
}

function Enrolled() {
  return (
    <>
      <p>Welcome to the club :)</p>
      <p>Your first pizza is on the way!</p>
    </>
  )
}

export default App
