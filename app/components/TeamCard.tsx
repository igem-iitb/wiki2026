type TeamCardProps = {
  name: string;
  photo?: string; // path under /public, e.g. "/team/web/jane.jpg"
};

/**
 * A single member card. It fills the width of its grid cell and sizes
 * everything proportionally with container-query units (cqw = 1% of the
 * card's own width), so the SAME component renders pixel-accurate for both
 * the large "leads" cards (362px) and the smaller team cards (247px).
 *
 * Ratios derived from the Figma spec:
 *   outer radius  16.41 / 247.57 = 6.63cqw
 *   white frame   (247.57-227.74)/2 / 247.57 = 4.0cqw
 *   photo radius  10.94 / 247.57 = 4.42cqw
 *   name size     13.68 / 247.57 = 5.52cqw
 *   photo aspect  227.74 / 300.23
 */
export default function TeamCard({ name, photo }: TeamCardProps) {
  return (
    <div className="w-full" style={{ containerType: "inline-size" }}>
      <div
        className="flex w-full flex-col bg-white shadow-md"
        style={{ borderRadius: "6.63cqw", padding: "4cqw" }}
      >
        {/* Black photo box */}
        <div
          className="w-full overflow-hidden bg-black"
          style={{ borderRadius: "4.42cqw", aspectRatio: "227.74 / 300.23" }}
        >
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        {/* Name */}
        <p
          className="text-center font-medium uppercase text-black"
          style={{ fontSize: "5.52cqw", marginTop: "4cqw", marginBottom: "1cqw" }}
        >
          {name}
        </p>
      </div>
    </div>
  );
}
