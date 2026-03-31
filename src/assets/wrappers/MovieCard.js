import styled from "styled-components";

const Wrapper = styled.article`
  width: 100%;
  max-width: 32rem;
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color-light);
  border: 1px solid rgba(248, 248, 248, 0.15);
  border-radius: 1.2rem;
  overflow: hidden;

  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  }

  .poster {
    width: 100%;
    aspect-ratio: 2 / 3;
    background-color: var(--primary-color-dark);
  }

  .poster img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .no-poster {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    font-family: var(--font-body);
    font-size: 1.4rem;
    color: var(--low-opacity-white);
  }

  .content {
    padding: 1.2rem 1.4rem 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .title {
    font-family: var(--font-heading);
    color: var(--tertiary-color-dark);
    font-size: 2.8rem;
    line-height: 1.2;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    min-height: calc(2.8rem * 1.2 * 2);
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    width: 100%;
    font-family: var(--font-body);
    font-size: 2.4rem;
    color: var(--tertiary-color-light);
  }
  .rating {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .star {
    display: block;
    font-size: 1.1em;
  }
`;

export default Wrapper;
