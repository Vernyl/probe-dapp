// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ProbeContract {
    address public owner;
    mapping(address => uint256[]) public mediaTasks;

    constructor() {
        owner = msg.sender;
    }

    struct ReviewTask {
        address owner;
        string title;
        string url;
        string description;
        string feedback;
        uint8 rating;
        bool reviewed;
    }

    ReviewTask[] public reviewTasks;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    modifier onlyReviewers() {
        require(msg.sender != owner, "Contract owner cannot perform this action");
        _;
    }

    function submitReviewTask(string memory _title, string memory _url, string memory _description) external {
        require(bytes(_title).length > 0 && bytes(_url).length > 0 && bytes(_description).length > 0, "Title, URL, and description cannot be empty");

        reviewTasks.push(ReviewTask({
            owner: msg.sender,
            title: _title,
            url: _url,
            description: _description,
            feedback: '',
            rating: 0,
            reviewed: false
        }));

        uint256 taskIndex = reviewTasks.length - 1;
        mediaTasks[msg.sender].push(taskIndex);
    }

    function getReviewTaskCount() external view returns (uint256) {
        return reviewTasks.length;
    }

    function getReviewTask(uint256 _taskIndex) external view returns (address, string memory, string memory, string memory, string memory, uint8, bool) {
        require(_taskIndex < reviewTasks.length, "Invalid task index");
        ReviewTask storage task = reviewTasks[_taskIndex];
        return (task.owner, task.title, task.url, task.description, task.feedback, task.rating, task.reviewed);
    }

    function submitReview(uint256 _taskIndex, string memory _feedback, uint8 _rating) external onlyReviewers {
        require(_taskIndex < reviewTasks.length, "Invalid task index");
        require(!reviewTasks[_taskIndex].reviewed, "Task already reviewed");

        reviewTasks[_taskIndex].feedback = _feedback;
        reviewTasks[_taskIndex].rating = _rating;
        reviewTasks[_taskIndex].reviewed = true;
    }

    // Owner functions for CRUD operations
    function updateReview(uint256 _taskIndex, string memory _feedback, uint8 _rating) external onlyOwner {
        require(_taskIndex < reviewTasks.length, "Invalid task index");
        require(!reviewTasks[_taskIndex].reviewed, "Task already reviewed");

        reviewTasks[_taskIndex].feedback = _feedback;
        reviewTasks[_taskIndex].rating = _rating;
    }

    function deleteReview(uint256 _taskIndex) external onlyOwner {
        require(_taskIndex < reviewTasks.length, "Invalid task index");
        delete reviewTasks[_taskIndex];
    }

    // Owner function to change the contract owner
    function changeOwner(address _newOwner) external onlyOwner {
        owner = _newOwner;
    }
}
