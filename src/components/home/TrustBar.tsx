import React from "react";
import { FaTruck, FaShieldAlt, FaClock, FaHeadset, FaCheckCircle } from "react-icons/fa";
import { getTrustBar } from "@/lib/getBusinessData";

const ICON_MAP: Record<string, React.ReactNode> = {
  truck: <FaTruck />,
  shield: <FaShieldAlt />,
  clock: <FaClock />,
  headset: <FaHeadset />,
};

const TrustBar: React.FC = () => {
  const features = getTrustBar();
  if (!features.length) return null;

  return (
    <div className="relative z-30 px-4 -mt-10 sm:-mt-16 max-w-6xl mx-auto">
      <div className="bg-surface/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {features.map((f: any, i: number) => {
            const isLast = i === features.length - 1;
            const borderClass = isLast ? "" : "md:border-r border-border pr-2";
            const wrapperClass = "flex flex-col md:flex-row items-center gap-4 text-center md:text-left group relative " + borderClass;
            return (
              <div key={i} className={wrapperClass}>
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-green opacity-20 blur-lg rounded-full group-hover:opacity-50 transition-opacity duration-500" />
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-surface2 border border-border flex items-center justify-center text-green group-hover:bg-green group-hover:border-green group-hover:text-background transition-all duration-500">
                    <span className="text-xl md:text-2xl">{ICON_MAP[f.icon] || <FaCheckCircle />}</span>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-black text-foreground text-[10px] sm:text-[11px] uppercase tracking-tighter">{f.title}</h4>
                  <p className="text-subtext text-[9px] font-black uppercase tracking-[0.15em] opacity-80">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default TrustBar;
