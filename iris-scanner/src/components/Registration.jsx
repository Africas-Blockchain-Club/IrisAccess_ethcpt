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
    const [isConnected, setIsConnected] = useState(false);
    const [accounts, setAccounts] = useState([]);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                const accounts = await web3Instance.eth.requestAccounts();
                setAccounts(accounts);
                const contractInstance = userContract(web3Instance);
                setContract(contractInstance);
                setIsConnected(true);
                setMessage("Wallet connected successfully!");
            } catch (error) {
                console.error(error);
                setMessage("Failed to connect wallet: " + error.message);
            }
        } else {
            console.error('Web3 not found');
            setMessage('Web3 provider not found. Please install MetaMask.');
        }
    };

    useEffect(() => {
        if (contract) {
            checkRegistration();
        }
    }, [contract]);

    useEffect(() => {
        const handleAccountsChanged = (accounts) => {
            if (accounts.length === 0) {
                setIsConnected(false);
                setAccounts([]);
                setMessage("Please connect to MetaMask.");
            } else {
                setAccounts(accounts);
                setIsConnected(true); // Update connection state
                setMessage("Wallet connected successfully!");
            }
        };

        const handleChainChanged = () => {
            window.location.reload();
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
        };
    }, []);

    const checkRegistration = async () => {
        if (!contract || !isConnected) return;

        try {
            const registered = await contract.methods.isUserRegistered().call({ from: accounts[0] });
            if (registered) {
                window.location.href = '/scanner'; // Redirect if already registered
            }
        } catch (error) {
            console.error("Registration check error:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dobTimestamp = new Date(dateOfBirth).getTime() / 1000;

        try {
            if (!contract) {
                setMessage("Contract is not set. Please connect your wallet.");
                return;
            }

            await contract.methods.registerUser(name, address, dobTimestamp).send({ from: accounts[0] });
            setMessage("Registration successful! Redirecting to the iris scanner...");
            setTimeout(() => {
                window.location.href = '/scanner';
            }, 2000);
        } catch (error) {
            console.error("Registration error:", error);
            if (error.code === 4001) {
                setMessage("User denied transaction signature.");
            } else {
                setMessage("Registration failed: " + error.message);
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '10px', height: '100vh', overflowY: 'auto' }}>
            <h1 style={{ marginBottom: '10px' }}>User Registration</h1>
            <form onSubmit={handleSubmit} style={{ width: '300px', display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    style={{ marginBottom: '5px', padding: '8px' }}
                />
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    required
                    style={{ marginBottom: '5px', padding: '8px' }}
                />
                <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                    style={{ marginBottom: '10px', padding: '8px' }}
                />
                <p style={{ marginBottom: '10px', textAlign: 'center' }}>{message}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <button type="button" onClick={connectWallet} disabled={isConnected} style={{ padding: '5px 10px', fontSize: '12px' }}>
                        {isConnected ? "Wallet Connected" : "Connect Wallet"}
                    </button>
                    <button type="submit" disabled={!isConnected} style={{ padding: '5px 10px', fontSize: '12px' }}>
                        Register
                    </button>
                </div>
            </form>
            <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Your camera box component will go here */}
            </div>
        </div>
    );
};

export default Registration;
