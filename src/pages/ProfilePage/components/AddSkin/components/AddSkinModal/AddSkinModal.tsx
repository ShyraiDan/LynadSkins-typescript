import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createSkin } from '../../../../../../redux/slices/skins'
import { useAppDispatch } from '../../../../../../redux/hook'
import { TSkin } from '../../../../../../redux/types'
import styles from './AddSkinModal.module.css'

import { Container } from '../../../../../../ui/Container'
import { Input } from '../../../../../../ui/Input'
import { Typeography } from '../../../../../../ui/Typeography'

export const AddSkinModal: FC = () => {
	const dispatch = useAppDispatch()

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		control,
		reset,
	} = useForm<TSkin>({
		mode: 'onBlur',
	})

	const onSubmit = async (values: TSkin) => {
		await dispatch(createSkin(values))
		reset()
	}

	return (
		<Container styles={styles.container}>
			<Typeography variant={'h3'} color={'white'} m={'0 0 10px 0'}>
				Add your skin
			</Typeography>
			<form action='' onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<label htmlFor='itemName' className={styles.label}>
					Item name:
					<Input
						id={'itemName'}
						mt={'5px'}
						type={'text'}
						placeholder={'Item name'}
						obj={register('itemName', {
							required: true,
							minLength: 3,
						})}
					/>
				</label>
				<div>
					{errors?.itemName && (
						<p className={styles.error}>
							{errors?.itemName?.message || 'Mininum length equals 3'}
						</p>
					)}
				</div>
				<label htmlFor='skinName' className={styles.label}>
					Skin name:
					<Input
						id={'skinName'}
						mt={'5px'}
						type={'text'}
						placeholder={'Skin name'}
						obj={register('skinName', {
							required: true,
							minLength: 3,
						})}
					/>
				</label>
				<div>
					{errors?.skinName && (
						<p className={styles.error}>
							{errors?.skinName?.message || 'Mininum length equals 3'}
						</p>
					)}
				</div>
				<div className={styles.selects}>
					<Controller
						control={control}
						name='exterior'
						rules={{
							required: 'Exterior is required',
						}}
						render={({ field: { onChange }, fieldState: { error } }) => (
							<>
								<select
									className={styles.select}
									onChange={(newValue) => onChange(newValue)}>
									<option value='-1'>Select exterior</option>
									<option value='Factory New'>Factory New</option>
									<option value='Minimal Wear'>Minimal Wear</option>
									<option value='Field-Tested'>Field-Tested</option>
									<option value='Well-Worn'>Well-Worn</option>
									<option value='Battle-Scarred'>Battle-Scarred</option>
								</select>
								<div>
									{error && <p className={styles.error}>{error.message}</p>}
								</div>
							</>
						)}
					/>
					<Controller
						control={control}
						name='rarity'
						rules={{
							required: 'Rariry is required',
						}}
						render={({ field: { onChange }, fieldState: { error } }) => (
							<>
								<select
									className={styles.select}
									onChange={(newValue) => onChange(newValue)}>
									<option value='-1'>Select rarity</option>
									<option value='Consumer Grade'>Consumer Grade</option>
									<option value='Industrial Grade'>Industrial Grade</option>
									<option value='Mil-Spec Grade'>Mil-Spec Grade</option>
									<option value='Restricted'>Restricted</option>
									<option value='Classified'>Classified</option>
									<option value='Covert'>Covert</option>
								</select>
								<div>
									{error && <p className={styles.error}>{error.message}</p>}
								</div>
							</>
						)}
					/>
					<Controller
						control={control}
						name='type'
						rules={{
							required: 'Gun type is required',
						}}
						render={({ field: { onChange }, fieldState: { error } }) => (
							<>
								<select
									className={styles.select}
									onChange={(newValue) => onChange(newValue)}>
									<option value='-1'>Select gun type</option>
									<option value='Knives'>Knives</option>
									<option value='Gloves'>Gloves</option>
									<option value='Pistols'>Pistols</option>
									<option value='SMGs'>SMGs</option>
									<option value='Assault Rifles'>Assault Rifles</option>
									<option value='Sniper Rifles'>Sniper Rifles</option>
									<option value='Shotguns'>Shotguns</option>
									<option value='Machine guns'>Machine guns</option>
								</select>
								<div>
									{error && <p className={styles.error}>{error.message}</p>}
								</div>
							</>
						)}
					/>
				</div>

				<label htmlFor='price' className={styles.label}>
					Price:
					<Input
						id={'price'}
						mt={'5px'}
						type={'text'}
						placeholder={'Price'}
						obj={register('price', {
							required: true,
						})}
					/>
				</label>
				<div>
					{errors?.price && (
						<p className={styles.error}>
							{errors?.price?.message || 'Price is required'}
						</p>
					)}
				</div>

				<label htmlFor='float' className={styles.label}>
					Float:
					<Input
						id={'float'}
						mt={'5px'}
						type={'text'}
						placeholder={'Float'}
						obj={register('float', {
							required: true,
						})}
					/>
				</label>
				<div>
					{errors?.float && (
						<p className={styles.error}>
							{errors?.float?.message || 'Float is required'}
						</p>
					)}
				</div>

				<div className={styles.checkboxes}>
					<label
						htmlFor='statTrack'
						className={`${styles.label} ${styles['label-checkbox']}`}>
						Statrack:
					</label>
					<input
						id='statTrack'
						type='checkbox'
						placeholder={'statTrack'}
						{...register('statTrak', {})}
					/>

					<label
						htmlFor='souvenir'
						className={`${styles.label} ${styles['label-checkbox']}`}>
						Souvenir:
					</label>
					<input
						type='checkbox'
						id='souvenir'
						placeholder={'souvenir'}
						{...register('souvenir', {})}
					/>
				</div>

				<label htmlFor='color' className={styles.label}>
					Color:
					<p>Enter colors separated by commas</p>
					<Input
						id={'color'}
						mt={'5px'}
						placeholder={'Color'}
						obj={register('color', {
							required: true,
						})}
					/>
				</label>
				<label htmlFor='imageUrl' className={styles.label}>
					Image link:
					<Input
						id={'imageUrl'}
						mt={'5px'}
						type={'link'}
						placeholder={'Image link'}
						obj={register('imageUrl', {
							required: true,
						})}
					/>
				</label>
				<div className={styles.btns}>
					<Input width={'min-content'} type={'submit'} value={'Add skin'} />
					<Input width={'min-content'} type={'reset'} value={'Reset'} />
				</div>
			</form>
		</Container>
	)
}
