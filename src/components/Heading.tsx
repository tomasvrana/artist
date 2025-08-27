import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
h1{
  font-size: 600%;
  font-weight: 100;
  letter-spacing: -.04em;
  text-align: center;
  line-height:2;
  margin:0;
}
`;

const Heading = (props) => {
  return (
    <Wrapper className="heading ">
      <h1>{props.children}</h1>
    </Wrapper>
  );
};

Heading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default Heading
