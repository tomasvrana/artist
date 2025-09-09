import styled from 'styled-components';
import PropTypes from 'prop-types';
import Heading from './Heading';

const Wrapper = styled.div`
  perspective-origin: 150% 150%;
  transform-style: preserve-3d;
  perspective:1000px;

  .wrap{
    transform:rotateX(1deg) rotateY(3deg);
    .cardblock{
      background:white;
      padding:20px 100px 70px 35px;
    }
  }

`;

const Card = (props) => {
  return (
    <Wrapper>
      <div className='wrap'>
        <Heading>{props.title}</Heading>
        <div className='cardblock'>{props.children}</div>
      </div>
    </Wrapper>
  );
};

Card.propTypes = {
  title:PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default Card
