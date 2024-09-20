// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserInfo {

    struct User {
        string name;
        string address;
        uint256 dateOfBirth;
        bool exists;
    }

    mapping(address => User) private users;

    function getUserInfo() public view returns (string memory, string memory, uint256) {
        return (users[msg.sender].exists, "User not registered.");

        User memory user = users[msg.sender];
        return(user.name, user.address, user.dateOfBirth);
    }

    function registerUser(string memory _name, string memory _address, uint256 _dateOfBirth) public {
        require(!users[msg.sender].exists, "User already registered.");
        
        users[msg.sender] = User({
            name: _name,
            addr: _addr,
            dateOfBirth: _dateOfBirth,
            exists: true
        });
    }


    function isUserRegistered() public view returns(bool){
        return users[msg.sender].exists; 
    }





