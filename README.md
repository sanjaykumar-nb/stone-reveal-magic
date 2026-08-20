# Lithos: Unveiled Beauty

Luxury Marble & Granite Brand Hero Section PromptBuild a full-screen, dark-themed hero section for a luxury marble and granite brand called Lithos, using React 18 + TypeScript + Vite + Tailwind CSS and lucide-react for icons. The signature feature is a cursor-following spotlight that reveals a second image (representing raw stone transforming into an illuminated, high-gloss polished finish) through a soft circular mask on top of a base image. Match every detail below exactly.FontsAdd this to the top of src/index.css, then @tailwind base/components/utilities:css@import url('https://googleapis.com');
* { font-family: 'Inter', sans-serif; }
.font-playfair { font-family: 'Playfair Display', serif; }
Use code with caution.Body/UI font: Inter.Display/wordmark accent: Playfair Display, italic.Asset URLs (use these exactly)Base image (BG_IMAGE_1 - Raw/Matte Stone Surface):https://higgs.aiReveal image (BG_IMAGE_2 - Polished/Glossy Illuminated Veins):https://higgs.aiLayout & structureRoot wrapper: min-h-screen bg-white tracking-[-0.02em], inline fontFamily: "'Inter', sans-serif".Section (

): relative w-full overflow-hidden h-screen bg-black, inline style={{ height: '100dvh' }}. Layers, by z-index:Base image (z-10): absolute inset-0 bg-center bg-cover bg-no-repeat, background = BG_IMAGE_1.Reveal layer (z-30): a RevealLayer component (see below) showing BG_IMAGE_2.Heading (z-50): absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none. An 

 with text-white leading-[0.95] containing two block spans:Line 1: block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl, inline letterSpacing: '-0.05em', text "Veins hold".Line 2: block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1, inline letterSpacing: '-0.08em', text "tales of Earth".Bottom-left paragraph (z-50): hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px]. 

 — "Every vein of calcite records an eon of structural pressure, from deep crust heat to crystallization, layered across millions of years inside magnificent stone formations."Bottom-right block (z-50): absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5. Contains a 

 — "Our architectural gallery lets you peel back the raw surface to discover how pressure, minerals, and deep time combine to craft the rarest marble and granite canvases for your spaces." — and an Explore Slabs button: bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30.The cursor spotlight reveal (core mechanic)In the parent, define const SPOTLIGHT_R = 260; and track the mouse with smoothing:Refs: mouse (raw), smooth (eased), rafRef; state cursorPos (init {x:-999,y:-999}).mousemove listener stores raw e.clientX/clientY.A requestAnimationFrame loop lerps: smooth.x += (mouse.x - smooth.x) * 0.1 (same for y), then setCursorPos. Clean up listener + cancel RAF on unmount.RevealLayer({ image, cursorX, cursorY }):Holds a hidden 

 (absolute inset-0 pointer-events-none, style={{display:'none'}}) sized to window.innerWidth/Height on mount + resize.A reveal 

 (absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none) with the reveal image as background.On every render: clear canvas, build a radial gradient at (cursorX, cursorY) from radius 0 → SPOTLIGHT_R with stops:0 → rgba(255,255,255,1), 0.4 → 1, 0.6 → 0.75, 0.75 → 0.4, 0.88 → 0.12, 1 → 0.Fill an arc of radius SPOTLIGHT_R with it. Then canvas.toDataURL() and apply it as maskImage/webkitMaskImage on the reveal div with maskSize: '100% 100%'. This makes the second image visible only inside the soft glowing circle that trails the cursor.Navigation (fixed, over hero):Left: an inline SVG logo (26×26, viewBox 0 0 256 256, fill="#ffffff", path M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z) + wordmark Lithos.Center pill (hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1): buttons Collections (active: full white text), then Slab Gallery, Granite Hub, Architectural Plans, Virtual Showroom (text-white/80 ... hover:bg-white/20 hover:text-white transition-colors, px-4 py-1.5 rounded-full text-sm font-medium).Right (desktop): hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 — Book Consultation.Animations (premium, on load)Add to index.css:css@keyframes heroReveal { 0%{opacity:0;transform:translateY(28px);filter:blur(12px)} 100%{opacity:1;transform:translateY(0);filter:blur(0)} }
@keyframes heroFadeUp { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
@keyframes heroZoom { 0%{transform:scale(1.12)} 100%{transform:scale(1)} }
.hero-anim { opacity:0; animation-fill-mode:forwards; animation-timing-function:cubic-bezier(0.16,1,0.3,1); }
.hero-reveal { animation-name:heroReveal; animation-duration:1.1s; }
.hero-fade { animation-name:heroFadeUp; animation-duration:1s; }
.hero-zoom { animation:heroZoom 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }
@media (prefers-reduced-motion: reduce){ .hero-anim,.hero-zoom{ animation:none; opacity:1; } }
Use code with caution.Apply:Base image div → add hero-zoom (slow Ken Burns zoom-out).Heading line 1 → hero-anim hero-reveal, inline animationDelay: '0.25s'; line 2 → same with '0.42s' (blur-rise, staggered).Bottom-left paragraph wrapper → hero-anim hero-fade, animationDelay: '0.7s'.Bottom-right wrapper → hero-anim hero-fade, animationDelay: '0.85s'.ResponsivenessHeading scales text-5xl → sm:text-7xl → md:text-8xl.Center nav pill and desktop Book Consultation are hidden below md; the mobile hamburger is md:hidden.Bottom-left paragraph is hidden sm:block; bottom-right block is full-width on mobile (left-5 right-5) and right-anchored from sm.Use 100dvh so mobile browser chrome doesn't clip the section.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d6bb35cb-a58f-4614-9674-d8d453238212).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy To Netlify (SSR)

This app uses TanStack Start with SSR, so deploy it as a server-rendered app on Netlify.

1. Push this repository to GitHub.
2. In Netlify, create a new site from your Git repository.
3. Use the values from `netlify.toml` (already committed):
	- Build command: `npm run build`
	- Environment: `NITRO_PRESET=netlify`, `NODE_VERSION=20`
4. Trigger the first deploy.

If Netlify asks for a publish directory, leave it empty and let the framework output be auto-detected.
