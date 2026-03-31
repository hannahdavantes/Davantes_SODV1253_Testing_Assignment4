import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
  padding: 0 3rem;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  .movie-card {
    cursor: pointer;
    transition: transform 0.2s ease;
    border-radius: 1rem;
    overflow: hidden;
    background: var(--primary-color-light);
  }

  .movie-card:hover {
    transform: translateY(-6px);
  }

  img {
    width: 100%;
    height: 32rem;
    object-fit: cover;
  }

  .movie-info {
    padding: 1.2rem;
    text-align: center;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
  }

  p {
    font-size: 1.3rem;
    opacity: 0.8;
  }
`;

export default Wrapper;
