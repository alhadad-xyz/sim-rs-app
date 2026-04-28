import Link from "next/link";

export function FormHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-variant bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-between px-6 h-14">
      <div className="flex items-center gap-2">
        <span className="font-h3 text-h3 text-on-surface">
          SIM RS / Rawat Inap
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center justify-center p-2 text-on-surface-variant hover:bg-surface-container rounded-md hover:transition-all duration-150"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            close
          </span>
        </Link>
      </div>
    </header>
  );
}
