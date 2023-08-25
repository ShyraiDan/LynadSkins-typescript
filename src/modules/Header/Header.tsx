import { AnimatePresence } from 'framer-motion'
import { useEffect, useState, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { Link } from 'react-router-dom'
import axios from '../../axios'
import { changeOverflow } from '../../helpers/helpers'
import { selectIsAuth } from '../../redux/slices/auth'
import { setSignInState } from '../../redux/slices/signInModal'
import { i18n } from 'i18next'
import styles from './Header.module.css'

import { Currency } from '../../components/Currency'
import { DarkMode } from '../../components/DarkMode'
import { Language } from '../../components/Language'
import { Modal } from '../../components/Modal'
import { Money } from '../../components/Money'
import { Button } from '../../ui/Button'
import { List } from '../../ui/List'
import { ListItem } from '../../ui/ListItem'
import { Typeography } from '../../ui/Typeography'
import { SignInModal } from '../SignInModal'
import { SignUpModal } from '../SignUpModal'
import { Burger } from './components/Burger'
import { Profile } from './components/Profile'

interface IHeader {
	theme: string
	setTheme: (theme: string) => void
	langFunc: i18n
}

export const Header: FC<IHeader> = ({ theme, setTheme, langFunc }) => {
	const dispatch = useAppDispatch()
	const singInOpen = useAppSelector((store) => store.signInModal)
	const [open, setOpen] = useState<boolean>(singInOpen.state || false)
	const [signUpOpen, setSignUpOpen] = useState<boolean>(false)
	const [data, setData] = useState(null)
	const isAuth = useAppSelector(selectIsAuth)
	const handleClick = () => {
		if (singInOpen.state) {
			dispatch(setSignInState(false))
			setOpen(false)
			changeOverflow(true)
			return
		}
		setOpen(!open)
		changeOverflow(open)
	}

	const openSignUpModal = () => {
		setSignUpOpen(!signUpOpen)
		changeOverflow(signUpOpen)
	}

	useEffect(() => {
		if (isAuth) {
			const token = window.localStorage.getItem('token')

			axios
				.get('/auth/me', {
					data: {
						token,
					},
				})
				.then((res) => {
					setData(res.data)
				})
		}
	}, [isAuth])

	return (
		<div className={styles.header}>
			<nav className={styles['nav-bar']}>
				<List display={'flex'}>
					<ListItem style={styles.item}>
						{' '}
						<Link className={styles.link} to={'/'}>
							<Typeography variant={'h2'} fontSize={'20px'} color={'white'}>
								Lynad
								<Typeography
									variant={'span'}
									color={'purple'}
									fontSize={'20px'}>
									Skins
								</Typeography>
							</Typeography>
						</Link>
					</ListItem>
					<ListItem style={styles.item}>
						{' '}
						<Link className={styles.link} to={'/trade'}>
							Trade
						</Link>
					</ListItem>
					<ListItem style={styles.item}>
						{' '}
						<Link className={styles.link} to={'/market'}>
							Market
						</Link>
					</ListItem>
					<ListItem style={styles.item}>
						<Link className={styles.link} to={'/blog'}>
							Blog
						</Link>
					</ListItem>
				</List>
			</nav>

			<div className={styles.burger}>
				<Burger langFunc={langFunc} />
			</div>
			<div className={styles.left}>
				<div className={styles.btns}>
					<Currency />
					<Language langFunc={langFunc} />
				</div>
				<DarkMode theme={theme} setTheme={setTheme} />
				{isAuth && data && (
					<>
						<Money />
						<div className={styles.hide}>
							<Profile />
						</div>
					</>
				)}
				{!isAuth && (
					<>
						<Button
							text={'Sign up'}
							style={styles.btn}
							hover={true}
							onClick={() => openSignUpModal()}></Button>
						<Button
							text={'Sign in'}
							style={styles['btn-second']}
							hover={true}
							onClick={() => handleClick()}></Button>
					</>
				)}
				<AnimatePresence initial={false}>
					{(singInOpen.state || open) && (
						<Modal
							children={
								<SignInModal setState={setOpen} setOtherState={setSignUpOpen} />
							}
							handleClick={() => handleClick()}
						/>
					)}
				</AnimatePresence>
				<AnimatePresence initial={false}>
					{signUpOpen && (
						<Modal
							children={
								<SignUpModal setState={setSignUpOpen} setOtherState={setOpen} />
							}
							handleClick={() => openSignUpModal()}
						/>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
