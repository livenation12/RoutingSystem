import { FormInput } from '@/Components/FormEntities'
import React from 'react'

export default function UserForm() {
          return (
                    <form className='max-w-xl space-y-6 mt-5'>
                              <FormInput name='firstName' labelValue='First Name' />
                              <FormInput name='lastName' labelValue='Last Name' />
                              <FormInput name='email' labelValue='Email' type='email' />
                              <FormInput name='password' labelValue='Password' type='password' />
                              <FormInput name='password_confirmation' labelValue='Confirm Password' type='password' />
                    </form>
          )
}
