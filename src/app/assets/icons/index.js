import React from 'react';
import { StyleSheet } from 'react-native';
import Home from './Home'; 

const icons = {
  home: Home, 
};

const Icon = ({ name, ...props }) => {
  const IconComponent = icons[name];
  if (!IconComponent) return null; 

  return (
    <IconComponent
      height={props.size || 24}
      width={props.size || 24}
      strokeWidth={props.strokeWidth || 1.9}
      color={theme.colors.button} 
      {...props}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({});
