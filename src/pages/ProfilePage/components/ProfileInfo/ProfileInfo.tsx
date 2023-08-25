import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { TUser } from '../../../../redux/types'
import styles from './ProfileInfo.module.css'

import { Container } from '../../../../ui/Container'
import { List } from '../../../../ui/List'
import { ListItem } from '../../../../ui/ListItem'
import { Typeography } from '../../../../ui/Typeography'

interface IProfileInfo {
	data: TUser | null
}

export const ProfileInfo: FC<IProfileInfo> = ({ data }) => {
	const { t } = useTranslation()
	return (
		<Container>
			<Typeography fontSize={'24px'} variant={'h2'} color={'white'}>
				{t('personalPage.profile')}
			</Typeography>
			<div className={styles['profile-info']}>
				<Typeography variant={'h3'} color={'white'}>
					{t('personalPage.profile_name')}
				</Typeography>
				<Typeography variant={'h3'} color={'white'}>
					{data?.fullName}
				</Typeography>
			</div>
			<List>
				<ListItem
					display={'flex'}
					justifyContent={'space-between'}
					style={styles.item}>
					<Typeography color={'grey'}>
						{t('personalPage.commission')}
					</Typeography>
					<Typeography color={'white'}>7%</Typeography>
				</ListItem>
				<ListItem
					display={'flex'}
					justifyContent={'space-between'}
					style={styles.item}>
					<Typeography color={'grey'}>
						{t('personalPage.registration')}
					</Typeography>
					<Typeography color={'white'}>20.01.2020</Typeography>
				</ListItem>
				<ListItem
					display={'flex'}
					justifyContent={'space-between'}
					style={styles.item}>
					<Typeography color={'grey'}>{t('personalPage.trades')}</Typeography>
					<Typeography color={'white'}>0</Typeography>
				</ListItem>
			</List>
		</Container>
	)
}
