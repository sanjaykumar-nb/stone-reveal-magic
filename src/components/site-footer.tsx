import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-black border-t border-white/10 px-5 md:px-10 py-14">
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 256 256" fill="#ffffff" aria-hidden="true">
              <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
            </svg>
            <span className="text-white text-base font-semibold">Lithos</span>
          </div>
          <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-[240px]">
            Quarry-direct marble, granite, and onyx, fabricated and installed for architects and
            private residences since 1994.
          </p>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/collections" className="text-white/60 hover:text-white transition-colors">
                Stone Collections
              </Link>
            </li>
            <li>
              <Link to="/projects" className="text-white/60 hover:text-white transition-colors">
                Completed Projects
              </Link>
            </li>
            <li>
              <Link
                to="/craftsmanship"
                className="text-white/60 hover:text-white transition-colors"
              >
                Fabrication & Care
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white/60 hover:text-white transition-colors">
                Our Story
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold">Materials</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            <li>Italian Marble</li>
            <li>Indian &amp; Brazilian Granite</li>
            <li>Backlit Onyx</li>
            <li>Quartzite &amp; Travertine</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold">Visit the yard</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#e8702a]" />
              <span>Slab Yard 12, Industrial Estate Road, Bengaluru 560058</span>
            </li>
            <li className="flex gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-[#e8702a]" />
              <span>+91 80 4000 1994</span>
            </li>
            <li className="flex gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-[#e8702a]" />
              <span>studio@lithos-stone.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/40">
        <span>© {new Date().getFullYear()} Lithos Stone Atelier. All rights reserved.</span>
        <span>Quarry-direct sourcing · Book-matched slabs · Pan-India installation</span>
      </div>
    </footer>
  );
}
