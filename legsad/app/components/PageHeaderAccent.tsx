export default function PageHeaderAccent() {
  return (
    <>
      <img
        src="/images/effects/brush-top-left.png"
        alt=""
        className="pointer-events-none absolute -left-10 -top-5 z-0 h-40 w-40 opacity-40 md:h-56 md:w-56"
      />
      <img
        src="/images/effects/brush-top-right.png"
        alt=""
        className="pointer-events-none absolute -right-10 -top-5 h-40 w-40 opacity-40 md:h-56 md:w-56"
      />
      <img
        src="/images/effects/brush-bottom-left.png"
        alt=""
        className="pointer-events-none absolute -left-10 -bottom-2 h-40 w-40 opacity-30 md:h-56 md:w-56"
      />
      <img
        src="/images/effects/brush-bottom-right.png"
        alt=""
        className="pointer-events-none absolute -right-10 -bottom-2 z-0 h-40 w-40 opacity-30 md:h-56 md:w-56"
      />
    </>
  );
}