import * as React from "react";

function QuestionCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={15}
      height={16}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.914 10.57a.795.795 0 01.586-.234c.234 0 .43.078.586.234a.795.795 0 01.234.586c0 .235-.078.43-.234.586a.795.795 0 01-.586.235.795.795 0 01-.586-.235.795.795 0 01-.234-.586c0-.234.078-.43.234-.586zm.82-.937h-.468a.428.428 0 01-.264-.088.428.428 0 01-.088-.264c0-.469.117-.86.352-1.172.234-.332.488-.566.761-.703.293-.136.557-.312.791-.527.235-.215.352-.469.352-.762a.987.987 0 00-.176-.556c-.117-.176-.303-.323-.556-.44-.254-.117-.567-.176-.938-.176-.723 0-1.309.284-1.758.85-.117.176-.273.195-.469.059l-.38-.264c-.196-.137-.225-.303-.088-.498.683-.88 1.582-1.319 2.695-1.319.8 0 1.475.215 2.021.645.547.43.82.996.82 1.7 0 .448-.116.839-.35 1.171-.235.313-.499.537-.792.674a2.93 2.93 0 00-.761.557 1.001 1.001 0 00-.352.761c0 .098-.04.186-.117.264a.317.317 0 01-.235.088zM7.5 1.547c-1.758 0-3.252.625-4.482 1.875-1.23 1.23-1.846 2.715-1.846 4.453 0 1.758.615 3.252 1.846 4.482 1.25 1.23 2.744 1.846 4.482 1.846 1.758 0 3.252-.615 4.482-1.846 1.23-1.25 1.846-2.744 1.846-4.482 0-1.758-.625-3.252-1.875-4.482-1.23-1.23-2.715-1.846-4.453-1.846zM2.344 2.748C3.77 1.322 5.488.61 7.5.61c2.012 0 3.72.713 5.127 2.139 1.426 1.406 2.139 3.115 2.139 5.127 0 2.012-.713 3.73-2.139 5.156-1.406 1.406-3.115 2.11-5.127 2.11-2.012 0-3.73-.704-5.156-2.11C.938 11.605.234 9.887.234 7.875c0-2.012.704-3.72 2.11-5.127z"
        fill="#333"
      />
    </svg>
  );
}

export default QuestionCircle;