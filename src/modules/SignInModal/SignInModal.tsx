import { useState, FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { changeOverflow } from '../../helpers/helpers'
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth'
import { setSignInState } from '../../redux/slices/signInModal'
import { TfetchAuthparams } from '../../redux/types'
import { useTranslation } from 'react-i18next'
import styles from './SingInModal.module.css'

import { Container } from '../../ui/Container'
import { Input } from '../../ui/Input'
import { Typeography } from '../../ui/Typeography'
import { Button } from '../../ui/Button'

import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface ISignInModal {
  setState: (state: boolean) => void
  setOtherState: Function
}

export const SignInModal: FC<ISignInModal> = ({ setState, setOtherState }) => {
  const isAuth = useAppSelector(selectIsAuth)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [viewPass, setViewPass] = useState('password')
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset
  } = useForm<TfetchAuthparams>({
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<TfetchAuthparams> = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if (!data.payload) {
      return alert('Authorization error')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }

    reset()
    setState(false)
    dispatch(setSignInState(false))
    changeOverflow(true)
  }

  const changeView = () => {
    viewPass === 'password' ? setViewPass('text') : setViewPass('password')
  }

  const changeModal = () => {
    setState(false)
    dispatch(setSignInState(false))
    setOtherState((curr: boolean) => !curr)
  }
  return (
    <>
      <Container styles={styles.container}>
        <Typeography variant={'h3'} color={'white'} m={'0 0 15px 0 '}>
          {t('auth_modals.sign_in_to_account')}
        </Typeography>
        <form action='' onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            <Input type={'submit'} mt={'10px'} value={t('auth_modals.sign_in')} disabled={!isValid} />
            <Input type={'reset'} value={t('auth_modals.reset')} mt={'10px'} />
          </div>
        </form>
        <Typeography color={'white'} fontWeight={600} fontSize={'14px'} m={'10px 0 0 0'}>
          {t('auth_modals.new_user')}{' '}
          <Button style={styles.btn} text={t('auth_modals.create_account')} onClick={changeModal}></Button>{' '}
        </Typeography>
      </Container>
    </>
  )
}
