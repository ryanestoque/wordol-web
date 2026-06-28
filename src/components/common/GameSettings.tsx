import { Settings, LogOut, Trash2, Moon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Switch } from "../ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function GameSettings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Dark mode state — persisted in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  async function handleLogout() {
    try {
      await signOut(auth);
      setOpen(false);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message || "Failed to log out");
    }
  }

  async function handleClearStats() {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        stats: {
          gamesPlayed: 0,
          wins: 0,
          currentStreak: 0,
          maxStreak: 0,
        },
      });
      toast.success("Statistics cleared!");
    } catch (err: any) {
      toast.error(err.message || "Failed to clear statistics");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          <Settings className="scale-150 md:scale-180" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm w-[90vw] rounded-2xl p-6">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-3xl font-martires-black tracking-wide">
            SETTINGS
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-1">
          {/* User profile card */}
          {user && (
            <div className="flex items-center gap-3 p-3 mb-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName ?? "User"}
                  className="w-12 h-12 rounded-full object-cover shrink-0 border border-border"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-inter-bold text-xl shrink-0">
                  {user.displayName?.[0] ?? "?"}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <p className="font-inter-semibold text-sm truncate leading-tight">
                  {user.displayName ?? "User"}
                </p>
                <p className="font-inter-regular text-xs text-muted-foreground truncate leading-tight">
                  {user.email}
                </p>
              </div>
            </div>
          )}



          {/* Dark Mode row */}
          <div className="flex items-center justify-between py-3 px-1">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-muted-foreground" />
              <span className="font-inter-medium text-sm">Dark Mode</span>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>



          {user && (
            <>
              {/* Clear Statistics */}
              <button
                onClick={handleClearStats}
                className="flex items-center gap-3 py-3 px-1 w-full text-left rounded-lg transition-colors hover:bg-muted group cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
                <span className="font-inter-medium text-sm group-hover:text-destructive transition-colors">
                  Clear Statistics
                </span>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 py-3 px-1 w-full text-left rounded-lg transition-colors hover:bg-destructive/10 group cursor-pointer mt-1"
              >
                <LogOut className="w-4 h-4 text-destructive" />
                <span className="font-inter-medium text-sm text-destructive">
                  Log Out
                </span>
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}