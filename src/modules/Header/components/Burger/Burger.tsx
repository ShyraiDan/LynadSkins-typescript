import { useRef, useState, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { Link } from 'react-router-dom'
import { changeOverflow } from '../../../../helpers/helpers'
import { logout, selectIsAuth } from '../../../../redux/slices/auth'
import { i18n } from 'i18next'
import styles from './Burger.module.css'

import { Currency } from '../../../../components/Currency'
import { Language } from '../../../../components/Language'
import { Button } from '../../../../ui/Button'
import { List } from '../../../../ui/List'
import { ListItem } from '../../../../ui/ListItem'
import { Typeography } from '../../../../ui/Typeography'

import { FaInstagram, FaSteam, FaTelegram, FaTwitter } from 'react-icons/fa'

interface TBurger {
	langFunc: i18n
}

export const Burger: FC<TBurger> = ({ langFunc }) => {
	const [open, setOpen] = useState(false)
	const burger = useRef<HTMLDivElement>(null)
	const burgerBtn = useRef<HTMLDivElement>(null)

	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(selectIsAuth)
	const { t } = useTranslation()

	const burgerClick = () => {
		open === false ? setOpen(true) : setOpen(false)
		if (burgerBtn.current) {
			burgerBtn.current.classList.toggle(styles['active'])
		}
		if (burger.current) {
			open
				? burger.current.classList.remove(styles['active'])
				: burger.current.classList.add(styles['active'])
		}

		changeOverflow(open)
	}

	const onClickLogout = () => {
		if (window.confirm('You really want to log out?')) {
			dispatch(logout())
			window.localStorage.removeItem('token')
		}
	}

	const social = [
		{
			icon: <FaInstagram fill='white' fontSize={'20px'} />,
			link: 'https://www.instagram.com',
		},
		{
			icon: <FaSteam fill='white' fontSize={'20px'} />,
			link: 'https://store.steampowered.com',
		},
		{
			icon: <FaTelegram fill='white' fontSize={'20px'} />,
			link: 'https://web.telegram.org',
		},
		{
			icon: <FaTwitter fill='white' fontSize={'20px'} />,
			link: 'https://twitter.com/',
		},
	]

	return (
		<>
			<div
				className={styles['burger-btn']}
				ref={burgerBtn}
				onClick={burgerClick}>
				<span className={styles['burger-span-top']}></span>
				<span className={styles['burger-span']}></span>
				<span className={styles['burger-span-bottom']}></span>
			</div>
			<div className={styles.burger} ref={burger}>
				<div className={styles['burger-main']}>
					<div className={styles['burger-top']}>
						<Link to={'/'} onClick={() => burgerClick()}>
							{' '}
							<Typeography
								variant={'h2'}
								fontSize={'32px'}
								color={'white-strong'}>
								Lynad
								<Typeography
									variant={'span'}
									fontSize={'32px'}
									color={'purple'}>
									Skins
								</Typeography>
							</Typeography>
						</Link>
					</div>
					<div className={styles.links}>
						<nav>
							<List>
								<ListItem style={styles.item}>
									<Link onClick={() => burgerClick()} to={'/trade'}>
										<Typeography color={'white-strong'} fontSize={'20px'}>
											Trade
										</Typeography>
									</Link>
								</ListItem>
								<ListItem style={styles.item}>
									<Link onClick={() => burgerClick()} to={'/market'}>
										<Typeography color={'white-strong'} fontSize={'20px'}>
											Market
										</Typeography>
									</Link>
								</ListItem>
								{isAuth && (
									<ListItem style={styles.item}>
										<Link onClick={() => burgerClick()} to={'/profile'}>
											<Typeography color={'white-strong'} fontSize={'20px'}>
												Profile
											</Typeography>
										</Link>
									</ListItem>
								)}

								<ListItem style={styles.item}>
									<Link onClick={() => burgerClick()} to={'/blog'}>
										<Typeography color={'white-strong'} fontSize={'20px'}>
											Blog
										</Typeography>
									</Link>
								</ListItem>
							</List>
						</nav>
					</div>
					<Typeography
						m={'15px 0 0 0'}
						variant={'h3'}
						fontSize={'20px'}
						color={'white-strong'}>
						{t('settings')}
					</Typeography>
					<div className={styles['burger-btns']}>
						<Language langFunc={langFunc} />
						<Currency />
					</div>
				</div>
				<div>
					{isAuth && (
						<div className=''>
							<Button
								onClick={onClickLogout}
								style={styles.btn}
								text={'Log out'}></Button>
						</div>
					)}

					<div className={styles.social}>
						<List
							display={'flex'}
							alignItems={'center'}
							justifyContent={'space-between'}>
							{social.map((item, i) => {
								return (
									<ListItem key={i} style={styles['social-item']}>
										<a href={item.link} className={styles.link}>
											{item.icon}
										</a>
									</ListItem>
								)
							})}
						</List>
					</div>
				</div>
			</div>
		</>
	)
}
