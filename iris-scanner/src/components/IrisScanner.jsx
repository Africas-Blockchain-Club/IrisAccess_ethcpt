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

    return (
        <div className="video-container">
            <video id="video" width="640" height="480" autoPlay></video>
            <button id="capture">Capture Iris</button>
            <canvas id="canvas" width="640" height="480" style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default IrisScanner;
