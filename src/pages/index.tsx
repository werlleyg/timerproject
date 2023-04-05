import Head from 'next/head';
import Link from 'next/link';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

// styles
import { Main, Container, Form, Footer } from './styles';
import { API } from './api/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface ILoginData {
  email?: string;
  password?: string;
}

export default function Home() {
  const router = useRouter();
  const [loginData, setLoginData] = useState<ILoginData>();

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLoginData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('[SUBMIT]=> ', loginData);
      API.post('/session', loginData)
        .then((response) => {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('user', JSON.stringify(response.data.user));

          router.push('/timer');
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log('[ERROR]=> ', error.response.data);
        });
    },
    [loginData, router],
  );

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      router.push('/timer');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Timer - UX Software</title>
        <meta
          name='description'
          content='Seja o senhor do seu próprio tempo!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Main>
        <Container>
          <h1 onClick={() => console.log('[loginData]=> ', loginData)}>
            Timer
          </h1>
          <p>Seja o senhor do seu próprio tempo</p>
          <Form onSubmit={handleSubmit}>
            <input
              type='email'
              name='email'
              placeholder='E-mail'
              onChange={handleInputChange}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Senha'
              onChange={handleInputChange}
              required
            />
            <div className='div__divider'>
              <div className='div__divider__fragment'></div>
              <div className='div__divider__fragment'></div>
              <div className='div__divider__fragment'></div>
            </div>
            <button type='submit'>Entrar</button>
          </Form>
          <div className='div__register'>
            <b>É seu primeiro acesso?</b>
            <Link href={'/cadastro'}>Criar uma conta</Link>
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
