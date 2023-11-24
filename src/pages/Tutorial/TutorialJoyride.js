// TutorialJoyride.js
import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';

const TutorialJoyride = () => {
    const [runTour, setRunTour] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);

    const steps = [
        {
            target: '.heatmap-overlay',
            content: 'This is an important feature!',
        },
        {
            target: '.InteractivePoints',
            content: 'This is an important feature!',
        },
        // ... add more steps as needed
    ];

    const handleJoyrideCallback = (data) => {
        const { status, action, index } = data;

        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRunTour(false);
        } else if (action === 'next' || action === 'prev') {
            setStepIndex(index);
        }

        if (data.type === 'beacon:click' || data.type === 'tooltip:close') {
            setHasInteracted(true);
        }
    };

    useEffect(() => {
        // Start the tour after a delay to ensure all elements are rendered
        const timer = setTimeout(() => {
            setRunTour(true);
        }, 1000); // Delay can be adjusted as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <Joyride
            steps={steps}
            run={runTour}
            stepIndex={stepIndex}
            callback={handleJoyrideCallback}
            continuous={true}
            showProgress={true}
            showSkipButton={true}
            styles={{
                options: {
                    arrowColor: '#e3ffeb',
                    backgroundColor: '#ffffff',
                    overlayColor: '#424242',
                    primaryColor: '#00bf43',
                    textColor: '#000000',
                    width: '20vw',
                    zIndex: 1000,
                },
            }}
        />
    );
};

export default TutorialJoyride;
