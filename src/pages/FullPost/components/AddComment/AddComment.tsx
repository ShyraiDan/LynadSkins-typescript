import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AddComment.module.css'

import { Button } from '../../../../ui/Button'
import { Container } from '../../../../ui/Container'

import { FaUserAlt } from 'react-icons/fa'

export const AddComment: FC = () => {
	const { t } = useTranslation()
	return (
		<Container styles={styles.addComment}>
			<div className={styles.user}>
				<FaUserAlt color='white' />
			</div>
			<div className={styles.textBox}>
				<textarea className={styles.textarea} placeholder=''></textarea>
				<Button
					text={t('blog.publish')}
					hover={true}
					style={styles.btn}></Button>
			</div>
		</Container>
	)
}
