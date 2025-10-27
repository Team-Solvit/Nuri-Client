export const scrollToBottom = (container: HTMLElement | null) => {
	if (!container) return;
	container.scrollTop = container.scrollHeight;
};