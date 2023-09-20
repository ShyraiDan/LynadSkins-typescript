import { AnimatePresence } from 'framer-motion'
import { useState, FC } from 'react'
import { changeOverflow } from '../../helpers/helpers'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { addCart } from '../../redux/slices/cart'
import { updateSkin } from '../../redux/slices/skins'
import { addChange } from '../../redux/slices/change'
import { useTranslation } from 'react-i18next'
import { TSkin } from '../../redux/types'
import styles from './Item.module.css'

import { ItemModal } from '../ItemModal'
import { Modal } from '../Modal/Modal'
import { Button } from '../../ui/Button'
import { Typeography } from '../../ui/Typeography'

import { FaShoppingCart } from 'react-icons/fa'

interface IItem {
  data: TSkin
}

export const Item: FC<IItem> = ({ data }) => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart)
  const currency = useAppSelector((state) => state.currency)
  const [status, setStatus] = useState(data?.onTrade)
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const handleClick = (e: any) => {
    if (e.target.classList.length === 0 || e.target.classList[0].substr(0, 6) === 'Button') {
      return
    }
    setOpen(!open)
    changeOverflow(open)
  }

  const addToCart = () => {
    dispatch(addCart(data))
  }

  const handleTrade = (data: TSkin) => {
    let item = { ...data }
    item.onTrade = !item.onTrade
    item.color = String(item.color)
    dispatch(updateSkin(item))
    setStatus(!status)
  }

  const handleChange = (data: TSkin) => {
    dispatch(addChange(data))
    // Было закомичено до интеграции тс
    // setStatus(!status)
  }

  const index = cart.findIndex((item) => data._id === item._id)

  const page = window.location.href.match('/profile')
  const pageTrage = window.location.href.match('/trade')

  return (
    <>
      <div className={styles.item} onClick={(e) => handleClick(e)}>
        <img src={data?.imageUrl} alt={`${data?.itemName}-${data?.skinName}`} className={styles.photo} loading='lazy' />
        {/* ${
						page && styles.description_bottom
					} */}
        <div className={`${styles.description} `}>
          <Typeography variant={'h3'} fontSize={'16px'} color={'grey'}>
            <Typeography variant={'span'} color={'gold'} fontSize={'16px'}>{`${
              data?.souvenir === true ? 'SV ' : ''
            }`}</Typeography>
            <Typeography variant={'span'} fontSize={'16px'}>{`${data?.souvenir === true ? '/ ' : ''}`}</Typeography>
            <Typeography variant={'span'} fontSize={'16px'} color={'orange'}>{`${
              data?.statTrak === true ? 'ST ' : ''
            }`}</Typeography>
            {data?.statTrak === true
              ? `/ ${data?.exterior.replace(/([-])/g, ' ').replace(/([a-z," "])/g, '')} / ${data?.float
                  .toString()
                  .substring(0, 4)}`
              : `${data?.exterior.replace(/([-])/g, ' ').replace(/([a-z," "])/g, '')} / ${data?.float
                  .toString()
                  .substring(0, 4)}`}
          </Typeography>
          <Typeography color={'white'} fontSize={'16px'}>
            {currency.currency === 'usd' ? `$ ${data?.price.toFixed(2)}` : `₴ ${(data?.price * 36.7).toFixed(2)}`}
          </Typeography>
        </div>
        <Button
          style={`${styles.btn} ${index !== -1 && styles['btn-cart']}`}
          onClick={pageTrage ? () => handleChange(data) : page ? () => handleTrade(data) : () => addToCart()}
          disabled={index !== -1 && true}
          text={page ? status ? t('remove_sale') : t('sale') : <FaShoppingCart />}
        ></Button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <Modal
            handleClick={(e) => handleClick(e)}
            children={
              <ItemModal
                data={data}
                addToCart={addToCart}
                // сделал строгое приведение типов
                page={Boolean(page)}
                handleTrade={handleTrade}
                status={status}
              />
            }
            guns={true}
          />
        )}
      </AnimatePresence>
    </>
  )
}
