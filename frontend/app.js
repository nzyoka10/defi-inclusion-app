// frontend/app.js

let contract;
let signer;

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your real address
const contractABI = [
  "function requestLoan(uint _amount) public",
  "function fundLoan(uint loanIndex) public payable",
  "function getLoansCount() public view returns (uint)"
];

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("connectBtn")) {
    document.getElementById("connectBtn").onclick = connectWallet;
  }
});

async function connectWallet() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    const address = await signer.getAddress();
    const display = document.getElementById("walletAddress");
    if (display) display.innerText = `Connected: ${address}`;
    alert("Wallet connected!");
  } else {
    alert("Please install MetaMask.");
  }
}

async function requestLoan() {
  const amountEth = document.getElementById("loanAmount").value;
  const amountWei = ethers.utils.parseEther(amountEth);
  try {
    const tx = await contract.requestLoan(amountWei);
    await tx.wait();
    document.getElementById("requestStatus").innerText = "Loan request sent!";
  } catch (err) {
    console.error(err);
    alert("Error sending loan request.");
  }
}

async function fundLoan() {
  const index = document.getElementById("loanIndex").value;
  const amount = document.getElementById("fundAmount").value;
  const value = ethers.utils.parseEther(amount);
  try {
    const tx = await contract.fundLoan(index, { value });
    await tx.wait();
    document.getElementById("fundStatus").innerText = "Loan funded!";
  } catch (err) {
    console.error(err);
    alert("Error funding loan.");
  }
}
