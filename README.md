# 👁️ Iris Access : Blockchain-based Data Management Capturer

## 📖 Overview 

**Iris Access** is a decentralized data management application that leverages blockchain technology and smart contracts to securely register and capture user iris data. By using this application, users can connect their MetaMask wallets, register their information, and securely capture their iris images, which are hashed for enhanced security. This project combines cutting-edge web technologies with blockchain to create a robust solution for identity verification and data management.


## 🌟 Features 

- 🦊 **MetaMask Integration**: Seamless connection with the MetaMask wallet for authentication and transaction signing.
- 📝 **User Registration**: Allows users to register their personal information including name, address, and date of birth.
- 👁️ **Iris Capture**: Capture iris images using the device camera and hash the images for secure storage.
- 🔒 **Blockchain Storage**: User data is stored on the blockchain, ensuring immutability and security.
- 📊 **Real-time Feedback**: Users receive immediate feedback on registration and capture processes.


## 🛠️ Tech Stack 

- **Frontend**: React.js
- **Blockchain**: Ethereum (Smart Contracts written in Solidity)
- **Web3**: For interacting with the Ethereum blockchain
- **Hashing Algorithm**: SHA-256 for hashing iris images


## 🚀 Getting Started 

### Prerequisites

- Node.js and npm installed on your machine.
- MetaMask wallet installed in your browser.
- Basic understanding of React.js and blockchain concepts.

### Installation ⚙️

1. **Install Node.js and npm**:

   To install Node.js and npm, follow these steps:

   **For Windows**:
   - Download the Node.js installer from [nodejs.org](https://nodejs.org/).
   - Run the installer and follow the prompts to install Node.js and npm.

   **For macOS**:
   - You can use Homebrew to install Node.js:
     ```bash
     brew install node
     ```

   **For Linux**:
   - Use the package manager to install Node.js and npm. For example, on Ubuntu:
     ```bash
     sudo apt update
     sudo apt install nodejs npm
     ```

   Verify the installation:
   ```bash
   node -v
   npm -v
   ```

2. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd iris-access
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Deploy the Smart Contract**:
   Make sure to deploy the `UserInfo` smart contract to your local Ethereum test network or use a service like Remix to deploy it. Update the `userContract` reference in `registration.jsx` to point to the deployed contract's address.

### 🏃‍♂️ Running the Application 

- Open your browser and navigate to `http://localhost:3000`.
- Connect your MetaMask wallet.
- Register your details and capture your iris.


## 📂 Code Structure 

### Components

1. **IrisScanner.jsx**
   - Responsible for accessing the webcam and capturing iris images.
   - Utilizes the `handleCapture` method to process the captured image and hash it using the SHA-256 algorithm.

2. **Registration.jsx**
   - Handles user registration.
   - Connects to the Ethereum blockchain using Web3 and interacts with the smart contract.
   - Validates user input and displays messages based on the registration status.

3. **Smart Contract (UserInfo.sol)**
   - Defines the structure for user information and contains methods for user registration and data retrieval.


## 📝 Usage 

1. **Registering a User**:
   - Fill out the registration form with your details and click "Register."
   - If registration is successful, you will be redirected to the iris capture page.

2. **Capturing Iris**:
   - Allow the application to access your webcam.
   - Click on the "Capture Iris" button to capture and hash your iris image.

3. **Security**:
   - The captured image will be hashed using SHA-256 for secure storage. The hash can be used for verification without storing the actual image.


## 🤝 Contributing 

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

