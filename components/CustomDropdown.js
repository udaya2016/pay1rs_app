import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

const CustomDropdown = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const placeholder = {
    label: 'Select an item...',
    value: null,
  };

  const items = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' },
  ];

  return (
    <RNPickerSelect
      placeholder={placeholder}
      items={items}
      onValueChange={(value) => setSelectedValue(value)}
      style={{
        inputAndroid: {
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 8,
          color: 'black',
          paddingRight: 30,
        },
        inputIOS: {
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 12,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 8,
          color: 'black',
          paddingRight: 30,
        },
      }}
      value={selectedValue}
    />
  );
};

export default CustomDropdown;
