'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import * as S from './style'
import NProgress from "nprogress";

const MENU_ITEMS = [
	{ label: '홈', path: '/', icon: '/icons/home.svg', order: 0 },
	{ label: '탐색', path: '/explore', icon: '/icons/compass.svg', order: 1 },
	{ label: '모임', path: '/meetings', icon: '/icons/hands.svg', order: 3 },
	{ label: '프로필', path: '/profile', icon: '/icons/person.svg', order: 4 },
	{ label: '만들기', path: '/creating', icon: '/icons/create.svg', order: 2 },
	{ label: '하숙관리(제3자)', path: '/boarding/third-party', icon: '/icons/location.svg', order: 99 },
	{ label: '모임관리(제3자)', path: '/meeting/third-party', icon: '/icons/person_setting.svg', order: 99 },
]

export default function Header() {
	const pathname = usePathname()
	const router = useRouter()

	const [isMobile, setIsMobile] = useState(false);
	const [moreOpen, setMoreOpen] = useState(false);
	const moreRef = useRef<HTMLDivElement | null>(null);
	const moreBarRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		setIsMobile(window.innerWidth <= 430);
	}, []);

	useEffect(() => {
		if (!moreOpen) return;
		const onClick = (e: MouseEvent | TouchEvent) => {
			const target = e.target as Node;
			const insideTrigger = moreRef.current?.contains(target);
			const insideBar = moreBarRef.current?.contains(target);
			if (!insideTrigger && !insideBar) {
				setMoreOpen(false);
			}
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setMoreOpen(false);
		};
		document.addEventListener('click', onClick);
		document.addEventListener('touchstart', onClick);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('click', onClick);
			document.removeEventListener('touchstart', onClick);
			document.removeEventListener('keydown', onKey);
		};
	}, [moreOpen]);

	const handleMenuClick = (path: string) => {
		NProgress.start()
		router.push(path)
		setMoreOpen(false);
	}

	if (isMobile && pathname.startsWith('/register') || isMobile && pathname.startsWith('/message')) return null

	const primaryItems = isMobile ? MENU_ITEMS.filter(i => i.order < 99) : MENU_ITEMS;
	const extraItems = isMobile ? MENU_ITEMS.filter(i => i.order >= 99) : [];

	return (
		<S.HeaderContainer>
			<Image
				src="/logo.svg"
				alt="로고"
				width={77}
				height={60.5}
				priority
			/>
			<S.Menu>
				{primaryItems.map(({ label, path, icon, order }) => {
					const active = path === '/' ? pathname === '/' : pathname.startsWith(path)
					return (
						<S.MenuItem
							key={path}
							label={label}
							active={active}
							order={order}
							onClick={() => handleMenuClick(path)}
						>
							<Image
								src={icon}
								alt={label}
								width={24}
								height={24}
							/>
							<div>{label}</div>
						</S.MenuItem>
					)
				})}

				{isMobile && extraItems.length > 0 && (
					<S.MoreWrap ref={moreRef}>
						<S.MenuItem
							key="__more__"
							onClick={() => setMoreOpen(o => !o)}
							aria-haspopup="menu"
							aria-expanded={moreOpen}
						>
							<S.MoreIcon open={moreOpen}>
								<Image src="/icons/upArrow.svg" alt="더보기" width={24} height={24} />
							</S.MoreIcon>
						</S.MenuItem>
					</S.MoreWrap>
				)}
			</S.Menu>
			{isMobile && extraItems.length > 0 && (
				<S.MoreBar open={moreOpen} ref={moreBarRef}>
					{extraItems.map(({ label, path, icon }) => (
						<S.MoreAction key={path} onClick={() => handleMenuClick(path)}>
							<Image src={icon} alt={label} width={20} height={20} />
							<span>{label}</span>
						</S.MoreAction>
					))}
				</S.MoreBar>
			)}
			<S.HeaderBottom>
				<S.Profile>
					<Image
						src="https://avatars.githubusercontent.com/u/193513016?s=200&v=4"
						alt="프로필"
						width={36}
						height={36}
						style={{ borderRadius: '50%' }}
						unoptimized={true}
					/>
					<span>xx._un8</span>
				</S.Profile>
				<S.Report>
					<Image
						src="/icons/warningBell.svg"
						alt="신고하기"
						width={24}
						height={24}
					/>
					<span>신고하기</span>
				</S.Report>
			</S.HeaderBottom>
		</S.HeaderContainer>
	)
}