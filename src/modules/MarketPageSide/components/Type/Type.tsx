import { useTranslation } from 'react-i18next'
import { FC } from 'react'
import styles from './Type.module.css'

import { SideItem } from '../../../../components/SideItem'
import { MContainer } from '../../../../ui/Container'
import { List } from '../../../../ui/List'

interface IType {
	register: Function
}

export const Type: FC<IType> = ({ register }) => {
	const { t } = useTranslation()
	const items = [
		{ text: t('knives'), value: 'Knives' },
		{ text: t('gloves'), value: 'Gloves' },
		{ text: t('pistols'), value: 'Pistols' },
		{ text: t('smgs'), value: 'SMGs' },
		{ text: t('assault_rifles'), value: 'Assault Rifles' },
		{ text: t('sniper_rifles'), value: 'Sniper Rifles' },
		{ text: t('shotguns'), value: 'Shotguns' },
		{ text: t('machine_guns'), value: 'Machine Guns' },
	]
	return (
		<MContainer
			styles={styles.typeContainer}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
			<List>
				{items.map((item, i) => {
					return (
						<SideItem
							key={i}
							text={item.text}
							value={item.value}
							register={register}
							filterParam={'type'}
						/>
					)
				})}
			</List>
		</MContainer>
	)
}
