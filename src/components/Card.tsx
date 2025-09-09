import styled from 'styled-components';
import PropTypes from 'prop-types';
import Heading from './Heading';

const Wrapper = styled.div<{ $rotx?: number; $roty?: number; $bgimg?: string; $padright?: number; }>`
  perspective-origin: 150% 150%;
  transform-style: preserve-3d;
  perspective:1000px;

  .wrap{
    transform:rotateX(${props => props.$rotx}deg) rotateY(${props => props.$roty}deg);
    .cardblock{
      background:${props => (props.$bgimg) ? props.$bgimg : 'white'};
      padding:20px ${props => (props.$padright) ? props.$padright : '100px'} 70px 35px;
    }
  }

`;

const Card = (props) => {
  return (
    <Wrapper $rotx={props.rotx} $roty={props.roty} $bgimg={props.bgimg} $padright={props.padright}>
      <div className='wrap'>
        <Heading align='left'>{props.title}</Heading>
        <div className='cardblock'>{props.children}</div>
      </div>
    </Wrapper>
  );
};

Card.propTypes = {
  title:PropTypes.string,
  rotx:PropTypes.number,
  roty:PropTypes.number,
  bgimg:PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default Card
