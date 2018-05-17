import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";
import PropTypes from "prop-types";


const { height, width } = Dimensions.get("window")

export default class App extends React.Component {

  state = {
    newToDo: "",
    loadedTodo: false,
    toDos: {}
  };

  componentDidMount = () => {
    this._loadedTodos();
  }

  render() {
    const { newToDo, loadedTodo, toDos } = this.state;
    console.log(toDos)
    if (!loadedTodo){
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>To Do List</Text>
        <View style={styles.card}>
          <TextInput 
          style={styles.input} 
          placeholder={"New To Do"} 
          value={newToDo} 
          onChangeText={this._createNewToDo} 
          placeholderTextColor={"#999"} 
          returnKeyType={"done"} 
          autoCorrect={false} 
          onSubmitEditing={this._addToDo} />
          <ScrollView contentContainerStyle={styles.todostyle}>
            {Object.values(toDos).map(toDo => <ToDo key={toDo.id} {...toDo} deleteTodo={this._deleteTodo}/>)}
          </ScrollView>
        </View>
      </View>
    );
  }
  _createNewToDo = text => {
    this.setState({
      newToDo: text
    })
  }
  _loadedTodos = () => {
    this.setState({
      loadedTodo: true
    })
  }
  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== ""){
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]:{
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        }
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        return { ...newState }
      })
    }
  }
  _deleteTodo = (id) => {
    this.setState(prevState => {
        const toDos = prevState.toDos
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 60,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 30,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height:-1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 20
  },
  todostyle: {
    alignItems: "center"
  }
});
