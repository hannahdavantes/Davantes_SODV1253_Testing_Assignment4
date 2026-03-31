import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  padding: 2rem;
  z-index: 9999;

  .modal {
    width: min(100rem, 100%);
    max-height: 90vh;
    overflow: auto;
    background: var(--primary-color);
    color: var(--off-white);
    border-radius: 1rem;
    padding: 2rem;
    border: 1px solid var(--gray-8);
  }

  .top-row {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1.2rem;
  }

  .btn {
    height: 4.4rem;
    padding: 0 1.6rem;
    font-size: 1.4rem;
    font-family: var(--font-body);
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 0.6rem;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.2s ease,
      transform 0.1s ease,
      box-shadow 0.1s ease;
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

  .content {
    display: grid;
    gap: 1.6rem;
  }

  .main {
    display: grid;
    grid-template-columns: 28rem 1fr;
    gap: 2rem;
    align-items: start;
  }

  .poster {
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid var(--gray-8);
    background: var(--primary-color-light);
  }

  .poster img {
    display: block;
    width: 100%;
    height: auto;
  }

  .poster-fallback {
    height: 42rem;
    display: grid;
    place-items: center;
    color: var(--gray-6);
    font-size: 1.6rem;
  }

  .details {
    display: grid;
    gap: 1.2rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
  }

  .title {
    font-family: var(--font-heading);
    font-size: 2.6rem;
  }

  .year {
    color: var(--gray-5);
    font-size: 1.8rem;
  }

  .rating {
    font-size: 1.8rem;
    color: var(--tertiary-color);
  }

  .overview {
    font-size: 1.6rem;
  }

  .info {
    display: grid;
    gap: 0.6rem;
    font-size: 1.5rem;
    color: var(--low-opacity-white);
  }

  .info span {
    color: var(--off-white);
    font-weight: 700;
    margin-right: 0.6rem;
  }

  .section-title {
    margin-top: 0.5rem;
    font-family: var(--font-heading);
    font-size: 2.1rem;
  }

  .cast-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 1rem;
  }

  .cast-card {
    background: var(--primary-color-light);
    border: 1px solid var(--gray-8);
    border-radius: 0.8rem;
    overflow: hidden;
    display: grid;
  }

  .cast-photo {
    aspect-ratio: 2 / 3;
    background: var(--primary-color);
  }

  .cast-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .cast-fallback {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    color: var(--gray-6);
    font-size: 1.2rem;
  }

  .cast-info {
    padding: 0.6rem 0.7rem;
    display: grid;
    gap: 0.2rem;
  }

  .cast-name {
    font-size: 1.3rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cast-role {
    font-size: 1.2rem;
    color: var(--low-opacity-white);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .msg {
    font-size: 1.6rem;
    color: var(--gray-5);
  }

  @media (max-width: 900px) {
    .main {
      grid-template-columns: 1fr;
    }

    .poster-fallback {
      height: 34rem;
    }

    .cast-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (max-width: 500px) {
    .cast-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default Wrapper;
