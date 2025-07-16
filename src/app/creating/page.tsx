"use client";
import { useRouter } from "next/navigation";
import CreatingModal from "@/components/ui/creating";

export default function CreatingPage() {
  const router = useRouter();
  const handleClose = () => router.back();

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.3)",
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
      onClick={handleClose}
    >
      <div onClick={e => e.stopPropagation()}>
        <CreatingModal onClose={handleClose} />
      </div>
    </div>
  );
} 