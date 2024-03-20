// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Feedback {
    struct FeedbackEntry {
        string userAddress;
        string faculty;
        string subject;
    }
    
    FeedbackEntry[] public feedbacks;

    // Function to add feedback
    function addFeedback(string memory _userAddress, string memory _faculty, string memory _subject) public {
        FeedbackEntry memory newFeedback;
        newFeedback.userAddress = _userAddress;
        newFeedback.faculty = _faculty;
        newFeedback.subject = _subject;
        
        feedbacks.push(newFeedback);
    }

    // Function to get all feedbacks
    function getAllFeedbacks() public view returns (FeedbackEntry[] memory) {
        return feedbacks;
    }
}
