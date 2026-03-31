import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  margin: 2.4rem 0;
  flex-wrap: wrap;

  .btn-page {
    padding: 0.6rem 1.2rem;
    font-size: 1.3rem;
    border-radius: 0.6rem;
    border: 1px solid var(--gray-7);
    cursor: pointer;
    background: var(--primary-color-light);
    color: var(--off-white);
    transition: all 0.2s ease;
  }

  /* Hover */
  .btn-page:hover:not(:disabled) {
    background: var(--secondary-color);
    border-color: var(--secondary-color-light);
  }

  /* Active page */
  .btn-page.active {
    background: var(--tertiary-color);
    border-color: var(--tertiary-color-dark);
    color: var(--primary-color-dark);
    font-weight: 600;
  }

  /* Disabled */
  .btn-page:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Ellipsis */
  .ellipsis {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--gray-5);
  }
`;

export default Wrapper;
