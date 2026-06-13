"use client";

export default function AttributionPage() {
  return (
    <main
      className="w-full min-h-screen bg-white flex flex-col items-center py-12 px-0 relative"
      style={{
        backgroundImage: `
          repeating-linear-gradient(to right, transparent, transparent 39px, rgba(0, 0, 0, 0.05) 39px, rgba(0, 0, 0, 0.05) 40px)
        `
      }}
    >
      <div className="w-full max-w-[1440px] flex justify-center z-10">
        <img
          src="/attribution.png"
          alt="Attributions Chart"
          className="w-[95vw] md:w-[85vw] lg:w-[80vw] max-w-[1200px] h-auto block"
        />
      </div>
      {/* 100vh space below the image */}
      <div className="h-[100vh] w-full" />
    </main>
  );
}
