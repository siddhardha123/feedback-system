const { ethers } = require('ethers');
const { contractAddress } = require('./config');
const abi = require('./abi.json');


// Contract ABI
console.log(abi);

// Connect to the contract
const contract = new ethers.Contract(contractAddress, abi, provider);

// Example of calling a contract function (addFeedback)
async function addFeedback(userAddress, faculty, subject) {
    // Assume userAddress, faculty, and subject are strings
    try {
        const signer = provider.getSigner();
        const result = await contract.connect(signer).addFeedback(userAddress, faculty, subject);
        console.log('Transaction hash:', result.hash);
        console.log('Feedback added successfully');
    } catch (error) {
        console.error('Error adding feedback:', error);
    }
}

// Example of calling a contract function (getAllFeedbacks)
async function getAllFeedbacks() {
    try {
        const feedbacks = await contract.getAllFeedbacks();
        console.log('All feedbacks:', feedbacks);
    } catch (error) {
        console.error('Error getting feedbacks:', error);
    }
}

addFeedback('0xUserAddress', 'Faculty', 'Subject')
    .then(() => getAllFeedbacks())
    .catch(error => console.error(error));
