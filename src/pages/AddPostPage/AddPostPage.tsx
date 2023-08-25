import { useEffect, useRef, useState, FC, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../redux/hook'
import axios from '../../axios'
import styles from './AddPostPage.module.css'
import { selectIsAuth } from '../../redux/slices/auth'

import { Button } from '../../ui/Button'
import { Container } from '../../ui/Container'

export const AddPostPage: FC = () => {
	const { t } = useTranslation()
	const { id } = useParams()
	const navigate = useNavigate()
	const isAuth = useAppSelector(selectIsAuth)
	const [isLoading, setLoading] = useState(false)
	const [text, setText] = useState('')
	const [title, setTitle] = useState('')
	// сменили масив на строку
	const [tags, setTags] = useState<string>('')
	const [imageUrl, setImageUrl] = useState('')
	const inputFileRef = useRef<HTMLInputElement>(null)

	const isEditing = Boolean(id)

	const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		try {
			const formData = new FormData()
			if (!event.target.files) return
			const file: File = event.target.files[0]
			formData.append('image', file)
			const { data } = await axios.post('/upload', formData)
			setImageUrl(data.url)
		} catch (err) {
			console.warn(err)
			alert('Error adding image')
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl('')
	}

	const onSubmit = async () => {
		try {
			setLoading(true)
			const fields = {
				title,
				imageUrl,
				tags,
				text,
			}
			const { data } = isEditing
				? await axios.patch(`/posts/${id}`, fields)
				: await axios.post('/posts', fields)
			const _id = isEditing ? id : data._id
			navigate(`/blog/${_id}`)
		} catch (err) {
			console.warn(err)
			alert('Error in creating post')
		}
	}

	useEffect(() => {
		if (id) {
			axios
				.get(`/posts/${id}`)
				.then(({ data }) => {
					setTitle(data.title)
					setText(data.text)
					setImageUrl(data.imageUrl)
					setTags(data.tags.join(','))
				})
				.catch((err) => {
					console.warn(err)
					alert(err)
				})
		}
	}, [])

	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to='/' />
	}

	return (
		<Container styles={styles.container}>
			<div className={styles['image-container']}>
				<div>
					{imageUrl && (
						<img
							className={styles.image}
							// process.env.REACT_APP_API_URL
							//src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
							src={`http://localhost:4444${imageUrl}`}
							alt='Uploaded'
						/>
					)}
				</div>
				<div className={styles.btns}>
					<Button
						text={t('blog.download_preview')}
						onClick={() => {
							if (inputFileRef.current) {
								return inputFileRef.current.click()
							}
						}}></Button>
					<input
						onChange={handleChangeFile}
						type='file'
						hidden
						ref={inputFileRef}
					/>
					{imageUrl && (
						<Button
							text={t('blog.delete')}
							onClick={onClickRemoveImage}></Button>
					)}
				</div>
			</div>
			<input
				type='text'
				className={styles['input-title']}
				placeholder={t('blog.enter_title')}
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type='text'
				className={styles['input-tags']}
				value={tags}
				onChange={(e) => setTags(e.target.value)}
				placeholder={t('blog.enter_tags')}
			/>

			<textarea
				value={text}
				onChange={(e) => setText(e.target.value)}
				className={styles.textarea}
				placeholder={t('blog.enter_text')}></textarea>
			<div className={styles.buttons}>
				<Button
					onClick={onSubmit}
					text={isEditing ? t('blog.save') : t('blog.publish')}
					style={styles.submit}></Button>
				<a href='/blog'>
					<Button text={t('blog.cancel')}></Button>
				</a>
			</div>
		</Container>
	)
}
