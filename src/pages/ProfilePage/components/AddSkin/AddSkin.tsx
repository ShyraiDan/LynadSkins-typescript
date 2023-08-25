import { useState, FC } from 'react'
import { changeOverflow } from '../../../../helpers/helpers'
import styles from './AddSkin.module.css'

import { Modal } from '../../../../components/Modal/Modal'
import { Button } from '../../../../ui/Button'
import { AddSkinModal } from './components/AddSkinModal'

import { FiPlus } from 'react-icons/fi'

export const AddSkin: FC = () => {
	const [open, setOpen] = useState(false)

	const openModal = () => {
		setOpen(!open)
		changeOverflow(open)
	}

	return (
		<>
			<Button
				hover={true}
				style={styles.btn}
				onClick={() => openModal()}
				text={<FiPlus fontSize={'24px'} />}></Button>

			{open && (
				<Modal children={<AddSkinModal />} handleClick={() => openModal()} />
			)}
		</>
	)
}
