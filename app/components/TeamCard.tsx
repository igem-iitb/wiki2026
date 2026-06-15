type TeamCardProps = {
  name: string;
  photo?: string; // path under /public, e.g. "/team/web/jane.jpg"
};

export default function TeamCard({ name, photo }: TeamCardProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Photo box — aspect ratio matches the Figma spec (227.74 : 300.23) */}
      <div
        className="w-full rounded-[11px] bg-black overflow-hidden"
        style={{ aspectRatio: "227.74 / 300.23" }}
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
      <p className="mt-3 text-center text-sm font-medium text-black">
        {name}
      </p>
    </div>
  );
}