import { useState, FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { changeOverflow } from '../../helpers/helpers'
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth'
import { TfetchRegisterparams } from '../../redux/types'
import { Button } from '../../ui/Button'
import { useTranslation } from 'react-i18next'
import styles from './SignUpModal.module.css'

import { Container } from '../../ui/Container'
import { Input } from '../../ui/Input'
import { Typeography } from '../../ui/Typeography'

import { FaExclamationTriangle, FaEye, FaEyeSlash } from 'react-icons/fa'

interface ISignUpModal {
  setState: (state: boolean) => void
  setOtherState: Function
}

export const SignUpModal: FC<ISignUpModal> = ({ setState, setOtherState }) => {
  const { t } = useTranslation()
  const [viewPass, setViewPass] = useState('password')
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset
  } = useForm<TfetchRegisterparams>({
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<TfetchRegisterparams> = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert('Failed to register')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }

    reset()
    setState(false)
    changeOverflow(false)
  }

  const changeView = () => {
    viewPass === 'password' ? setViewPass('text') : setViewPass('password')
  }

  const changeModal = () => {
    setState(false)
    setOtherState((curr: boolean) => !curr)
  }
  return (
    <>
      <Container styles={styles.container}>
        <Typeography variant={'h3'} color={'white'} m={'0 0 15px 0 '}>
          {t('auth_modals.sign_up_to_account')}
        </Typeography>
        <Typeography variant={'h4'} color={'orange'} m={'0 0 15px 0 '}>
          <FaExclamationTriangle fill='#e5864e' fontSize={'14px'} />
          Your full name must include at least 3 symbols, email address must be valid and password must include minimum
          5 symbols
        </Typeography>
        <form action='' onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor='fullName' className={styles.label}>
            {t('auth_modals.full_name')}:
            <Input
              id={'fullName'}
              type={'text'}
              placeholder={t('auth_modals.full_name')}
              obj={register('fullName', {
                required: 'Full name is required field',
                minLength: 3
              })}
              mt={'5px'}
            />
          </label>

          <label htmlFor='Email' className={styles.label}>
            {t('auth_modals.email')}:
            <Input
              id={'Email'}
              type={'email'}
              placeholder={t('auth_modals.email')}
              obj={register('email', {
                required: true,
                pattern: /^\S+@\S+$/i
              })}
              mt={'5px'}
            />
          </label>

          <label htmlFor='Password' className={styles.label}>
            {t('auth_modals.password')}:
            <div className={styles.password}>
              <Input
                id={'Password'}
                type={viewPass}
                placeholder={t('auth_modals.password')}
                obj={register('password', {
                  required: true,
                  minLength: 5,
                  maxLength: 12
                })}
                mt={'5px'}
              />
              <span className={styles.icon} onClick={changeView}>
                {viewPass === 'password' ? <FaEyeSlash fontSize={'24px'} /> : <FaEye fontSize={'24px'} />}
              </span>
            </div>
          </label>
          <div className={styles.controls}>
            <Input type={'submit'} mt={'10px'} value={t('auth_modals.sign_up')} disabled={!isValid} />
            <Input type={'reset'} value={t('auth_modals.reset')} mt={'10px'} />
          </div>
        </form>
        <Typeography color={'white'} fontWeight={600} fontSize={'14px'} m={'10px 0 0 0'}>
          {t('auth_modals.already_have_account')}{' '}
          <Button style={styles.btn} text={t('auth_modals.sign_in')} onClick={changeModal}></Button>{' '}
        </Typeography>
      </Container>
    </>
  )
}
