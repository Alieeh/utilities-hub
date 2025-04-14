"use client"

import React, { use, useState } from 'react';
import CanvasConfetti from '@/components/CanvasConfetti';

const DashboardPage: React.FC = () => {

    const [isConfettiActive, setIsConfettiActive] = useState(false);

    const triggerConfetti = () => {
        setIsConfettiActive(true);
        // Set a timeout to hide the confetti after a certain duration
        setTimeout(() => {
        setIsConfettiActive(false);
        }, 3000); // Hide after 3 seconds
    };

    const confettiConfig = {
        particleCount: 150,
        spread: 60,
        origin: { x: 0.5, y: 0.7 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
        shapes: ['circle', 'star'],
    };

    return (
        
        <div>

            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <button onClick={triggerConfetti}>Launch Confetti</button>
            <CanvasConfetti active={isConfettiActive} config={confettiConfig} />
            {/* Add your components or sections here */}
        </div>
    );
};

export default DashboardPage;