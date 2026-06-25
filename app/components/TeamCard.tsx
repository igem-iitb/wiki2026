"use client";

import { useState } from "react";

type TeamCardProps = {
  name: string;
  photo?: string;
  objectPosition?: string;
  zoom?: number;
};

export default function TeamCard({ name, photo, objectPosition, zoom }: TeamCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full"
      style={{ containerType: "inline-size", perspective: "1000px", cursor: "pointer" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          aspectRatio: "247 / 360",
        }}
      >
        {/* FRONT */}
        <div
          className="flex w-full h-full flex-col bg-white shadow-md"
          style={{
            borderRadius: "6.63cqw",
            padding: "4cqw",
            position: "absolute",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            className="w-full overflow-hidden bg-black"
            style={{ borderRadius: "4.42cqw", aspectRatio: "227.74 / 300.23" }}
          >
            {photo ? (
              <img
                src={photo}
                alt={name}
                className="h-full w-full object-cover"
                style={{
                  objectPosition: objectPosition || "center top",
                  transform: zoom && zoom !== 1 ? `scale(${zoom})` : undefined,
                  transformOrigin: "center center",
                }}
              />
            ) : null}
          </div>
          <p
            className="text-center font-medium uppercase text-black"
            style={{ fontSize: "5.52cqw", marginTop: "4cqw", marginBottom: "1cqw" }}
          >
            {name}
          </p>
        </div>

        {/* BACK */}
        <div
          className="flex w-full h-full flex-col items-center justify-center bg-white shadow-md"
          style={{
            borderRadius: "6.63cqw",
            padding: "4cqw",
            position: "absolute",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p
            className="text-center text-gray-400 uppercase"
            style={{ fontSize: "5cqw" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>
      </div>
    </div>
  );
}