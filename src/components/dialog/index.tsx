import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Container, DialogContent, Form } from './styles';

interface IDialog {
  showDialog: boolean;
  pressCancel: () => void;
  pressAccept: (newActivity: INewActivity) => void;
}

interface INewActivity {
  name?: string;
  time?: string;
}

interface IActivity {
  id: number;
  name: string;
  time: string;
  status: 'pending' | 'active' | 'completed';
}

export function Dialog({ showDialog, pressCancel, pressAccept }: IDialog) {
  const timeOptions = ['05:00', '10:00', '15:00', '20:00', '25:00', '30:00'];

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
      setNewActivity(undefined);
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
          <div className="div__inputs">
            <input
              type="text"
              name="name"
              value={newActivity?.name}
              placeholder="Nome da atividade"
              onChange={handleChangeInput}
              required
            />
            <select
              name="time"
              value={newActivity?.time}
              onChange={handleChangeInput}
              required
            >
              <option selected value="">
                Tempo em min
              </option>
              {timeOptions.map((time) => (
                <option value={time} key={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="div__buttons">
            <button
              type="button"
              className="btn__custom btn__custom--primary-out"
              onClick={pressCancel}
            >
              Cancelar
            </button>
            <button className="btn__custom btn__custom--primary">
              + Adicionar
            </button>
          </div>
        </Form>
      </DialogContent>
    </Container>
  );
}
