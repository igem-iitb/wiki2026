"use client";

export default function CardSection() {
  return (
    <section 
      className="w-full min-h-screen bg-[#181830] flex flex-col items-center gap-12 px-4"
      style={{ paddingTop: "20vh", paddingBottom: "20vh" }}
    >
      {/* Top Card: Problem Statement */}
      <div 
        className="relative w-[95vw] md:w-[72vw] lg:w-[50vw] max-w-[1000px] aspect-[1.91/1] overflow-hidden rounded-2xl shadow-2xl"
        style={{ containerType: 'inline-size' }}
      >
        {/* Background Card Image */}
        <img
          src="/card_ps.png"
          alt="Card Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Text Overlay using container query units (cqw) for perfect fluid scaling */}
        <div 
          className="absolute inset-0 flex flex-col justify-start text-white select-none pointer-events-none"
          style={{
            paddingTop: "9%",
            paddingLeft: "10%",
            paddingRight: "10%",
            fontFamily: "var(--font-mont)",
          }}
        >
          <h2 
            className="font-bold tracking-wide montserrat-semibold"
            style={{
              fontSize: "5.5cqw",
              marginBottom: "2%",
            }}
          >
            Problem Statement
          </h2>
          <p 
            className="font-normal text-zinc-100/95 leading-relaxed"
            style={{
              fontSize: "2.7cqw",
              lineHeight: "1.6",
            }}
          >
            As AI computing demands force a shift to liquid immersion cooling, the industry's go-to PFAS fluids face global bans while the fallback — petroleum hydrocarbons — is fossil-derived and equally unsustainable. The deadlock is real, and the window to break it is closing fast.
          </p>
        </div>
      </div>

      {/* Bottom Cards: Solutions Container (Side-by-side on desktop, stacked on mobile) */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between w-full max-w-[920px] lg:w-[46vw]">
        
        {/* Card 1: Current Solution */}
        <div 
          className="relative w-[95vw] md:w-[72vw] lg:w-[22vw] aspect-[1/1.15] overflow-hidden rounded-2xl shadow-2xl"
          style={{ containerType: 'inline-size' }}
        >
          <img
            src="/card_sol.png"
            alt="Current Solution Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 flex flex-col justify-start text-white select-none pointer-events-none"
            style={{
              paddingTop: "12%",
              paddingLeft: "10%",
              paddingRight: "10%",
              fontFamily: "var(--font-mont)",
            }}
          >
            <h3 
              className="font-bold tracking-wide montserrat-semibold"
              style={{
                fontSize: "6.5cqw",
                marginBottom: "5%",
              }}
            >
              Current Solution
            </h3>
            <p 
              className="font-normal text-zinc-200/90"
              style={{
                fontSize: "3.3cqw",
                lineHeight: "1.5",
              }}
            >
              Industries currently rely on PFAS and fossil-derived petroleum hydrocarbons. However, PFAS faces impending global regulatory bans due to health risks, while petroleum fallback options remain unsustainable.
            </p>
          </div>
        </div>

        {/* Card 2: Our Solution */}
        <div 
          className="relative w-[95vw] md:w-[72vw] lg:w-[22vw] aspect-[1/1.15] overflow-hidden rounded-2xl shadow-2xl"
          style={{ containerType: 'inline-size' }}
        >
          <img
            src="/card_sol.png"
            alt="Our Solution Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 flex flex-col justify-start text-white select-none pointer-events-none"
            style={{
              paddingTop: "12%",
              paddingLeft: "10%",
              paddingRight: "10%",
              fontFamily: "var(--font-mont)",
            }}
          >
            <h3 
              className="font-bold tracking-wide montserrat-semibold"
              style={{
                fontSize: "6.5cqw",
                marginBottom: "5%",
              }}
            >
              Our Solution
            </h3>
            <p 
              className="font-normal text-zinc-200/90"
              style={{
                fontSize: "3.3cqw",
                lineHeight: "1.5",
              }}
            >
              Our bio-derived immersion cooling fluid offers a zero-PFAS, sustainable, and highly efficient alternative, bridging the regulatory deadlock and setting a new standard for green computing.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
