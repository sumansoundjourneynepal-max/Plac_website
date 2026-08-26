import { useEffect, useRef, useState } from "react";

/**
 * Same staggered 3-column crossfade pattern as the reference, but static:
 * no API call, images are a fixed local array. Each column cycles through
 * the same photo pool at a different starting offset, and the columns
 * advance 800ms apart (col1 → col2 → col3) so they never shift in sync —
 * that stagger is what read as "alive" in the reference, so it's kept.
 *
 * This list matches the files actually in public/hero/. If you add more
 * photos later, drop them in public/hero/ and add them here using the
 * exact filename (case-sensitive, no spaces).
 */
const heroPhotos = [
  "/hero/sing.jpg",
  "/hero/singing-bowls-candlelight.jpg",
  "/hero/sound-bath-overhead.jpg",
];

// Each column starts on a different photo so all three never match at once.
const columnStartOffsets = [0, 1, 2];
// How far each column's cycle is staggered from the others, in ms.
const columnStaggerDelays = [0, 800, 1600];
const CYCLE_MS = 4000;

export default function Hero() {
  const [indices, setIndices] = useState<number[]>(columnStartOffsets);

  // Tracks any photo that actually fails to load (404, bad path, etc.) so
  // the rotation can skip it instead of landing on a blank frame every
  // time it cycles back around.
  const [brokenPhotos, setBrokenPhotos] = useState<boolean[]>(
    heroPhotos.map(() => false)
  );
  // Mirrors `brokenPhotos` in a ref so the interval callbacks below always
  // read the latest value without needing to be torn down and restarted
  // every time a photo's broken/ok state changes.
  const brokenPhotosRef = useRef(brokenPhotos);
  useEffect(() => {
    brokenPhotosRef.current = brokenPhotos;
  }, [brokenPhotos]);

  const handleImageError = (i: number) => {
    console.warn(
      `[Hero] Photo failed to load and will be skipped in rotation: ${heroPhotos[i]}. Check that this file actually exists at that path in public/hero/.`
    );
    setBrokenPhotos((prev) => {
      if (prev[i]) return prev;
      const copy = [...prev];
      copy[i] = true;
      return copy;
    });
    // If any column is currently sitting on the photo that just failed,
    // jump it forward right away instead of waiting up to CYCLE_MS for
    // its next tick — otherwise that column shows a blank frame until
    // its interval next fires.
    setIndices((prev) =>
      prev.map((current) => {
        if (current !== i) return current;
        let next = current;
        for (let attempt = 0; attempt < heroPhotos.length; attempt++) {
          next = (next + 1) % heroPhotos.length;
          if (next !== i) break;
        }
        return next;
      })
    );
  };

  useEffect(() => {
    // One independent interval per column, each started after its own
    // stagger delay, so timing never drifts across loops.
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    columnStaggerDelays.forEach((delay, col) => {
      const startInterval = () => {
        const interval = setInterval(() => {
          setIndices((prev) => {
            const copy = [...prev];
            let next = copy[col];
            // Step forward until landing on a photo that has actually
            // loaded. Bails out after a full lap so it can't spin forever
            // if every photo is broken.
            for (let attempt = 0; attempt < heroPhotos.length; attempt++) {
              next = (next + 1) % heroPhotos.length;
              if (!brokenPhotosRef.current[next]) break;
            }
            copy[col] = next;
            return copy;
          });
        }, CYCLE_MS);
        intervals.push(interval);
      };

      if (delay === 0) {
        startInterval();
      } else {
        timeouts.push(setTimeout(startInterval, delay));
      }
    });

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, []);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden bg-[#1A1410]">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {indices.map((activeIndex, col) => (
          <div
            key={col}
            className={`relative h-full w-full bg-gradient-to-b from-[#3A2E22] to-[#1A1410] ${
              col === 1 ? "hidden md:block" : ""
            } ${col === 2 ? "hidden lg:block" : ""}`}
          >
            {heroPhotos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                aria-hidden={i !== activeIndex}
                loading="eager"
                decoding="async"
                onError={() => handleImageError(i)}
                className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-in-out ${
                  i === activeIndex && !brokenPhotos[i] ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Warm dark overlay so the photos sit inside the umber/brass palette rather than reading as a plain black scrim */}
      <div className="absolute inset-0 bg-[#1A1410]/70" />

      <div className="relative z-10 flex h-full items-center">
        <div className="w-full max-w-7xl sm:px-6 md:px-12">
          <div className="max-w-2xl space-y-6 px-6">
            <p className="text-center font-['IBM_Plex_Mono',_monospace] text-xs uppercase tracking-[0.28em] text-[#C08A3E] md:text-left">
              Hand-hammered in the Himalayas
            </p>

            <h1 className="text-center font-['Fraunces',_serif] text-[2.25rem] leading-[1.12] text-[#F2E9DD] md:text-left md:text-5xl lg:text-6xl">
              Sound you can{" "}
              <span className="italic text-[#E8A659]">feel in your bones.</span>
            </h1>

            <p className="text-center text-base leading-[160%] text-[#B8A996] md:text-left md:text-xl">
              Each bowl is shaped by hand from seven metals, then tuned by ear
              to a note it will hold for a lifetime. Bring that resonance
              into your practice — as a guided sound bath, a healing class,
              or a bowl of your own.
            </p>

            <div className="flex w-auto flex-col gap-4 px-6 md:w-full md:flex-row md:px-0">
              <a
                href="#book"
                className="relative w-full overflow-hidden rounded-full bg-[#C08A3E] px-6 py-3 text-center text-sm font-medium text-[#1A1410] transition-colors hover:bg-[#E8A659] sm:w-auto md:w-[253px]"
              >
                Book a Sound Bath
              </a>

              <a
                href="/products"
                className="group relative w-full overflow-hidden border border-[#F2E9DD]/40 px-6 py-3 text-center font-medium text-[#F2E9DD] sm:w-auto"
              >
                Shop the Bowls
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#F2E9DD] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}