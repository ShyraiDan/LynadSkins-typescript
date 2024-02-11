import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './ErrorMessage.module.css'

import { Button } from '../../../../ui/Button'
import { Typeography } from '../../../../ui/Typeography'

interface IErrorMessage {
  title: string
  subtitle?: string
}

export const ErrorMessage: FC<IErrorMessage> = ({ title, subtitle }) => {
  const { t } = useTranslation()
  const nav = useNavigate()

  return (
    <div className={styles.item}>
      <Typeography color={'white'} variant={'h1'} m={'0 0 10px 0'}>
        {title}
      </Typeography>
      {subtitle && (
        <Typeography color={'white'} variant={'h2'}>
          {subtitle}
        </Typeography>
      )}
      <div className={styles.btns}>
        <Button hover={true} style={styles.btn} onClick={() => nav('/trade')} text={t('no_page.move_trade')}></Button>
        <Button hover={true} style={styles.btn} onClick={() => nav('/market')} text={t('no_page.move_market')}></Button>
      </div>
    </div>
  )
}
