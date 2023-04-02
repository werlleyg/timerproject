import Head from 'next/head';
import { ReactNode, useState } from 'react';

import {
  Header,
  Main,
  Container,
  TimerContent,
  SubHeader,
  Deck,
  Card,
} from './styles';
import Image from 'next/image';

// icons
import logoutIcon from '../../../public/assets/logout-icon.svg';
import playIcon from '../../../public/assets/play-icon.svg';
import pauseIcon from '../../../public/assets/pause-icon.svg';
import trashIcon from '../../../public/assets/trash-icon.svg';

interface IActivitiesList {
  id: number;
  name: string;
  time: string;
  status: 'pending' | 'active' | 'completed';
}

export default function Timer() {
  const [activitiesList, setActivitiesList] = useState<IActivitiesList[]>([
    {
      id: 1,
      name: 'Jogar RE4',
      time: '30:00',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Preparar projeto do curso',
      time: '90:00',
      status: 'completed',
    },
    {
      id: 3,
      name: 'Ler Stephen King',
      time: '15:00',
      status: 'active',
    },
  ]);

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
        <Header>
          <div className='div__data-user'>
            <div className='div__data-user--welcome'>
              Seja bem vindo <b>Werlley Gonçalves</b>
            </div>
            <div className='div__data-user--email'>werlleyponte@gmail.com</div>
          </div>
          <button type='button'>
            <Image
              src={logoutIcon}
              alt='logout'
              style={{ width: '1.5rem', height: '1.5rem' }}
            />
          </button>
        </Header>
        <Container>
          <h1>Timer</h1>
          <TimerContent>
            <h3>
              <b>#1</b> Jogar Resident Evil 4
            </h3>
            <div className='div__timer--counter'>00:30</div>
            <div className='div__timer--options'>
              <button>
                {' '}
                <Image src={playIcon} alt='play' />
              </button>
              <button>
                <Image src={pauseIcon} alt='pause' />
              </button>
            </div>
          </TimerContent>
          <div className='div__sub-footer'>
            Desenvolvido com ❤️ por{' '}
            <a href='http://uxsoftware.com.br' target='_blank'>
              UX Software
            </a>
          </div>
          <SubHeader>
            <div className='div__title'>
              <h2>Minhas atividades</h2>
              <div className='div__divider'>
                <div className='div__divider__fragment'></div>
                <div className='div__divider__fragment'></div>
                <div className='div__divider__fragment'></div>
              </div>
            </div>
            <button className='btn__custom btn__custom--primary-out'>
              {' '}
              + Atividade
            </button>
          </SubHeader>
          <Deck>
            {activitiesList.map((activity) => (
              <Card key={activity.id} status={activity.status}>
                <div className='div__card--title'>
                  <b>#{activity.id}</b> {activity.name}
                </div>

                {activity.status === 'active' ? (
                  <div className='div__card--active-tag'>Atual</div>
                ) : (
                  <div className='div__card--options'>
                    <div className='div__card--time'>
                      <b>{activity.time}</b>
                    </div>
                    {activity.status === 'completed' ? (
                      <button>
                        {' '}
                        <Image
                          src={trashIcon}
                          alt='delete'
                          style={{ width: '2rem', height: '2rem' }}
                        />
                      </button>
                    ) : (
                      <button>
                        {' '}
                        <Image
                          src={playIcon}
                          alt='play'
                          style={{ width: '2rem', height: '2rem' }}
                        />
                      </button>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </Deck>
        </Container>
      </Main>
    </>
  );
}
