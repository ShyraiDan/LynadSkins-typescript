import { FC } from 'react'
import 'swiper/css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './PopularItems.module.css'

import { Container, MContainer } from '../../../../ui/Container'
import { Typeography } from '../../../../ui/Typeography'
import { Item } from './components/Item'

import img1 from './../../../../i/1.webp'
import img10 from './../../../../i/10.webp'
import img2 from './../../../../i/2.webp'
import img3 from './../../../../i/3.webp'
import img4 from './../../../../i/4.webp'
import img5 from './../../../../i/5.webp'
import img6 from './../../../../i/6.png'
import img7 from './../../../../i/7.webp'
import img8 from './../../../../i/8.webp'
import img9 from './../../../../i/9.webp'

type TData = {
	img: string
	exterior: string
	price: string
	alt: string
}

const data: TData[] = [
	{
		img: img1,
		exterior: 'Field-Tested',
		price: '13.30',
		alt: 'AK-47-Redline',
	},
	{
		img: img2,
		exterior: 'Field-Tested',
		price: '38.24',
		alt: 'AK-47-Asiimov',
	},
	{
		img: img3,
		exterior: 'Field-Tested',
		price: '34.91',
		alt: 'AK-47-Neon Rider',
	},
	{
		img: img4,
		exterior: 'Field-Tested',
		price: '31.04',
		alt: 'M4A4-The Emperor',
	},
	{
		img: img5,
		exterior: 'Field-Tested',
		price: '23.98',
		alt: 'AK-47-Neon Revolution',
	},
	{
		img: img6,
		exterior: 'Field-Tested',
		price: '48.02',
		alt: 'AK-47-Vulcan',
	},
	{
		img: img7,
		exterior: 'Field-Tested',
		price: '22.72',
		alt: 'M4A4-Neo-Noir',
	},
	{
		img: img8,
		exterior: 'Field-Tested',
		price: '29.98',
		alt: 'AWP-Neo-Noir',
	},
	{
		img: img9,
		exterior: 'Field-Tested',
		price: '47.11',
		alt: 'AK-47-Bloodsport',
	},
	{
		img: img10,
		exterior: 'Field-Tested',
		price: '61.70',
		alt: 'AWP-Asiimov',
	},
]

export const PopularItems: FC = () => {
	const { t } = useTranslation()

	const textAnimation = {
		hidden: {
			x: -100,
			opacity: 0,
		},
		visible: (custom: number) => ({
			x: 0,
			opacity: 1,
			transition: { delay: custom * 0.2 },
		}),
	}

	return (
		<MContainer
			initial='hidden'
			whileInView='visible'
			variants={textAnimation}
			custom={1}
			viewport={{ once: true }}
			styles={styles.container}>
			<div className={styles.titles}>
				<Typeography variant={'h2'} color={'white'}>
					{t('popular_items')}
				</Typeography>
				<Link to={'/market'}>
					{' '}
					<Typeography hover={true} variant={'h3'} color={'purple'}>
						{t('show_items')}
					</Typeography>
				</Link>
			</div>
			<Container styles={styles.itemsContainer}>
				<div className={styles.items}>
					<Swiper
						modules={[Autoplay]}
						spaceBetween={3}
						autoplay={true}
						breakpoints={{
							280: {
								slidesPerView: 1,
							},
							380: {
								slidesPerView: 2,
							},
							675: {
								slidesPerView: 3,
							},
							840: {
								slidesPerView: 4,
							},
							1050: {
								slidesPerView: 5,
							},
							1300: {
								slidesPerView: 6,
							},
							1540: {
								slidesPerView: 7,
							},
						}}>
						{data.map((item, i: number) => {
							return (
								<SwiperSlide key={i}>
									<Item data={item} />
								</SwiperSlide>
							)
						})}
					</Swiper>
				</div>
			</Container>
		</MContainer>
	)
}
