import styled from '@emotion/styled';

// interfaces
import { IPropsDialog } from '@/dtos/dialog';

export const Container = styled.div<IPropsDialog>`
  transition: 0.3s;
  visibility: ${(props) => (props.showDialog ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.showDialog ? '1' : '0')};

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.4);
`;

export const DialogContent = styled.div`
  width: min(100% - 6rem, 29rem);
  margin-inline: auto;
  background: var(--white);

  position: initial;
  padding: 0rem 2rem;
  border-radius: 0.5rem;
`;

export const Form = styled.form`
  margin: 2rem 0;

  p {
    margin: 0;
    padding: 0;
  }
  .div__buttons {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    justify-content: flex-end;
    margin-top: 2rem;
  }
`;
