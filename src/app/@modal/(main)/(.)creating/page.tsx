"use client";
import { useRouter } from "next/navigation";
import CreatingModal from "@/components/ui/creating";
import {useAlertStore} from "@/store/alert";

export default function CreatingModalPage() {
  const router = useRouter();
	const {success} = useAlertStore()
  const handleClose = () => {
		success("게시물을 업로드 하였습니다.")
	  router.back();
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <CreatingModal onClose={handleClose} />
      </div>
    </div>
  );
}
