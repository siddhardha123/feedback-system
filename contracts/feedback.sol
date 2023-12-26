// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FeedbackSystem {
    address public admin;
    mapping(uint256 => string[]) public feedbacks; // Mapping of formID to feedback data
    uint256[] private formIDs;

    constructor() {
        admin = msg.sender; // Set the deployer as the admin
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function addFormID(uint256 _formID) public onlyAdmin {
        formIDs.push(_formID);
    }

    function addFeedback(uint256 _formID, string memory _feedbackData) public {
        feedbacks[_formID].push(_feedbackData);
    }

    function getAllForms(uint256 _formID) public view returns (string[] memory) {
        return feedbacks[_formID];
    }
}
