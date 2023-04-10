import styled from '@emotion/styled';

// interfaces
import { IPropsStatus } from '@/dtos/timer';

export const Main = styled.div`
  background-color: var(--primary-color-dark);
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  width: min(calc(100% - 2rem), 70.75rem);
  margin-inline: auto;
  margin-top: 2.5rem;
  margin-bottom: 2rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  .div__data-user {
    text-align: right;
    color: var(--white);
    display: flex;
    flex-direction: column;
    gap: 0.125rem;

    &--welcome {
      font-size: 0.875rem;
      line-height: 1rem;
    }
    &--email {
      font-size: 0.75rem;
      line-height: 0.875rem;
    }
  }

  button {
    background: transparent;
    border: none;
  }
`;

export const Container = styled.section`
  width: min(calc(100% - 2rem), 48em);
  margin-inline: auto;
  padding-bottom: 10rem;

  .div__sub-footer {
    text-align: right;
    padding: 0.5rem;

    color: var(--white);
    font-size: 0.75rem;
  }
`;

export const TimerContent = styled.div<IPropsStatus>`
  margin-top: 2rem;
  padding: 2rem;

  transition: 0.3s;

  background: ${(props) =>
    props.status === 'completed'
      ? 'var(--tertiary-color-dark)'
      : 'var(--primary-color-darkness)'};
  box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;

  h3 {
    font-weight: 400;
    font-size: 2rem;
    line-height: 2.375rem;
    color: var(--white);
  }
  .div__timer {
    &--counter {
      font-weight: 700;
      font-size: 12rem;
      line-height: 14rem;
      text-align: center;
      color: var(--white);
    }
    &--options {
      /* border: 1px dotted red; */
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4rem;
      margin: 1rem 0rem;

      button {
        background: transparent;
        border: none;
        border-radius: 50%;
        overflow: hidden;

        :disabled {
          opacity: 0.2;
        }
      }
    }
  }
`;

export const SubHeader = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;

  .div__title {
    padding-bottom: 1rem;
    width: min(100%, 29.5rem);

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
  }
`;

export const Deck = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .div__empty-deck {
    height: 3.875rem;
    background: var(--prymary-color-darkness-50);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    font-weight: 300;
    font-size: 1.25rem;
    line-height: 1.5rem;
    color: var(--primary-color);
    padding: 0rem 1rem;
  }
`;

export const Card = styled.div<IPropsStatus>`
  height: 3.875rem;
  background: ${(props) =>
    props.status === 'pending'
      ? 'var(--primary-color-darkness)'
      : props.status === 'active'
      ? 'var(--primary-color)'
      : 'var(--tertiary-color-dark)'};
  box-shadow: var(--shadow);
  transition: 0.3s;
  border-radius: 0.5rem;
  padding: 0rem 1rem;
  gap: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-inline: 0.25rem solid transparent;

  .div__card--title,
  .div__card--options {
    display: flex;
    gap: 1rem;

    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.5rem;
    color: var(--white);
  }
  .div__card--title {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 1; /** número de linhas que você quer exibir */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    b {
      margin-right: 1rem;
    }
  }
  .div__card--options {
    align-items: center;
    justify-content: center;
    button {
      background: transparent;
      border: none;
      weight: 2rem;
      height: 2rem;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .div__card--active-tag {
    width: 4.75rem;
    height: 1.625rem;
    border-radius: 2rem;
    background: var(--primary-color-darkness);
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 300;
    font-size: 0.65;
    line-height: 0.875;
    color: var(--white);
  }
  :hover {
    border-inline: 0.25rem solid var(--primary-color);
    transition: 0.3s;
  }
`;

export default Main;
