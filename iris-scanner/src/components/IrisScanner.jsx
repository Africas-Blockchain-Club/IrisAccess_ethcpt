import React, { useEffect } from 'react';

const IrisScanner = () => {
    useEffect(() => {
        const video = document.getElementById('video');
        
        // Access webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(err => {
                console.error("Error accessing webcam: ", err);
            });
    }, []);

    const handleCapture = async () => {
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
    
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
    
        try {
            const hash = await hashImage(imageData);
            console.log("Image hash:", hash);
        } catch (error) {
            console.error("Failed to hash image:", error);
        }
    };
    

    const hashImage = async (imageData) => {
        const response = await fetch(imageData);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    };

    return (
        <div className="video-container">
            <video id="video" width="640" height="480" autoPlay></video>
            <button id="capture" onClick={handleCapture}>Capture Iris</button>
            <canvas id="canvas" width="640" height="480" style={{ display: 'none' }}></canvas>
        </div>
    );
    
};

export default IrisScanner;
