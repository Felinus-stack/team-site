'use client';

import axios from 'axios';
import { signIn } from "next-auth/react";
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useAuth } from '@/app/context/Auth/AuthContext';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { error } from 'console';
import toast from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title='Welcome to Team Site'
        subtitle='Create an account!'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const handleOAuthSignIn = (provider: string) => {
    setIsLoading(true);
    signIn(provider, {
      callbackUrl: '/admin/addNews'
    }).then((result) => {
      if (result?.ok) {
        login(); // Update AuthContext
        toast.success('Logged in successfully');
        registerModal.onClose();
      } else if (result?.error) {
        toast.error('Login failed');
      }
      setIsLoading(false);
    }).catch(() => {
      toast.error('Login failed');
      setIsLoading(false);
    });
  };

  const footerContent = (
    <div className="
      flex
      flex-col
      gap-4
      mt-3
    ">
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => handleOAuthSignIn('google')}
        disabled={isLoading}
      />
      <Button
        outline
        label='Continue with GitHub'
        icon={AiFillGithub}
        onClick={() => handleOAuthSignIn('github')}
        disabled={isLoading}
      />
      <div className="
        text-neutral-500
        text-center
        mt-4
        font-light
      ">
        <div className="
          justify-center
          flex
          flex-row
          items-center
          gap-2
        ">
          <div>Already have an account?</div>
          <div
            onClick={() => {
              registerModal.onClose();
              loginModal.onOpen();
            }}
            className="
            text-neutral-800
            cursor-pointer
            hover:underline
          ">
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return(
    <div>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
}

export default RegisterModal;