import styled from 'styled-components';
import PropTypes from 'prop-types';
import Appear from './Appear';

const Wrapper = styled.div<{ $align?: string; }>`
h1{
  font-size: 600%;
  color:white;
  @media screen and (max-width:1000px){
    font-size: 480%;
  }
  @media screen and (max-width:700px){
    font-size: 300%;
  }

  animation: blurAnimation .2s linear infinite;
  font-weight: 600;
  letter-spacing: -.04em;
  text-align: ${props => (props.$align) ? props.$align : 'center'};
  line-height:1;
  margin:0 0 0px 0;
}
`;

const Heading = (props) => {
  return (
    <Wrapper className="heading " $align={props.align}>
      <h1>
        <Appear glitchMaxOffset={10}>
          {props.children}
        </Appear>
      </h1>
    </Wrapper>
  );
};

Heading.propTypes = {
  align:PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default Heading
