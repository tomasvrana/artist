import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div<{ $left?: boolean; }>`
height:80px;
p {
  position: absolute;
  text-transform:uppercase;
  background:#0f0;
  display:inline-block;
  font-size:.85rem;
  line-height:1.5;
  padding:5px 15px;
  letter-spacing:.2em;
  &::after{
    display:block;
    content:"";
    width:0;
    height:0;
    position: absolute;
    z-index:999;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #0f0;
    rotate:-45deg;
    right:0;
    margin-top:5px;
  }
  &.available::after{
  }
  &.sold{
    background:red;
    color:white;
    font-weight:600;
    &::after{
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid red;
    }
  }
  &.public{
    background:cyan;
    color:#333;
    font-weight:600;
    &::after{
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid cyan;
    }
  }
  &.removed{
    background:white;
    color:#333;
    font-weight:600;
    &::after{
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid white;
    }
  }
  &.over{
    background:#333;
    color:white;
    font-weight:600;
    &::after{
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #333;
    }
  }
}
`;

const Status = (props) => {
  const { t } = useTranslation();
  
  return (
    <Wrapper $left={props.left}>
      {(props.available == 0) && 
        <p className="sold">{t('portfolio.sold')}</p>
      }
      {(props.available == 1) && 
        <p className="available">{t('portfolio.available')}</p>
      }
      {(props.available == 2) && 
        <p className="public">{t('portfolio.public')}</p>
      }
      {(props.available == 3) && 
        <p className="removed">{t('portfolio.removed')}</p>
      }
      {(props.available == 4) && 
        <p className="over">{t('portfolio.over')}</p>
      }
    </Wrapper>
  );
};

Status.propTypes = {
  available: PropTypes.number,
  left: PropTypes.boolean
}

export default Status
