import { AnimatePresence, motion } from 'framer-motion'
import { useState, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setSkins } from '../../redux/slices/skins'
import { changeOverflow } from '../../helpers/helpers'
import styles from './MarketPageFilters.module.css'

import { Modal } from '../../components/Modal'
import { ModalSmall } from '../../components/ModalSmall'
import { List } from '../../ui/List'
import { ListItem } from '../../ui/ListItem'
import { Cart } from './components/Cart'
import { FilterPhones } from './components/FilterPhones'
import { Search } from './components/Search'
import { Fav } from './components/Fav'

import {
	FaAngleDown,
	FaFilter,
	FaHeart,
	FaSearch,
	FaShoppingCart,
} from 'react-icons/fa'

export const MarketPageFilters: FC = () => {
	const dispatch = useAppDispatch()
	const { t, i18n } = useTranslation()
	const [open, setOpen] = useState(false)
	const [filter, setFilter] = useState<string>(t('sorting_newest'))
	const [moreFilters, setMoreFilters] = useState(false)
	const [cartOpen, setCartOpen] = useState(false)
	const [search, setSearch] = useState(false)
	const [favOpen, setFavOpen] = useState(false)
	const cart = useAppSelector((state) => state.cart)
	const wishList = useAppSelector((state) => state.wishList)
	const skins = useAppSelector((state) => state.skins.items)

	const showAll = () => {
		setOpen(!open)
	}

	const handleClick = () => {
		setMoreFilters(!moreFilters)
		changeOverflow(moreFilters)
	}

	const openCartMenu = () => {
		setFavOpen(false)
		setCartOpen(!cartOpen)
		if (window.innerWidth < 1050) {
			changeOverflow(cartOpen)
		}
	}

	const openFavMenu = () => {
		setCartOpen(false)
		setFavOpen(!favOpen)
		if (window.innerWidth < 1050) {
			changeOverflow(favOpen)
		}
	}
	const filterModalClick = (text: string) => {
		setOpen(false)
		setFilter(text)
		if (i18n.language === 'en') {
			switch (text) {
				case 'Price: Min':
					dispatch(setSkins([...skins].sort((a, b) => a.price - b.price)))
					break
				case 'Price: Max':
					dispatch(setSkins([...skins].sort((a, b) => b.price - a.price)))
					break
				case 'Float: Low':
					dispatch(setSkins([...skins].sort((a, b) => a.float - b.float)))
					break
				case 'Float: Max':
					dispatch(setSkins([...skins].sort((a, b) => b.float - a.float)))
					break
			}
		} else {
			switch (text) {
				case 'Ціна: мін':
					dispatch(setSkins([...skins].sort((a, b) => a.price - b.price)))
					break
				case 'Ціна: макс':
					dispatch(setSkins([...skins].sort((a, b) => b.price - a.price)))
					break
				case 'Якість: мін':
					dispatch(setSkins([...skins].sort((a, b) => a.float - b.float)))
					break
				case 'Якість: макс':
					dispatch(setSkins([...skins].sort((a, b) => b.float - a.float)))
					break
			}
		}
	}

	const searchModalClick = () => {
		setSearch(!search)
		changeOverflow(search)
	}

	const filterParams = [
		t('sorting_newest'),
		t('sorting_price_low'),
		t('sorting_price_high'),
		t('sorting_float_low'),
		t('sorting_float_high'),
	]

	const page = window.location.href.match('/market')

	return (
		<div className={styles.filters}>
			<div className={styles['filter-top']}>
				<div className={styles.input}>
					<Search />
				</div>
			</div>
			<div className={styles['filter-bottom']}>
				<div className={styles['filter-left']}>
					<motion.div
						whileTap={{ scale: 0.8 }}
						className={styles.fav}
						onClick={() => openFavMenu()}>
						<div className={styles['icon-heart']}>
							<FaHeart fontSize={'15px'} fill='white' />
							{wishList.length > 0 && (
								<div className={styles['icon-heart__number']}>
									{wishList.length}
								</div>
							)}
						</div>
					</motion.div>
					<div className={styles['filter-box']} onClick={showAll}>
						{filter}
						<div
							className={
								open ? `${styles.icon} ${styles['icon-opened']}` : styles.icon
							}>
							<FaAngleDown fontSize={'25px'} />
						</div>
						{open && (
							<div className={styles['filters-container']}>
								<List>
									{filterParams.map((item, i) => {
										return (
											<ListItem
												key={i}
												style={styles.item}
												onClick={() => filterModalClick(item)}>
												{item}
											</ListItem>
										)
									})}
								</List>
							</div>
						)}
					</div>
				</div>
				<div className={styles['filter-right']}>
					<motion.div
						whileTap={{ scale: 0.8 }}
						className={styles.search}
						onClick={() => searchModalClick()}>
						<div className={styles['icon-search']}>
							<FaSearch fontSize={'15px'} fill='white' />
						</div>
					</motion.div>
					{page && (
						<motion.div
							whileTap={{ scale: 0.8 }}
							className={styles.cart}
							onClick={() => openCartMenu()}>
							<div className={styles['icon-cart']}>
								<FaShoppingCart fontSize={'15px'} fill='white' />
								{cart.length > 0 && (
									<div className={styles['icon-cart__number']}>
										{cart.length}
									</div>
								)}
							</div>
						</motion.div>
					)}

					<motion.div
						whileTap={{ scale: 0.8 }}
						className={styles['icon-filters']}
						onClick={() => handleClick()}>
						<FaFilter fontSize={'15px'} fill='white' />
					</motion.div>
				</div>
			</div>
			<AnimatePresence initial={false}>
				{moreFilters && (
					<Modal
						handleClick={() => handleClick()}
						children={<FilterPhones />}
						guns={true}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence initial={false}>
				{cartOpen && (
					<ModalSmall
						handleClick={() => openCartMenu()}
						children={<Cart setStateModal={setCartOpen} />}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence initial={false}>
				{favOpen && (
					<ModalSmall handleClick={() => openFavMenu()} children={<Fav />} />
				)}
			</AnimatePresence>
			<AnimatePresence initial={false}>
				{search && (
					<Modal
						handleClick={() => searchModalClick()}
						children={<Search />}
						guns={true}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}
