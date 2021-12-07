import { IconButton } from '@chakra-ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import React from 'react';
import { RenderArrowProps } from 'react-elastic-carousel';

const NavArrows: React.FC<RenderArrowProps> = ({ type, onClick, isEdge }) => {
  return (
    <IconButton
      aria-label="carousel nav"
      onClick={onClick}
      disabled={isEdge}
      icon={type === 'PREV' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      alignSelf="center"
      borderRadius="50%"
    />
  );
};

export default NavArrows;
