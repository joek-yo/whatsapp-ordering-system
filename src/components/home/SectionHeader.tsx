import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface SectionHeaderProps {
  title: string;
  badge: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  viewAllText?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, badge, icon: Icon, href, viewAllText }) => {
  return (
    <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-gold mb-1">
          <Icon size={11} />
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em]">{badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tighter uppercase">{title}</h2>
      </div>
      <Link href={href} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-subtext hover:text-green transition-colors whitespace-nowrap shrink-0 ml-4">
        {viewAllText || "View All"}
        <FaArrowRight size={10} />
      </Link>
    </div>
  );
};

export default SectionHeader;
