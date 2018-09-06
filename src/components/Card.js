import React from 'react';
import PropTypes from 'prop-types';
import BackImg from '../images/back.png';

class FlippableCard extends React.Component {
  handleClick = (e) => {
    this.props.onClick(e, this.props.index);
  }

  render() {
    const { rank, suit, flipped } = this.props.card;
    const className = flipped ? 'card flipped' : 'card';
    return (
      <div className='flip'>
        <div className={className}>
          <img
            className='back'
            onClick={this.handleClick}
            src={BackImg}
            alt='Back of card.'
          />
          <img
            className='face back'
            src={require(`../images/faces/${rank}_of_${suit}.png`)}
            alt={`${rank} of ${suit}.`}
          />
        </div>
      </div>
    );
  }
}

FlippableCard.propTypes = {
  card: PropTypes.object.isRequired
};

export default FlippableCard;