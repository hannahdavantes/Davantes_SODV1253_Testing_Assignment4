import styled from "styled-components";

const Wrapper = styled.section`
  padding: 2.4rem 3.2rem;
  display: flex;
  flex-direction: column;
  width: min(120rem, 100%);
  margin: 0 auto;
  gap: 2.4rem;

  .title-main {
    font-size: 4.8rem;
    color: var(--secondary-color);
    text-align: center;
    font-family: var(--font-heading);
    letter-spacing: 1.4rem;
    text-transform: uppercase;
    line-height: 1.2;
    word-break: break-word;
  }

  @media (max-width: 992px) {
    width: 100%;
    padding: 2rem;
    gap: 2rem;

    .title-main {
      font-size: 3.8rem;
      letter-spacing: 0.8rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1.6rem;

    .title-main {
      font-size: 3rem;
      letter-spacing: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1.2rem;
    gap: 1.6rem;

    .title-main {
      font-size: 2.4rem;
      letter-spacing: 0.25rem;
    }
  }
`;

export default Wrapper;
