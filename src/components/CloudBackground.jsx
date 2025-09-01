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
    const numberOfClouds = 6;
    const newClouds = [];

    for (let i = 0; i < numberOfClouds; i++) {
      newClouds.push({
        id: i,
        width: Math.random() * 120 + 60,   // 60-180px width (smaller)
        height: Math.random() * 50 + 25,   // 25-75px height (smaller)
        x: Math.random() * 110 - 10,       // Start slightly off-screen left (-10% to 100%)
        y: Math.random() * 40 + 15,        // 15% to 55% from top (higher in sky)
        opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8 opacity
        animationDuration: Math.random() * 25 + 35, // 35-60 seconds (faster)
        delay: Math.random() * 10, // 0-10 second delay
      });
    }

    setClouds(newClouds);
    console.log("CloudBackground: Generated clouds:", newClouds);
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
          className="cloud-shape"
          style={{
            width: cloud.width + "px",
            height: cloud.height + "px",
            left: cloud.x + "%",
            top: cloud.y + "%",
            opacity: cloud.opacity,
            animation: `cloudDrift ${cloud.animationDuration}s linear infinite`,
            animationDelay: cloud.delay + "s",
          }}
        />
      ))}
    </div>
  );
};
