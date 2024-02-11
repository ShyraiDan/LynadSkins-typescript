import { AnimatePresence, motion } from 'framer-motion'
import { useState, FC, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { i18n } from 'i18next'
import styles from './Language.module.css'

import { List } from '../../ui/List'
import { ListItem } from '../../ui/ListItem'
import { Typeography } from '../../ui/Typeography'

import { FaChevronDown } from 'react-icons/fa'
import ua from './../../i/icons/ua.svg'
import usa from './../../i/icons/usa.svg'

interface ILanguage {
  langFunc: i18n
}

export const Language: FC<ILanguage> = ({ langFunc }) => {
  const [languageOpen, setlanguageOpen] = useState(false)
  const { t } = useTranslation()
  const openModal = (val: boolean, setVal: Dispatch<SetStateAction<boolean>>): void => {
    setVal(!val)
  }

  const changeLanguage = (val: string): void => {
    if (langFunc.language !== val) {
      langFunc.changeLanguage(val)
      setlanguageOpen((state) => !state)
    }
  }

  return (
    <div className={styles['lang-cont']}>
      <div onClick={() => openModal(languageOpen, setlanguageOpen)}>
        <Typeography color={'white'} hover={true} icon={true}>
          {t('language')}
          <span className={languageOpen ? `${styles.icon} ${styles['icon-opened']}` : styles.icon}>
            <FaChevronDown fontSize={'16px'} />
          </span>
        </Typeography>
      </div>
      <AnimatePresence initial={false}>
        {languageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.language}
          >
            <List>
              <ListItem
                onClick={() => changeLanguage('en')}
                style={`${styles.item} ${langFunc.language === 'en' && styles.selected}`}
              >
                <img src={usa} alt='' className={styles.img} />
                <Typeography color={langFunc.language === 'en' ? 'grey' : 'white'} hover={langFunc.language !== 'en'}>
                  {t('language_modal.us')}
                </Typeography>
              </ListItem>
              <ListItem
                onClick={() => changeLanguage('ua')}
                style={`${styles.item} ${langFunc.language === 'ua' && styles.selected}`}
              >
                <img src={ua} alt='' className={styles.img} />
                <Typeography color={langFunc.language === 'ua' ? 'grey' : 'white'} hover={langFunc.language !== 'ua'}>
                  {t('language_modal.ua')}
                </Typeography>
              </ListItem>
            </List>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
