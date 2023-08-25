import React from 'react'
import styles from './AdvantagesSlider.module.css'

// import CarouselCompound from './components/Carousel/index'

import { FiRotateCcw } from 'react-icons/fi'
import { FaShoppingCart, FaUser, FaCrown } from 'react-icons/fa'

export const AdvantagesSlider = () => {
	return (
		<>
			<div className={styles['app__main-container']}>
				{/* <CarouselCompound infinite>
					<CarouselCompound.Page>
						<div className={styles.item}>
							<div className={styles.line}>
								<div className={`${styles.round} ${styles['round-first']}`}>
									<FiRotateCcw color='var(--text-primary)' fontSize={'24px'} />
								</div>
							</div>
						</div>
					</CarouselCompound.Page>
					<CarouselCompound.Page>
						<div className={styles.item}>
							<div className={styles.line}>
								<div className={`${styles.round} ${styles['round-second']}`}>
									<FaUser color='var(--text-primary)' fontSize={'24px'} />
								</div>
							</div>
						</div>
					</CarouselCompound.Page>
					<CarouselCompound.Page>
						<div className={styles.item}>
							<div className={styles.line}>
								<div className={`${styles.round} ${styles['round-third']}`}>
									<FaCrown color='var(--text-primary)' fontSize={'24px'} />
								</div>
							</div>
						</div>
					</CarouselCompound.Page>
					<CarouselCompound.Page>
						<div className={styles.item}>
							<div className={styles.line}>
								<div className={`${styles.round} ${styles['round-fourth']}`}>
									<FaShoppingCart
										color='var(--text-primary)'
										fontSize={'24px'}
									/>
								</div>
							</div>
						</div>
					</CarouselCompound.Page>
				</CarouselCompound> */}
			</div>
		</>
	)
}
