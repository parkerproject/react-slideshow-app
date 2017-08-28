// eslint-disable-next-line
import React from 'react';
import PropTypes from 'prop-types';

export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >&gt;</div>
  );
}

NextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

NextArrow.defaultProps = {
  className: null,
  style: {},
  onClick: null,
};

export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >&lt;</div>
  );
}

PrevArrow.defaultProps = {
  className: null,
  style: {},
  onClick: null,
};

PrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
