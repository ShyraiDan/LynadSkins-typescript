import { useState, useRef, ChangeEvent, FC } from 'react'
import styles from './Search.module.css'
import { useAppSelector } from '../../../../redux/hook'
import { TSkin } from '../../../../redux/types'

import { Container } from '../../../../ui/Container'
import { Input } from '../../../../ui/Input'
import { SmallItem } from '../../../../components/SmallItem'

export const Search: FC = () => {
  const [search, setSearch] = useState('')
  const skins = useAppSelector((store) => store.skins.items)
  const skinsShow = useRef<HTMLDivElement>(null)

  const handleSearch = (e: ChangeEvent<HTMLInputElement> | undefined) => {
    if (e !== undefined && skinsShow.current) {
      let dspl = e.target.value ? 'block' : 'none'
      skinsShow.current.style.display = dspl
      setSearch(e.target.value)
    }
  }

  return (
    <Container styles={styles.container}>
      <div className={styles.top}>
        <form className={styles.form}>
          <Input width={'100%'} placeholder={'Search...'} onChange={(e) => handleSearch(e)} />
        </form>
      </div>
      <div className={styles['skins-container']}>
        <div className={styles.skins} ref={skinsShow}>
          {skins &&
            skins
              .filter((item: TSkin) => {
                return search.toLowerCase() === '' ? item : item.skinName.toLowerCase().includes(search.toLowerCase())
              })
              .map((item: TSkin) => {
                return <SmallItem data={item} />
              })}
        </div>
      </div>
    </Container>
  )
}
