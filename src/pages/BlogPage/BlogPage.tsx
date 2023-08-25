import { FC } from 'react'
import styles from './BlogPage.module.css'

import { Container } from '../../ui/Container'
import { OtherBlog } from './components/OtherBlogs'

export const BlogPage: FC = () => {
	return (
		<Container styles={styles.container}>
			<OtherBlog />
		</Container>
	)
}
