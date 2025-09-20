import React from "react";
import CheckUserStatus from "@/containers/meetings/checkUserStatus/ui";

export default function MeetingLayout({children}: {children: React.ReactNode}) {
	return (
		<CheckUserStatus>
			{children}
		</CheckUserStatus>
	);
}