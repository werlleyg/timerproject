import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Container, DialogContent, Form } from './styles';

// interfaces
import { INewActivity, INewActivityDialog } from '@/dtos/dialog';

export function NewActivityDialog({
  showDialog,
  pressCancel,
  pressAccept,
}: INewActivityDialog) {
  const timeOptions = [
    '00:05',
    '05:00',
    '10:00',
    '15:00',
    '20:00',
    '25:00',
    '30:00',
  ];

  const [newActivity, setNewActivity] = useState<INewActivity>();

  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      setNewActivity((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
      console.log(`[${event.target.name}]: ${event.target.value}`);
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      pressAccept(newActivity as INewActivity);
      setNewActivity({
        name: '',
        time: '',
      });
      pressCancel();
    },
    [newActivity, pressAccept, pressCancel],
  );

  useEffect(() => {
    if (showDialog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showDialog]);

  return (
    <Container showDialog={showDialog}>
      <DialogContent>
        <h2>Adicionar atividade</h2>
        <Form onSubmit={handleSubmit}>
          <div className='div__inputs'>
            <input
              type='text'
              name='name'
              value={newActivity?.name}
              placeholder='Nome da atividade'
              onChange={handleChangeInput}
              required
            />
            <select
              name='time'
              value={newActivity?.time}
              onChange={handleChangeInput}
              required
            >
              <option selected value=''>
                Tempo em min
              </option>
              {timeOptions.map((time) => (
                <option value={time} key={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className='div__buttons'>
            <button
              type='button'
              className='btn__custom btn__custom--primary-out'
              onClick={pressCancel}
            >
              Cancelar
            </button>
            <button className='btn__custom btn__custom--primary'>
              + Adicionar
            </button>
          </div>
        </Form>
      </DialogContent>
    </Container>
  );
}
