import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  max-width:1600px;
  margin:0px auto 50px auto;
  @media screen and (max-width:1800px){
    max-width:1200px;
  }
`;

const Content = (props) => {
  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  );
};

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default Content
