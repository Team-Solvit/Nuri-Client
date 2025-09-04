import {useEffect} from "react";
import {useLoadingStore} from "@/store/loading";

export function useLoadingEffect(loading: boolean) {
	const {show, none} = useLoadingStore();
	
	useEffect(() => {
		if (loading) {
			show();
		} else {
			none();
		}
	}, [loading, show, none]);
}