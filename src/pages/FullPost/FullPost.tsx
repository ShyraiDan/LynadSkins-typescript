import { useEffect, useState, FC } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import styles from './Fullpost.module.css'

import { Post } from '../../modules/Post'
import { Container } from '../../ui/Container'

export const FullPost: FC = () => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.warn(err)
        alert('Error getting post')
      })
  }, [])

  return (
    <Container styles={styles.container}>
      <Post data={data}></Post>
    </Container>
  )
}
