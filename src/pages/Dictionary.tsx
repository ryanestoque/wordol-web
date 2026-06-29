import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, X, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, type Variants } from "framer-motion";
import PageLayout from "@/components/common/PageLayout";
import SuggestWordForm from "@/components/common/SuggestWordForm";
import SuggestWord from "@/components/common/SuggestWord";
import words from "../../words.json";

const allWords = (words as string[]).map((w) => w.toLowerCase()).sort();

/** Group a sorted word list by first letter */
function groupByLetter(wordList: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  for (const word of wordList) {
    const letter = word[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(word);
  }
  return groups;
}

export default function Dictionary() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return allWords;
    const q = search.toLowerCase().trim();
    return allWords.filter((w) => w.includes(q));
  }, [search]);

  const grouped = useMemo(() => groupByLetter(filtered), [filtered]);
  const letters = Object.keys(grouped).sort();

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, type: "spring", stiffness: 120 },
    },
  };

  return (
    <PageLayout
      noScroll
      headerLeft={
        <div className="flex items-center gap-3">
          <Link
            to="/home"
            className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-muted transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-3xl font-martires-black tracking-wide uppercase leading-none">
              Diksyonaryo
            </h1>
          </div>
        </div>
      }
      headerRight={<SuggestWord context="header" />}
    >
      {/* Full-width wrapper — single col mobile, two-col desktop */}
      <div className="w-full flex-1 flex flex-col lg:flex-row lg:gap-8 pb-4 pl-2.5 min-h-0">

        {/* ── RIGHT SIDEBAR (Suggest Word) ─────────────────────── */}
        {/* Hidden on mobile — the header icon handles suggest-word on small screens */}
        <motion.aside
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="
            hidden lg:flex flex-col gap-6
            w-full lg:w-80 xl:w-96
            lg:sticky lg:top-0 lg:self-start
            order-1 lg:order-2
          "
        >
          {/* Suggest Word — inline */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-border p-5"
          >
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <h2 className="font-inter-semibold text-sm">Suggest a Word</h2>
            </div>
            <p className="font-inter-regular text-sm text-muted-foreground mb-3">
              Know a 5-letter Bisaya word that's not in our list? Submit it below!
            </p>
            <SuggestWordForm mode="inline" />
          </motion.div>
        </motion.aside>

        {/* ── MAIN COLUMN — search + word list ────────────────────── */}
        <div className="flex flex-col gap-6 flex-1 min-h-0 mt-6 lg:mt-0 order-2 lg:order-1">

          {/* Search bar */}
          <motion.div variants={itemVariants} initial="initial" animate="animate" className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder={`Search ${allWords.length} words...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-10 h-12 rounded-xl font-inter-regular text-base bg-transparent border-border"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </motion.div>

          {/* Search result count */}
          {search.trim() && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-inter-regular text-sm text-muted-foreground -mt-2"
            >
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search.trim()}&rdquo;
            </motion.p>
          )}

          {/* Word list — grouped by letter */}
          {letters.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="flex flex-col gap-6 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 pb-12"
            >
              {letters.map((letter) => (
                <motion.section key={letter} variants={itemVariants}>
                  {/* Letter header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-martires-black text-foreground leading-none">
                      {letter}
                    </span>
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs font-inter-medium text-muted-foreground">
                      {grouped[letter].length}
                    </span>
                  </div>

                  {/* Words in group — more cols on wider screens */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1.5 -mx-3">
                    {grouped[letter].map((word) => (
                      <div
                        key={word}
                        className="px-3 py-2.5 rounded-xl hover:bg-muted transition-colors cursor-default group"
                      >
                        <span className="font-martires-semibold text-base uppercase tracking-wider text-foreground group-hover:text-foreground/80 transition-colors">
                          {word}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.section>
              ))}
            </motion.div>
          ) : (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16 gap-3 flex-1 overflow-y-auto custom-scrollbar pb-12"
            >
              <Search className="w-10 h-10 text-muted-foreground/40" />
              <p className="font-inter-semibold text-lg text-muted-foreground">
                No words found
              </p>
              <p className="font-inter-regular text-sm text-muted-foreground/70">
                Try a different search or suggest a new word above
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </PageLayout>
  );
}
