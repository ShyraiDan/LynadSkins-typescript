import { FC } from 'react'
import { useAppSelector } from '../../redux/hook'
import styles from './MarketPage.module.css'

import { MarketPageFilters } from '../../modules/MarketPageFilters/MarketPageFilters'
import { MarketPageItems } from '../../modules/MarketPageItems/MarketPageItems'
import { MarketPageSide } from '../../modules/MarketPageSide'
import { Container } from '../../ui/Container'

export const MarketPage: FC = () => {
	// const state = useAppSelector((store) => store.marketItems)

	return (
		<>
			<Container styles={styles.container}>
				<div className={styles.sideBar}>
					<MarketPageSide />
				</div>
				<div>
					<MarketPageFilters />
					<MarketPageItems />
				</div>
			</Container>
		</>
	)
}
