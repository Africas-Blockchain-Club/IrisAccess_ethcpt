import React, { useState, useEffect } from "react";
import Web3 from "web3";
import userContract from "../contracts/userContract"; // Ensure this path is correct

const Registration = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [message, setMessage] = useState('');
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const initWeb3 = async () => {
            const web3Instance = new Web3(Web3.givenProvider || "http://localhost:8545");
            setWeb3(web3Instance);

            const contractInstance = userContract(web3Instance);
            setContract(contractInstance);
        };
        initWeb3();
    }, []);

    const checkRegistration = async () => {
        if (!contract) return;

        const accounts = await web3.eth.requestAccounts();
        const registered = await contract.methods.isUserRegistered().call({ from: accounts[0] });

        if (registered) {
            window.location.href = '/scanner'; // Redirect if already registered
        }
    };

    useEffect(() => {
        checkRegistration();
    }, [contract]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dobTimestamp = new Date(dateOfBirth).getTime() / 1000;

        try {
            const accounts = await web3.eth.requestAccounts();
            await contract.methods.registerUser(name, address, dobTimestamp).send({ from: accounts[0] });
            setMessage("Registration successful! Redirecting to the iris scanner...");
            setTimeout(() => {
                window.location.href = '/scanner';
            }, 2000);
        } catch (error) {
            setMessage("Registration failed: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>User Registration</h1>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
            <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
            <button type="submit">Register</button>
            <p>{message}</p>
        </form>
    );
};

export default Registration;
