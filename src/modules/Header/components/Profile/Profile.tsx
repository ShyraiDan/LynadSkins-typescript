import { AnimatePresence } from 'framer-motion'
import { useState, FC } from 'react'
import styles from './Profile.module.css'

import { ProfileList } from './components/ProfileList'

import { FaUserAlt } from 'react-icons/fa'

export const Profile: FC = () => {
	const [smallModal, setSmallModal] = useState(false)
	return (
		<div className={styles.icon} onClick={() => setSmallModal(!smallModal)}>
			<div className={styles.user}>
				<FaUserAlt color='white' />
			</div>
			<AnimatePresence initial={false}>
				{smallModal && <ProfileList />}
			</AnimatePresence>
		</div>
	)
}
