import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { fetchRemovePost } from '../../redux/slices/posts'
import { useNavigate, Link } from 'react-router-dom'
import { TPost } from '../../redux/types'
import styles from './Post.module.css'

import { Container } from '../../ui/Container'
import { List } from '../../ui/List'
import { ListItem } from '../../ui/ListItem'
import { Typeography } from '../../ui/Typeography'
import { PostSkeleton } from './components/PostSkeleton'

import { FaCommentAlt, FaEye, FaUserAlt, FaEdit, FaTrash } from 'react-icons/fa'

interface IPost {
	data: TPost | undefined
}

export const Post: FC<IPost> = ({ data }) => {
	console.log(data)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const userData = useAppSelector((state) => state.auth.data)

	const onClickRemove = () => {
		if (window.confirm('You really want to delete post?') && data) {
			dispatch(fetchRemovePost(data._id))
		}
		navigate('/blog')
	}

	return (
		<Container styles={styles.container}>
			{data ? (
				<>
					<img
						src={`${process.env.REACT_APP_API_URL}${data.imageUrl}`}
						alt=''
						className={styles.postImage}
					/>
					<div className={styles.wrapper}>
						<div className={styles.userInfo}>
							<div className={styles.user}>
								<FaUserAlt color='white' />
							</div>
							<div className={styles.info}>
								<div className={styles.userDetails}>
									<span className={styles.userName}>{data?.user.fullName}</span>
									<span className={styles.additional}>
										{data?.createdAt.substring(0, 10)}
									</span>
								</div>
								{userData?._id === data?.user._id && (
									<div>
										<Link to={`/blog/${data?._id}/edit`}>
											<FaEdit
												fill='var(--text-primary)'
												className={styles.edit}
											/>
										</Link>
										<FaTrash
											fill='var(--text-primary)'
											onClick={onClickRemove}
											className={styles.remove}
										/>
									</div>
								)}
							</div>
						</div>
						<div className={styles.postContainer}>
							<Typeography
								color={'white'}
								variant={'h1'}
								fontSize={'32px'}
								fontWeight={800}>
								{data?.title}
							</Typeography>
							<List display={'flex'} mt={'5px'}>
								{data?.tags.map((item: string, i: number) => (
									<ListItem style={styles.hashtag}>
										<a key={i} href='/' className={styles.link}>
											#{item}
										</a>
									</ListItem>
								))}
							</List>
							<div className={styles.postContent}>
								<Typeography color={'white'}>{data?.text}</Typeography>
							</div>
							<List display={'flex'}>
								<ListItem style={styles.icon}>
									<FaEye fontSize={'18px'} />
									<span className={styles.counter}>{data?.viewsCount}</span>
								</ListItem>
								<ListItem style={styles.icon}>
									<FaCommentAlt fontSize={'18px'} />
									<span className={styles.counter}>0</span>
								</ListItem>
							</List>
						</div>
					</div>
				</>
			) : (
				<PostSkeleton />
			)}
		</Container>
	)
}
