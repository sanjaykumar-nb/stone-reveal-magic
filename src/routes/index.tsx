import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";

import rawStone from "@/assets/stone-raw.jpg";
import polishedStone from "@/assets/stone-polished.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lithos — Luxury Marble & Granite Slabs" },
      {
        name: "description",
        content:
          "Lithos crafts rare marble and granite canvases. Peel back the raw surface to reveal polished, illuminated veins shaped by deep time.",
      },
      { property: "og:title", content: "Lithos — Luxury Marble & Granite Slabs" },
      {
        property: "og:description",
        content:
          "An architectural gallery of rare marble and granite slabs, revealed through light.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SPOTLIGHT_R = 260;

function RevealLayer({
  image,
  cursorX,
  cursorY,
}: {
  image: string;
  cursorX: number;
  cursorY: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const resize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const layer = layerRef.current;
    if (!canvas || !layer || !size.w || !size.h) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,1)");
    grad.addColorStop(0.6, "rgba(255,255,255,0.75)");
    grad.addColorStop(0.75, "rgba(255,255,255,0.4)");
    grad.addColorStop(0.88, "rgba(255,255,255,0.12)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    const mask = `url(${canvas.toDataURL()})`;
    layer.style.maskImage = mask;
    layer.style.webkitMaskImage = mask;
    layer.style.maskSize = "100% 100%";
    (layer.style as CSSStyleDeclaration & { webkitMaskSize?: string }).webkitMaskSize =
      "100% 100%";
  }, [cursorX, cursorY, size]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={size.w}
        height={size.h}
        className="absolute inset-0 pointer-events-none"
        style={{ display: "none" }}
      />
      <div
        ref={layerRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
}

function Index() {
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const navItems = [
    "Slab Gallery",
    "Granite Hub",
    "Architectural Plans",
    "Virtual Showroom",
  ];

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-5 md:px-10 py-5">
        <div className="flex items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" aria-hidden="true">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-lg font-semibold">Lithos</span>
        </div>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          <button className="text-white px-4 py-1.5 rounded-full text-sm font-medium bg-white/20">
            Collections
          </button>
          {navItems.map((item) => (
            <button
              key={item}
              className="text-white/80 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        <button className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100">
          Book Consultation
        </button>

        <button className="md:hidden text-white" aria-label="Open menu">
          <Menu size={24} />
        </button>
      </nav>

      <section
        className="relative w-full overflow-hidden h-screen bg-black"
        style={{ height: "100dvh" }}
      >
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url(${rawStone})` }}
        />

        <RevealLayer image={polishedStone} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        <div className="absolute top-[14%] left-0 right-0 z-50 flex flex-col items-center text-center px-5 pointer-events-none">
          <h1 className="text-white leading-[0.95]">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: "-0.05em", animationDelay: "0.25s" }}
            >
              Veins hold
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: "-0.08em", animationDelay: "0.42s" }}
            >
              tales of Earth
            </span>
          </h1>
        </div>

        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="text-white/70 text-sm leading-relaxed">
            Every vein of calcite records an eon of structural pressure, from deep crust heat to
            crystallization, layered across millions of years inside magnificent stone formations.
          </p>
        </div>

        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] z-50 flex flex-col items-start gap-4 sm:gap-5 hero-anim hero-fade"
          style={{ animationDelay: "0.85s" }}
        >
          <p className="text-white/70 text-sm leading-relaxed">
            Our architectural gallery lets you peel back the raw surface to discover how pressure,
            minerals, and deep time combine to craft the rarest marble and granite canvases for
            your spaces.
          </p>
          <button className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30">
            Explore Slabs
          </button>
        </div>
      </section>
    </div>
  );
}
