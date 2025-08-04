'use client'

import {usePathname, useRouter} from 'next/navigation'
import Image from 'next/image'
import * as S from './style'
import NProgress from "nprogress";

const MENU_ITEMS = [
	{label: '홈', path: '/', icon: '/icons/home.svg'},
	{label: '탐색', path: '/explore', icon: '/icons/compass.svg'},
	{label: '모임', path: '/meetings', icon: '/icons/hands.svg'},
	{label: '프로필', path: '/profile', icon: '/icons/person.svg'},
	{label: '만들기', path: '/creating', icon: '/icons/create.svg'},
	{label: '하숙관리(제3자)', path: '/boarding/third-party', icon: '/icons/location.svg'},
	{label: '모임관리(제3자)', path: '/meeting/third-party', icon: '/icons/person_setting.svg'},
]

export default function Header() {
	const pathname = usePathname()
	const router = useRouter()
	
	const handleMenuClick = (path: string) => {
		NProgress.start()
		router.push(path)
	}
	
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
				{MENU_ITEMS.map(({label, path, icon}) => {
					const active = path === '/' ? pathname === '/' : pathname.startsWith(path)
					return (
						<S.MenuItem
							key={path}
							label={label}
							active={active}
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
			</S.Menu>
			<S.HeaderBottom>
				<S.Profile>
					<Image
						src="https://avatars.githubusercontent.com/u/193513016?s=200&v=4"
						alt="프로필"
						width={36}
						height={36}
						style={{borderRadius: '50%'}}
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