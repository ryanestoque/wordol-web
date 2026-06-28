import Hero from "@/components/common/Hero";
import PageLayout from "@/components/common/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          username: user.displayName || user.email?.split('@')[0] || "player",
          email: user.email,
          stats: {
            gamesPlayed: 0,
            wins: 0,
            currentStreak: 0,
            maxStreak: 0
          }
        });
      }

      toast.success("Logged in with Google!");
      navigate("/home");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/popup-closed-by-user") {
        toast.error("Sign-in cancelled.");
      } else if (err.code === "auth/network-request-failed") {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Google sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout>
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <Hero />
        <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } } }} className="flex flex-col gap-4 w-full max-w-[350px] mt-8">
          <Button 
            type="button" 
            variant="outline" 
            disabled={loading} 
            onClick={handleGoogleSignIn}
            className="p-6 cursor-pointer font-inter-medium w-full"
          >
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}