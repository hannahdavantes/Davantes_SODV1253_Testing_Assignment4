import styled from "styled-components";

const Wrapper = styled.section`
  padding: 2.4rem 3.2rem;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  gap: 2.4rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }

  .title-main {
    font-size: 4.8rem;
    color: var(--secondary-color);
    text-align: center;
    font-family: var(--font-heading);
    letter-spacing: 1.4rem;
    text-transform: uppercase;
  }
`;

export default Wrapper;
