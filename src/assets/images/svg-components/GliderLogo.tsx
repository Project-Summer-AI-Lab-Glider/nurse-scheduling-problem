import * as React from "react";

function GliderLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={18} cy={18} r={18} fill="#377E90" />
      <circle cx={26} cy={12} r={3} fill="#4EADC5" />
      <circle cx={18} cy={12} r={3} fill="#4EADC5" />
      <circle cx={10} cy={12} r={3} fill="#4EADC5" />
      <circle cx={10} cy={20} r={3} fill="#4EADC5" />
      <circle cx={18} cy={28} r={3} fill="#4EADC5" />
    </svg>
  );
}

export default GliderLogo;
