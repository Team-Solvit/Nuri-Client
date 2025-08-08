export const breakpoints = {
	mobile: 430,
	desktop: 1024,
};

export const mq = {
	mobile: `@media (max-width: ${breakpoints.mobile}px)`,
};

// 사용예시
// import { mq } from '@/styles/media';
//
// const boxStyle = styled.p`
//   font-size: 2rem;
//
//   ${mq.mobile} {
//     font-size: 1.6rem;
//   }
// `;