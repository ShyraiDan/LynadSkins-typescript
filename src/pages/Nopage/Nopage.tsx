import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Nopage.module.css'

import { Container } from '../../ui/Container'
import { ErrorMessage } from './components/ErrorMessage'

export const Nopage: FC = () => {
  const { t } = useTranslation()

  return (
    <Container styles={styles.container}>
      <ErrorMessage title={t('no_page.page_not_found')} subtitle={t('no_page.error_reload')}></ErrorMessage>
    </Container>
  )
}
