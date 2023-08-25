import { FC, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../redux/hook'
import { setFilters, resetFilters } from '../../redux/slices/filters'
import { useForm } from 'react-hook-form'
import { Input } from '../../ui/Input'
import styles from './MarketPageSide.module.css'

import { Color } from './components/Color'
import { Exterior } from './components/Exterior'
import { Float } from './components/Float'
import { Other } from './components/Other'
import { Price } from './components/Price'
import { Rarity } from './components/Rarity'
import { Type } from './components/Type'
import { FilterItem } from './components/FilterItem'
import { Button } from '../../ui/Button'
import { Container } from '../../ui/Container/Container'
import { Typeography } from '../../ui/Typeography'

export const MarketPageSide: FC = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const { register, handleSubmit, reset } = useForm()

	const filters = [
		{ text: t('price'), comp: <Price register={register} /> },
		{ text: t('type'), comp: <Type register={register} /> },
		{ text: t('exteriror'), comp: <Exterior register={register} /> },
		{ text: t('colour'), comp: <Color register={register} /> },
		{ text: t('float'), comp: <Float register={register} /> },
		{ text: t('rarity'), comp: <Rarity register={register} /> },
		{ text: t('other'), comp: <Other register={register} /> },
	]

	const handleResetFilters = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		dispatch(resetFilters())
		reset()
	}

	const onSubmit = (data: any) => {
		dispatch(setFilters(data))
	}
	return (
		<Container styles={styles.container}>
			<Typeography variant={'h2'} fontSize={'24px'} color={'white'}>
				{t('filters')}
			</Typeography>
			<div className={styles.filters}>
				<form onSubmit={handleSubmit(onSubmit)}>
					{filters.map((item, i) => (
						<FilterItem
							key={i}
							filter={item.text}
							fullList={item.comp}
							// register={register}
						/>
					))}
					<div className={styles.btns}>
						<Input type={'submit'} mt={'10px'} value={t('save')} />

						<Button
							text={t('reset')}
							style={styles.btn}
							hover={true}
							onClick={() => handleResetFilters}></Button>
					</div>
				</form>
			</div>
		</Container>
	)
}
