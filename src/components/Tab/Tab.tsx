import { useState, ReactNode, FC } from 'react'
import { Button } from '../../ui/Button'
import { Container } from '../../ui/Container'
import styles from './Tab.module.css'

interface ITab {
	amount: number
	firstTab: string
	secondTab: string
	thirdTab?: string
	firstContent: ReactNode
	secondContent: ReactNode
	thirdContent?: ReactNode
}

export const Tab: FC<ITab> = ({
	amount,
	firstTab,
	secondTab,
	thirdTab,
	firstContent,
	secondContent,
	thirdContent,
}) => {
	const [toggleState, setToggleState] = useState(1)
	return (
		<Container styles={styles.container}>
			<div className={styles['bloc-tabs']}>
				<Button
					onClick={() => setToggleState(1)}
					style={
						toggleState === 1
							? `${styles.tabs} ${styles['active-tabs']}`
							: styles.tabs
					}
					text={firstTab}></Button>
				<Button
					style={
						toggleState === 2
							? `${styles.tabs} ${styles['active-tabs']}`
							: styles.tabs
					}
					onClick={() => setToggleState(2)}
					text={secondTab}></Button>
				{amount > 2 && (
					<Button
						style={
							toggleState === 3
								? `${styles.tabs} ${styles['active-tabs']}`
								: styles.tabs
						}
						onClick={() => setToggleState(3)}
						text={thirdTab}></Button>
				)}
			</div>
			<div className={styles['content-tabs']}>
				<div
					className={
						toggleState === 1
							? `${styles.content} ${styles['active-content']}`
							: styles.content
					}>
					{firstContent}
				</div>
			</div>
			<div
				className={
					toggleState === 2
						? `${styles.content} ${styles['active-content']}`
						: styles.content
				}>
				{secondContent}
			</div>
			{amount > 2 && (
				<div
					className={
						toggleState === 3
							? `${styles.content} ${styles['active-content']}`
							: styles.content
					}>
					{thirdContent}
				</div>
			)}
		</Container>
	)
}
