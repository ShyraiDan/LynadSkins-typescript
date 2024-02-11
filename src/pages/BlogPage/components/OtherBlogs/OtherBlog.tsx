import { useEffect, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { fetchPosts } from '../../../../redux/slices/posts'
import { ErrorMessage } from '../../../Nopage/components/ErrorMessage'
import { useTranslation } from 'react-i18next'

import { BlogItem } from '../../../../components/BlogItem'
import { BlogSkeleton } from '../../../../components/BlogSkeleton'
import { MContainer } from '../../../../ui/Container'

import styles from './OtherBlog.module.css'

export const OtherBlog: FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const posts = useAppSelector((state) => state.posts)

  console.log(posts)

  let isPostsLoading = posts.status === 'loading'

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  const textAnimation = {
    hidden: {
      x: -100,
      opacity: 0
    },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 }
    })
  }

  return (
    <>
      {posts.posts && (
        <MContainer
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          styles={posts.status === 'error' ? styles['not-found'] : styles.container}
        >
          {(isPostsLoading ? [...Array(9)] : posts.posts).map((item, i) =>
            isPostsLoading ? (
              <BlogSkeleton variants={textAnimation} custom={i + 2} key={i} />
            ) : (
              <BlogItem key={i} data={item} variants={textAnimation} custom={i + 2} />
            )
          )}

          {posts.status === 'error' && (
            <div className={styles['not-found']}>
              <ErrorMessage title={t('blog.not_found')} />
            </div>
          )}
        </MContainer>
      )}
    </>
  )
}
