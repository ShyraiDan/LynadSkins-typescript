import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Exterior.module.css'

import { MContainer } from '../../../../ui/Container'
import { List } from '../../../../ui/List'
import { SideItem } from '../../../../components/SideItem'

interface IExterior {
	register: Function
}

export const Exterior: FC<IExterior> = ({ register }) => {
	const { t } = useTranslation()
	const items = [
		{ text: t('factory_new'), value: 'Factory New' },
		{ text: t('minimal_wear'), value: 'Minimal Wear' },
		{ text: t('field_tested'), value: 'Field-Tested' },
		{ text: t('well_worn'), value: 'Well-Worn' },
		{ text: t('battle_scarred'), value: 'Battle-Scarred' },
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
							filterParam={'exterior'}
						/>
					)
				})}
			</List>
		</MContainer>
	)
}
