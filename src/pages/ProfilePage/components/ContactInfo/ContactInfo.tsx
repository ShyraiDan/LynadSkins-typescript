import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from './ContactInfo.module.css'

import { Button } from '../../../../ui/Button'
import { List } from '../../../../ui/List'
import { ListItem } from '../../../../ui/ListItem'
import { Typeography } from '../../../../ui/Typeography'

import { FaPen, FaTrash } from 'react-icons/fa'

export const ContactInfo: FC = () => {
	const { t } = useTranslation()
	const nav = useNavigate()
	return (
		<div>
			<Typeography
				variant={'h2'}
				fontSize={'24px'}
				color={'white'}
				m={'0 0 10px 0'}>
				{t('personalPage.contact_info')}
			</Typeography>
			<List mt={'15px'} mb={'15px'}>
				<ListItem style={styles.item}>
					<div className={styles['item-top']}>
						<Typeography color={'white'}>E-mail:</Typeography>
						<div className={styles.icons}>
							<FaPen
								fill='var(--text-primary)'
								className={styles['icon-hover']}
							/>
							<span className={styles.icon}>
								{' '}
								<FaTrash
									fill='var(--text-primary)'
									className={styles['icon-hover']}
								/>
							</span>
						</div>
					</div>
					<Typeography color={'grey'}>
						{t('personalPage.not_installed')}
					</Typeography>
				</ListItem>
				<ListItem style={styles.item}>
					<div className={styles['item-top']}>
						<Typeography color={'white'}>Telegram:</Typeography>
						<div className={styles.icons}>
							<FaPen
								fill='var(--text-primary)'
								className={styles['icon-hover']}
							/>
							<span className={styles.icon}>
								{' '}
								<FaTrash
									fill='var(--text-primary)'
									className={styles['icon-hover']}
								/>
							</span>
						</div>
					</div>
					<Typeography color={'grey'}>
						{t('personalPage.not_installed')}
					</Typeography>
				</ListItem>
				<div className={styles.post}>
					<Typeography color={'white'}>
						{t('personalPage.you_have_something')}
					</Typeography>
					<Button
						hover={true}
						text={t('personalPage.create_post')}
						onClick={() => nav('/add-post')}></Button>
				</div>
			</List>
		</div>
	)
}
