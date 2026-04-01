import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  margin: 2.4rem 0;
  flex-wrap: wrap;
  padding: 0 1rem;

  .btn-page {
    padding: 0.6rem 1.2rem;
    min-width: 4rem;
    font-size: 1.3rem;
    border-radius: 0.6rem;
    border: 1px solid var(--gray-7);
    cursor: pointer;
    background: var(--primary-color-light);
    color: var(--off-white);
    transition: all 0.2s ease;
  }

  .btn-page:hover:not(:disabled) {
    background: var(--secondary-color);
    border-color: var(--secondary-color-light);
  }

  .btn-page.active {
    background: var(--tertiary-color);
    border-color: var(--tertiary-color-dark);
    color: var(--primary-color-dark);
    font-weight: 600;
  }

  .btn-page:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .ellipsis {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--gray-5);
  }

  @media (max-width: 480px) {
    gap: 0.5rem;

    .btn-page {
      padding: 0.5rem 0.9rem;
      min-width: 3.4rem;
      font-size: 1.2rem;
    }

    .ellipsis {
      font-size: 1.2rem;
    }
  }
`;

export default Wrapper;
