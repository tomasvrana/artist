import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.span`
font-size:70%;
text-transform:uppercase;
letter-spacing:.05em;
`;

const Label = (props) => {
  const { t } = useTranslation();
  
  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  );
};

Label.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default Label
