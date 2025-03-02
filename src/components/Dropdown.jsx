import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome';

const Dropdown = ({ label, options, selectedValue, onValueChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOptionPress = (value) => {
    onValueChange(value);
    setIsVisible(false);
  };

  return (
    <View>
      <View style={styles.inputBox}>
        <TouchableOpacity style={{width:290}} onPress={() => setIsVisible(true)}>
         <Text style={{fontSize:16}}>
            {selectedValue ? <>{selectedValue}</> : <Text style={{color:"gray"}}>{label}</Text>}
         </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Icon name="sort-desc" style={{paddingRight:10}}></Icon>
        </TouchableOpacity>
      </View>
      <Modal visible={isVisible} transparent={true} animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsVisible(false)}>
          
          <View style={styles.modalContent}>
          <Text style={{paddingHorizontal:10,marginBottom:10}}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleOptionPress(item.value)} style={styles.option}>
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    color: "#000",
    paddingTop: 10,
    width: 320,
    height:45,
    marginBottom: 10,
    paddingLeft: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding:10,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  option: {
    padding: 10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#ccc',
    margin:5,
  },
});

export default Dropdown;