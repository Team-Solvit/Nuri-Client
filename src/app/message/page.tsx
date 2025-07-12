"use client";

import NoneBox from "@/containers/message/none-box/ui";
import React from "react";
import {useParams} from "next/navigation";

export default function Page() {
	const params = useParams();
	return (
		params.id && <NoneBox/>
	)
}