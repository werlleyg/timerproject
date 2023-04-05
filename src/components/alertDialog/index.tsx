import { FormEvent, ReactNode, useCallback, useEffect } from 'react';

import { Container, DialogContent, Form } from './styles';

// interfaces
import { IActivity } from '@/dtos/timer';
import { IDialog } from '@/dtos/dialog';

export function AlertDialog({
  showDialog,
  activity,
  pressCancel,
  pressAccept,
}: IDialog) {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      pressAccept(activity as IActivity);
    },
    [activity, pressAccept],
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
        <h2>Confirmação</h2>
        <Form onSubmit={handleSubmit}>
          <p>
            Deseja realmente deletar a atividade <b>{activity?.name}</b>
          </p>
          <div className='div__buttons'>
            <button
              type='button'
              className='btn__custom btn__custom--secondary-out'
              onClick={pressCancel}
            >
              Cancelar
            </button>
            <button className='btn__custom btn__custom--secondary'>
              Deletar
            </button>
          </div>
        </Form>
      </DialogContent>
    </Container>
  );
}
