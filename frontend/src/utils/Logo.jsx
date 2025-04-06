function Logo() {
  return (
    <div className="flex p-5 justify-start items-center gap-3">
      <svg
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* First shape - representing "Bond" */}
        <path
          d="M55.5 0H77.5L66.5 16L77.5 32H55.5L44.5 16L55.5 0Z"
          fill="#2563eb"
        ></path>
        
        {/* Second shape - connecting element */}
        <path
          d="M35.5 0H51.5L40.5 16L51.5 32H35.5L24.5 16L35.5 0Z"
          fill="#3b82f6"
        ></path>
        
        {/* Third shape - representing "Sheer" */}
        <path
          d="M15.5 0H31.5L20.5 16L31.5 32H15.5L4.5 16L15.5 0Z"
          fill="#60a5fa"
        ></path>
      </svg>
      <span className="text-2xl font-semibold tracking-tight">SheerPod</span>
    </div>
  );
}

export default Logo;