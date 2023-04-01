import styled from '@emotion/styled';

export const Main = styled.div`
  background-color: var(--primary-color-dark);
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 3rem;
`;

export const Container = styled.div`
  width: min(calc(100%-32rem), 32rem);

  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.5rem;

    color: var(--white);
    margin-bottom: 1rem;
  }

  .div__register {
    font-size: 1rem;
    color: var(--white);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    line-height: 1.125rem;
    margin: 1rem auto;
    text-align: center;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
    border: 0;
    outline: none;
    padding: 1.125rem 2.875rem;

    font-weight: 300;
    font-size: 1.5rem;
    line-height: 1.75rem;

    color: var(--gray);
    /* width: 100%; */
  }
  button {
    width: min(100%, 19.125rem);
    height: 4rem;
    background: var(--tertiary-color-dark);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
    border: 0;
    margin: auto;

    font-weight: 400;
    font-size: 1.5rem;
    color: var(--white);
  }

  .div__divider {
    width: min(100%, 29.5rem);
    margin: 1rem auto;
    display: grid;
    grid-template-columns: 312fr 64fr 64fr;
    gap: 1rem;

    &__fragment {
      height: 0.25rem;
      background-color: var(--primary-color);
    }
  }
`;

export const Footer = styled.footer`
  text-align: center;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.125rem;

  color: var(--white);
`;
