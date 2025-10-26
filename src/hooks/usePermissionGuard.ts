import { useCallback } from "react";
import {useUserStore} from "@/store/user";
import {useLoginModalStore} from "@/store/loginModal";
import {useAlertStore} from "@/store/alert";

export const usePermissionGuard = () => {
	const {userId} = useUserStore()
	const {open} = useLoginModalStore()
	const {error} = useAlertStore()
	const withPermission = useCallback(
		(action: () => void) => {
			if (!userId) {
				open();
				error("로그인이 필요합니다.")
				return;
			}
			action();
		},
		[userId, open, error]
	);
	
	return { withPermission };
};