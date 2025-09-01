import { useEffect, useState } from "react";

export const CloudBackground = () => {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    generateClouds();

    const handleResize = () => {
      generateClouds();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateClouds = () => {
    const numberOfClouds = 8;
    const newClouds = [];

    for (let i = 0; i < numberOfClouds; i++) {
      const cloudTypes = ['cloud-small', 'cloud-medium', 'cloud-large'];
      const cloudType = cloudTypes[Math.floor(Math.random() * cloudTypes.length)];
      
      newClouds.push({
        id: i,
        type: cloudType,
        x: Math.random() * 120 - 20,       // Start off-screen left (-20% to 100%)
        y: Math.random() * 50 + 10,        // 10% to 60% from top
        opacity: Math.random() * 0.4 + 0.4, // 0.4 to 0.8 opacity
        animationDuration: Math.random() * 40 + 60, // 60-100 seconds (slower drift)
        delay: Math.random() * 15, // 0-15 second delay
        floatDelay: Math.random() * 8, // Random float animation delay
      });
    }

    setClouds(newClouds);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/40 via-background to-background" />
      
      {/* Glowing Sun - positioned safely within viewport */}
      <div className="sun absolute top-12 right-12 sm:top-16 sm:right-16">
        <div className="sun-core"></div>
        <div className="sun-glow"></div>
      </div>

      {/* Floating clouds */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className={`cloud ${cloud.type}`}
          style={{
            left: cloud.x + "%",
            top: cloud.y + "%",
            opacity: cloud.opacity,
            animationDuration: `${cloud.animationDuration}s, 8s`,
            animationDelay: `${cloud.delay}s, ${cloud.floatDelay}s`,
          }}
        />
      ))}
    </div>
  );
};
