import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

// styles
import { Main, Container, Form, Footer } from './styles';

// interfaces
import { IRegisterData, IUserCreate } from '@/dtos/user';
import { toast } from 'react-toastify';
import { userCreate } from '@/services/user';
import { useRouter } from 'next/router';

export default function Cadastro() {
  const router = useRouter();
  const [registerData, setRegisterData] = useState<IRegisterData>();

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRegisterData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    [],
  );

  const toLoginPage = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (registerData?.password !== registerData?.confirm_password)
        return toast.error('As senhas não correspondem');
      console.log('[SUBMIT]=> ', registerData);

      const payload: IUserCreate = {
        registerData: registerData,
        callBack: toLoginPage,
      };

      userCreate(payload);
    },
    [registerData, toLoginPage],
  );

  return (
    <>
      <Head>
        <title>Cadastro - Timer - UX Software</title>
        <meta
          name='description'
          content='Seja o senhor do seu próprio tempo!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Main>
        <Container>
          <h1>Timer</h1>
          <p>
            <b>Cadastre-se</b> e seja o senhor do seu próprio tempo
          </p>
          <Form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Nome'
              name='name'
              onChange={handleInputChange}
              required
            />
            <input
              type='email'
              placeholder='E-mail'
              name='email'
              onChange={handleInputChange}
              required
            />
            <input
              type='password'
              placeholder='Senha'
              name='password'
              onChange={handleInputChange}
              required
            />
            <input
              type='password'
              placeholder='Confirmar senha'
              name='confirm_password'
              onChange={handleInputChange}
              required
            />
            <div className='div__divider'>
              <div className='div__divider__fragment'></div>
              <div className='div__divider__fragment'></div>
              <div className='div__divider__fragment'></div>
            </div>
            <button type='submit'>Cadastrar</button>
          </Form>
          <div className='div__register'>
            <b>Já tem uma conta?</b>
            <Link href={'/'}>Voltar para o login</Link>
          </div>
        </Container>
        <Footer>
          Desenvolvido com ❤️ por{' '}
          <a href='http://uxsoftware.com.br' target='_blank'>
            UX Software
          </a>
        </Footer>
      </Main>
    </>
  );
}
