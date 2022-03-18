import React, { useState } from 'react';
import { 
  Alert, StyleSheet,ImageBackground,
   Text, Button, View, TextInput, ScrollView, TouchableOpacity, Keyboard } from 'react-native';

import CustomButton from './components/ButtonComponent';

import { todoItems } from "./constants/dummyToDoList";
const image = { uri: "https://i.pinimg.com/236x/6b/1e/14/6b1e14112f9f7a42b2030f7da534d4b7.jpg" };


export default function App() {
  const [getText, setText] = useState('');
  const [getList, setList] = useState(todoItems);
  const [editingItem, setEditingItem] = useState(0);

  const addItem = () => {
    console.log(getText);
    setList([
      ...getList,
      { key: Math.random().toString(), data: getText }
    ]);
    setText('');
    Keyboard.dismiss();
  }

  const removeItem = (itemKey) => {
    Alert.alert(
      `Delete "${getList.find(item => item.key == itemKey).data}" ?`,
      "",
      [
        {
          text: "No",
          onPress: () => { }
        },
        {
          text: "Yes",
          onPress: () => setList(list => getList.filter(item => item.key != itemKey))
        }
      ]
    );
  }

  const editItem = (item) => {
    setText(item.data);
    setEditingItem(item.key);
  }

  const updateItem = () => {
    setList(list => getList.map(item =>
      item.key === editingItem ?
        { key: item.key, data: getText } :
        item
    ));
    setText('');
    setEditingItem(0);
  }
  


  const scrollView = (
    <ScrollView style={styles.scrollview}>
      {getList.map((item, index) =>
        <TouchableOpacity
          key={item.key}
          activeOpacity={0.7}
          onPress={() => editItem(item)}
        >
          <View style={styles.scrollviewItem}>
            <Text style={styles.scrollviewText}>{item.data}</Text>
            <TouchableOpacity
              onPress={() => removeItem(item.key)}
            >
              <View style={styles.crosstextcontainer}>
                <Text style={styles.crosstext}>X</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );

  const emptyScrollView = (
    <View style={{ paddingTop: 30 }}>
      <Text style={{ fontStyle: "italic", fontSize: 20, color: 'black' }}>Add to do list</Text>
    </View>
  );

  return (

   
    <View style={styles.container}>
     {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}> */}
      <Text style={styles.title}>To do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Item"
          onChangeText={text => setText(text)}
          value={getText}
        />

        <CustomButton
          text={editingItem === 0 ? "Add new" : "Update List"}
          textSize={16}
          textColor="white"
          onPressEvent={editingItem === 0 ? addItem : updateItem}
          disabled={getText.length <= 0}
        />

        {/* <Button
          title="Add"
          onPress={addItem}
          disabled={getText.length <= 0}
        /> */}

      </View>
      {getList.length <= 0 ? emptyScrollView : scrollView}
      {/* </ImageBackground> */}
    </View>

   
  
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    height:"100%",
    width:'100%'
  },
  crosstextcontainer: {
    backgroundColor: 'grey',
    borderRadius: 5,
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  crosstext: {
    fontSize: 16,
    color: 'white',
    fontWeight: "bold"
  },
  scrollviewText: {
    fontSize: 26,
    color: 'white',

  },
  image: {
    flex: 1,
    justifyContent: "center",
    width:700,
    height:800,
    
  },
  scrollview: {
    paddingTop: 20,
    width: '100%'
  },
  scrollviewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: 'purple',
    alignSelf: "center",
    padding: 5,
    margin: 5,
    width: '70%',
    borderRadius: 5
  },
  title: {
    fontSize: 35,
    color: 'purple',
    fontStyle:'italic',
    fontWeight:'bold',
    marginTop:100,
   

  },
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    paddingTop: 40,
  
  },
  inputContainer: {
    flexDirection: "row",
    width: '70%',
    justifyContent: "space-between",
    alignItems: "center"
  },
  textInput: {
    borderColor: 'black',
    //borderWidth: 2,
    borderBottomWidth: 1,
    width: '80%',
    // borderRadius: 50,
    fontSize: 16,
    padding: 20
  }
});
