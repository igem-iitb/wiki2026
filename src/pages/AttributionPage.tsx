export default function AttributionPage() {
  return (
    <main className="w-full min-h-screen mt-[-72px] pt-[72px] bg-[#f1f1f1] flex flex-col items-center py-12 px-0 relative">
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-[length:100%_auto] md:bg-cover bg-top md:bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/attribution_overlay_bg.png')",
        }}
      />
    </main>
  );
}
