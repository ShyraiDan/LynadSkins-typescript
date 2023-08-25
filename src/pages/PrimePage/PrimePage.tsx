import { motion } from 'framer-motion'
import { useRef, FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PrimePage.module.css'

import { Tab } from '../../components/Tab'
import { Container } from '../../ui/Container'
import { MAdvantage } from './components/Advantage'
import { FreePrime } from './components/FreePrime'
import { PrimePageTop } from './components/PrimePageTop'
import { TabContent } from './components/TabContent'
import { TabPc } from './components/TabPc'

import img1 from './../../i/advantage-1.webp'
import img2 from './../../i/advantage-2.png'
import img3 from './../../i/advantage-3.webp'
import img4 from './../../i/advantage-4.webp'
import img5 from './../../i/advantage-5.webp'

type TAdvantages = {
	title: string
	description: string
	img: string
	text: string
}

type TInfoItem = {
	option: string
	status: string
}

type TInfo = {
	params: Array<TInfoItem>
	price: string
}

type IInfoPC = {
	param: string
	standart: string
	prime: string
	trader: string
}

export const PrimePage: FC = () => {
	const { t } = useTranslation()
	const table = useRef<HTMLDivElement>(null)

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

	const advantages: TAdvantages[] = [
		{
			title: t('prime_page.advantages.one.title'),
			description: t('prime_page.advantages.one.text'),
			img: img1,
			text: 'Increased deposit bonus',
		},
		{
			title: t('prime_page.advantages.two.title'),
			description: t('prime_page.advantages.two.text'),
			img: img2,
			text: 'Trade commission',
		},
		{
			title: t('prime_page.advantages.three.title'),
			description: t('prime_page.advantages.three.text'),
			img: img3,
			text: 'Discount in the Store',
		},
		{
			title: t('prime_page.advantages.four.title'),
			description: t('prime_page.advantages.four.text'),
			img: img4,
			text: '3D Skin Viewer',
		},
		{
			title: t('prime_page.advantages.five.title'),
			description: t('prime_page.advantages.five.text'),
			img: img5,
			text: 'Priority support',
		},
	]

	const info: TInfo[] = [
		{
			params: [
				{
					option: t('prime_page.table.one.param_one'),
					status: t('prime_page.table.two.param_one'),
				},
				{
					option: t('prime_page.table.one.param_two'),
					status: t('prime_page.table.two.param_two'),
				},
				{
					option: t('prime_page.table.one.param_three'),
					status: t('prime_page.table.two.param_three'),
				},
				{
					option: t('prime_page.table.one.param_four'),
					status: t('prime_page.table.two.param_four'),
				},
				{
					option: t('prime_page.table.one.param_five'),
					status: t('prime_page.table.two.param_five'),
				},
				{
					option: t('prime_page.table.one.param_nine'),
					status: t('prime_page.table.two.param_nine'),
				},
				{
					option: t('prime_page.table.one.param_eight'),
					status: t('prime_page.table.two.param_eight'),
				},
				{
					option: t('prime_page.table.one.param_seven'),
					status: t('prime_page.table.two.param_seven'),
				},
				{
					option: t('prime_page.table.one.param_ten'),
					status: t('prime_page.table.two.param_ten'),
				},
				{
					option: t('prime_page.table.one.param_six'),
					status: t('prime_page.table.two.param_six'),
				},
			],
			price: t('prime_page.table.two.price'),
		},
		{
			params: [
				{
					option: t('prime_page.table.one.param_one'),
					status: t('prime_page.table.three.param_one'),
				},
				{
					option: t('prime_page.table.one.param_two'),
					status: t('prime_page.table.three.param_two'),
				},
				{
					option: t('prime_page.table.one.param_three'),
					status: t('prime_page.table.three.param_three'),
				},
				{
					option: t('prime_page.table.one.param_four'),
					status: t('prime_page.table.three.param_four'),
				},
				{
					option: t('prime_page.table.one.param_five'),
					status: t('prime_page.table.three.param_five'),
				},
				{
					option: t('prime_page.table.one.param_nine'),
					status: t('prime_page.table.three.param_nine'),
				},
				{
					option: t('prime_page.table.one.param_eight'),
					status: t('prime_page.table.three.param_eight'),
				},
				{
					option: t('prime_page.table.one.param_seven'),
					status: t('prime_page.table.three.param_seven'),
				},
				{
					option: t('prime_page.table.one.param_ten'),
					status: t('prime_page.table.three.param_ten'),
				},
				{
					option: t('prime_page.table.one.param_six'),
					status: t('prime_page.table.three.param_six'),
				},
			],
			price: t('prime_page.table.three.price'),
		},
		{
			params: [
				{
					option: t('prime_page.table.one.param_one'),
					status: t('prime_page.table.four.param_one'),
				},
				{
					option: t('prime_page.table.one.param_two'),
					status: t('prime_page.table.four.param_two'),
				},
				{
					option: t('prime_page.table.one.param_three'),
					status: t('prime_page.table.four.param_three'),
				},
				{
					option: t('prime_page.table.one.param_four'),
					status: t('prime_page.table.four.param_four'),
				},
				{
					option: t('prime_page.table.one.param_five'),
					status: t('prime_page.table.four.param_five'),
				},
				{
					option: t('prime_page.table.one.param_nine'),
					status: t('prime_page.table.four.param_nine'),
				},
				{
					option: t('prime_page.table.one.param_eight'),
					status: t('prime_page.table.four.param_eight'),
				},
				{
					option: t('prime_page.table.one.param_seven'),
					status: t('prime_page.table.four.param_seven'),
				},
				{
					option: t('prime_page.table.one.param_ten'),
					status: t('prime_page.table.four.param_ten'),
				},
				{
					option: t('prime_page.table.one.param_six'),
					status: t('prime_page.table.four.param_six'),
				},
			],
			price: t('prime_page.table.four.price'),
		},
	]
	const infoPc: IInfoPC[] = [
		{
			param: '',
			standart: t('prime_page.table.two.title'),
			prime: t('prime_page.table.three.title'),
			trader: t('prime_page.table.four.title'),
		},
		{
			param: '',
			standart: t('prime_page.table.two.text'),
			prime: t('prime_page.table.three.text'),
			trader: t('prime_page.table.three.text'),
		},
		{
			param: t('prime_page.table.one.param_one'),
			standart: t('prime_page.table.two.param_one'),
			prime: t('prime_page.table.three.param_one'),
			trader: t('prime_page.table.four.param_one'),
		},
		{
			param: t('prime_page.table.one.param_two'),
			standart: t('prime_page.table.two.param_two'),
			prime: t('prime_page.table.three.param_two'),
			trader: t('prime_page.table.four.param_two'),
		},
		{
			param: t('prime_page.table.one.param_three'),
			standart: t('prime_page.table.two.param_three'),
			prime: t('prime_page.table.three.param_three'),
			trader: t('prime_page.table.four.param_three'),
		},
		{
			param: t('prime_page.table.one.param_four'),
			standart: t('prime_page.table.two.param_four'),
			prime: t('prime_page.table.three.param_four'),
			trader: t('prime_page.table.four.param_four'),
		},
		{
			param: t('prime_page.table.one.param_five'),
			standart: t('prime_page.table.two.param_five'),
			prime: t('prime_page.table.three.param_five'),
			trader: t('prime_page.table.four.param_five'),
		},
		{
			param: t('prime_page.table.one.param_six'),
			standart: t('prime_page.table.two.param_six'),
			prime: t('prime_page.table.three.param_six'),
			trader: t('prime_page.table.four.param_six'),
		},
		{
			param: t('prime_page.table.one.param_seven'),
			standart: t('prime_page.table.two.param_seven'),
			prime: t('prime_page.table.three.param_seven'),
			trader: t('prime_page.table.four.param_seven'),
		},
		{
			param: t('prime_page.table.one.param_eight'),
			standart: t('prime_page.table.two.param_eight'),
			prime: t('prime_page.table.three.param_eight'),
			trader: t('prime_page.table.four.param_eight'),
		},
		{
			param: t('prime_page.table.one.param_nine'),
			standart: t('prime_page.table.two.param_nine'),
			prime: t('prime_page.table.three.param_nine'),
			trader: t('prime_page.table.four.param_nine'),
		},
	]
	return (
		<Container styles={styles.container}>
			<PrimePageTop innerRef={table} />
			<motion.div
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				className={styles.advantages}>
				{advantages.map((item, i) => (
					<MAdvantage
						key={i}
						custom={i + 1}
						variants={textAnimation}
						data={item}
					/>
				))}
			</motion.div>
			<FreePrime />
			<div ref={table}>
				<div className={styles.tab}>
					{' '}
					<Tab
						amount={3}
						firstTab={'Basic'}
						secondTab={'Prime'}
						thirdTab={'Trader +'}
						firstContent={<TabContent info={info[0]} val={1} />}
						secondContent={<TabContent info={info[1]} val={2} />}
						thirdContent={<TabContent info={info[2]} val={3} />}></Tab>
				</div>
				<div className={styles.tabPc}>
					<TabPc info={infoPc} />
				</div>
			</div>
		</Container>
	)
}
