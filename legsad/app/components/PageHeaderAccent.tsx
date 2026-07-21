import Image from "next/image";

export default function PageHeaderAccent() {
  return (
    <>
      <div className="pointer-events-none absolute -left-10 -top-5 z-0 h-40 w-40 md:h-56 md:w-56">
        <Image src="/images/effects/brush-top-left.png" alt="" fill sizes="(max-width: 768px) 160px, 224px" className="object-contain opacity-40" priority />
      </div>
      <div className="pointer-events-none absolute -right-10 -top-5 h-40 w-40 md:h-56 md:w-56">
        <Image src="/images/effects/brush-top-right.png" alt="" fill sizes="(max-width: 768px) 160px, 224px" className="object-contain opacity-40" priority />
      </div>
      <div className="pointer-events-none absolute -left-10 -bottom-2 h-40 w-40 md:h-56 md:w-56">
        <Image src="/images/effects/brush-bottom-left.png" alt="" fill sizes="(max-width: 768px) 160px, 224px" className="object-contain opacity-30" />
      </div>
      <div className="pointer-events-none absolute -right-10 -bottom-2 z-0 h-40 w-40 md:h-56 md:w-56">
        <Image src="/images/effects/brush-bottom-right.png" alt="" fill sizes="(max-width: 768px) 160px, 224px" className="object-contain opacity-30" />
      </div>
    </>
  );
}