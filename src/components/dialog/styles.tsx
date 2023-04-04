import styled from '@emotion/styled';

interface IContainer {
  showDialog: boolean;
}

export const Container = styled.div<IContainer>`
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
  width: min(100% - 6rem, 44rem);
  margin-inline: auto;
  background: var(--white);

  position: initial;
  padding: 2rem;
  border-radius: 0.5rem;
`;

export const Form = styled.form`
  margin: 2rem 0;
  .div__inputs {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    input,
    select {
      height: 64px;
      left: 404px;
      top: 711px;

      background: var(--white);
      border: 1px solid var(--gray);
      box-shadow: var(--shadow);
      border-radius: 2rem;
      padding: 0rem 1.875rem;

      font-weight: 300;
      font-size: 1.5rem;
      line-height: 1.75rem;

      color: var(--gray);
    }
    input {
      flex: 2;
    }
    select {
      flex: 1;
    }
  }

  .div__buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: flex-end;
    margin-top: 2.5rem;
  }
`;
