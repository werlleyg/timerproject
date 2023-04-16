import Head from 'next/head';
import { ReactNode, useCallback, useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import {
  Header,
  Main,
  Container,
  TimerContent,
  SubHeader,
  Deck,
  Card,
} from './styles';

// icons
import logoutIcon from '../../../public/assets/logout-icon.svg';
import playIcon from '../../../public/assets/play-icon.svg';
import pauseIcon from '../../../public/assets/pause-icon.svg';
import trashIcon from '../../../public/assets/trash-icon.svg';
import successIcon from '../../../public/assets/success-icon.svg';
import Router, { useRouter } from 'next/router';
import { NewActivityDialog } from '@/components/newActivityDialog';
import { AlertDialog } from '@/components/alertDialog';

// interfaces
import { IActivity } from '@/dtos/timer';
import { IUser } from '@/dtos/user';
import { getActivityList } from '@/services/timer.service';

export default function Timer() {
  const router = useRouter();
  const [user, setUser] = useState<IUser>();
  const [showNewActivityDialog, setShowNewActivityDialog] =
    useState<boolean>(false);
  const [showDeleteActivityDialog, setShowDeleteActivityDialog] =
    useState<boolean>(false);

  const [activitiesList, setActivitiesList] = useState<IActivity[]>([
    // EXAMPLE
    // {
    //   id: 1,
    //   name: 'Jogar RE4',
    //   time: '00:05',
    //   status: 'pending',
    // },
  ]);

  const [selectedActivity, setSelectedActivity] = useState<IActivity>();

  const [counterStart, setCounterStart] = useState<boolean>(false);

  const counter = useRef<ReturnType<typeof setInterval> | undefined>();

  const startTimer = useCallback(() => {
    if (!selectedActivity?.time) return '--:--';

    setCounterStart(true);

    const [strMin, strSec] = selectedActivity.time.split(':');

    let auxMinutes = Number(strMin);
    let auxSeconds = Number(strSec);
    let minutes: string, seconds: string;

    counter.current = setInterval(() => {
      if (auxSeconds > 0) {
        auxSeconds--;
      } else {
        auxMinutes--;
        auxSeconds = 59;
      }

      minutes = ('' + auxMinutes).padStart(2, '0');
      seconds = ('' + auxSeconds).padStart(2, '0');

      setSelectedActivity({
        ...selectedActivity,
        time: `${minutes}:${seconds}`,
      });

      if (minutes === '00' && seconds === '00') {
        clearInterval(counter.current);
        setSelectedActivity({
          ...selectedActivity,
          status: 'completed',
          time: '00:00',
        });

        setActivitiesList((prev) =>
          prev.map((activityPrev) => {
            if (activityPrev.id === selectedActivity.id)
              activityPrev.status = 'completed';
            return activityPrev;
          }),
        );

        return setCounterStart(false);
      }

      console.log('[auxSeconds]', minutes, ' - ', seconds);
    }, 1000);
  }, [selectedActivity]);

  const stopTimer = useCallback(() => {
    clearInterval(counter.current);
    setCounterStart(false);
  }, [counter]);

  const handleChangeActivity = useCallback(
    (activity: IActivity) => {
      let arrayActivities = activitiesList;
      let activityIdx = activitiesList.indexOf(activity);

      arrayActivities = arrayActivities.map((auxActivity) => {
        if (auxActivity.status === 'active') auxActivity.status = 'pending';
        return auxActivity;
      });

      arrayActivities[activityIdx].status = 'active';

      setActivitiesList(arrayActivities);
      setSelectedActivity(arrayActivities[activityIdx]);
    },
    [activitiesList],
  );

  const handleDeleteActiviy = useCallback(
    (activity: IActivity) => {
      let arrayActivities = activitiesList;
      let activityIdx = activitiesList.indexOf(activity);
      activitiesList.splice(activityIdx, 1);

      setActivitiesList([...arrayActivities]);
      handleDeleteActivityCancell();
    },
    [activitiesList, selectedActivity],
  );

  const handleShowNewActivityDialog = useCallback(() => {
    setShowNewActivityDialog((prev) => !prev);
  }, []);

  const handleShowDeleteActivityDialog = useCallback((activity: IActivity) => {
    setShowDeleteActivityDialog((prev) => !prev);
    setSelectedActivity(activity);
  }, []);

  const handleDeleteActivityCancell = useCallback(() => {
    setShowDeleteActivityDialog((prev) => !prev);
    setSelectedActivity(undefined);
  }, []);

  const handleAddNewActivity = useCallback(
    (newActivity: any) => {
      const auxNewActivity: IActivity = {
        ...newActivity,
        id: activitiesList.length + 1,
        status: 'pending',
      };
      console.log('[new Activity]=> ', auxNewActivity);
      setActivitiesList([...activitiesList, auxNewActivity]);
    },
    [activitiesList],
  );

  const getActivities = useCallback(
    () => getActivityList(setActivitiesList),
    [],
  );

  // user
  const setLogout = useCallback(() => {
    sessionStorage.clear();
    Router.push('/');
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const auxUser = JSON.parse(sessionStorage?.getItem('user') + '');
      setUser(auxUser as IUser);
      getActivities();
    } else {
      Router.push('/');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>
          {counterStart ? `(${selectedActivity?.time})` : ''} Timer - UX
          Software
        </title>
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
              Seja bem vindo <b>{user?.name}</b>
            </div>
            <div className='div__data-user--email'>{user?.email}</div>
          </div>
          <button type='button' onClick={setLogout}>
            <Image
              src={logoutIcon}
              alt='logout'
              style={{ width: '1.5rem', height: '1.5rem' }}
            />
          </button>
        </Header>
        <Container>
          <h1>Timer</h1>
          <TimerContent status={selectedActivity?.status}>
            <h3>
              <b>#{selectedActivity?.id || '-'}</b> {selectedActivity?.name}
            </h3>
            <div className='div__timer--counter' id='timer-number'>
              {selectedActivity?.time || '--:--'}
            </div>
            {selectedActivity?.status === 'completed' ? (
              <div className={'div__timer--options'}>
                <Image src={successIcon} alt='sucesso' />
              </div>
            ) : (
              <div className={'div__timer--options'}>
                <button
                  onClick={startTimer}
                  disabled={counterStart || !selectedActivity}
                >
                  {' '}
                  <Image src={playIcon} alt='play' />
                </button>
                <button
                  onClick={stopTimer}
                  disabled={!counterStart || !selectedActivity}
                >
                  <Image src={pauseIcon} alt='pause' />
                </button>
              </div>
            )}
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
            <button
              className='btn__custom btn__custom--primary-out'
              onClick={handleShowNewActivityDialog}
            >
              {' '}
              + Atividade
            </button>
          </SubHeader>
          <Deck>
            {activitiesList?.map((activity) => (
              <Card key={activity.id} status={activity.status}>
                <div className='div__card--title' title={activity.name}>
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
                      <button
                        onClick={() => handleShowDeleteActivityDialog(activity)}
                        disabled={counterStart}
                      >
                        {' '}
                        <Image
                          src={trashIcon}
                          alt='delete'
                          style={{ width: '2rem', height: '2rem' }}
                        />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleChangeActivity(activity)}
                        disabled={counterStart}
                      >
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
            {activitiesList.length === 0 && (
              <div className='div__empty-deck'>
                Nenhuma atividade cadastrada
              </div>
            )}
          </Deck>
        </Container>
      </Main>
      <NewActivityDialog
        showDialog={showNewActivityDialog}
        pressCancel={handleShowNewActivityDialog}
        pressAccept={handleAddNewActivity}
      />
      <AlertDialog
        showDialog={showDeleteActivityDialog}
        activity={selectedActivity}
        pressCancel={handleDeleteActivityCancell}
        pressAccept={handleDeleteActiviy}
      />
    </>
  );
}
