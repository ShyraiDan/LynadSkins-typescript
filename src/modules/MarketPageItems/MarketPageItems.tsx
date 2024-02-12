import { useEffect, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { fetchAllSkins } from '../../redux/slices/skins'
import { decode } from '../../helpers/helpers'
import { setSkins } from '../../redux/slices/skins'
import { request } from '../../helpers/helpers'
import { TSkin } from '../../redux/types'
import { ErrorMessage } from '../../pages/Nopage/components/ErrorMessage'
import { useTranslation } from 'react-i18next'
import styles from './MarketPageItems.module.css'

import { Item } from '../../components/Item'
import { SkeletonItem } from '../../components/SkeletonItem'
import { Typeography } from '../../ui/Typeography'

export const MarketPageItems: FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const filters = useAppSelector(({ filters }) => filters)

  useEffect(() => {
    const token = localStorage.getItem('token')
    let userId = null

    if (token) {
      userId = decode(token).payload._id
    }
    const st = request(filters.filters)
    dispatch(fetchAllSkins([userId, st])).then((res) => dispatch(setSkins(res.payload)))
  }, [filters])

  const skins = useAppSelector((state) => state.skins)

  return (
    <div className={`${styles['main-container']} ${skins.status === 'error' && styles['no-skins']}`}>
      {skins.status !== 'error' ? (
        <div className={styles.conitaner}>
          {(skins.items ? skins.items : [...Array(50)]).map((item: TSkin, i: number) => {
            return skins ? <Item key={i} data={item} /> : <SkeletonItem key={i} />
          })}
        </div>
      ) : (
        <Typeography variant='h2' color={'white'}>
          {t('no_skins')}
        </Typeography>
      )}
    </div>
  )
}
