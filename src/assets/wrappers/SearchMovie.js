import styled from "styled-components";

const Wrapper = styled.section`
  margin-bottom: 2rem;

  .search-form {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  input,
  select,
  .btn {
    height: 4.4rem;
    border-radius: 0.6rem;
  }

  input,
  select {
    padding: 0 1rem;
    font-size: 1.6rem;
    border: 1px solid var(--gray-4);
    background-color: var(--off-white);
    color: var(--black);
    outline: none;
    font-family: var(--font-body);
    box-sizing: border-box;
  }

  input {
    flex: 1;
    min-width: 0;
    display: block;
  }

  select {
    min-width: 18rem;
    cursor: pointer;
  }

  input:focus,
  select:focus {
    border-color: var(--tertiary-color);
  }

  .btn {
    padding: 0 1.6rem;
    font-size: 1.4rem;
    font-family: var(--font-body);
    font-weight: 600;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.2s ease,
      transform 0.1s ease,
      box-shadow 0.1s ease;
    white-space: nowrap;
  }

  .btn-primary {
    background-color: var(--tertiary-color);
    color: var(--primary-color-dark);
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--tertiary-color-light);
  }

  .btn-secondary {
    background-color: var(--secondary-color);
    color: var(--white);
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: var(--secondary-color-light);
  }

  .btn:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error {
    margin-top: 0.8rem;
    font-size: 1.4rem;
    color: var(--secondary-color-light);
  }

  @media (max-width: 768px) {
    .search-form {
      flex-direction: column;
      align-items: stretch;
    }

    input,
    select,
    .btn {
      width: 100%;
    }

    select {
      min-width: unset;
    }

    .search-form input {
      height: 5.2rem;
      padding: 0 1.2rem;
      font-size: 1.6rem;
      box-sizing: border-box;
      display: block;
    }
  }

  @media (max-width: 480px) {
    select,
    .btn {
      height: 4rem;
    }

    select {
      font-size: 1.4rem;
    }

    .btn {
      font-size: 1.3rem;
    }
  }
`;

export default Wrapper;
