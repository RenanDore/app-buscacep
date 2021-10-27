import React, { useState, useRef, } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, keyboardType, Keyboard } from 'react-native';
import api from './src/services/api'

export default function App() {

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  async function buscar(){
    if(cep == ''){
      alert('Digite um cep valido');
      setCep('');
      return;
    }

    try{
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      Keyboard.dismiss();
      setCepUser(response.data)

    }catch(error){
      console.log('ERROR: ' + error)
    }
  }

  function limpar(){
    setCep('');
    inputRef.current.focus();
    setCepUser(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Digite o Cep Desejado</Text>
        <TextInput
          style={styles.input}
          placeholder='EX: 26545330'
          value={cep}
          onChangeText={ (texto) => setCep(texto) }
          keyboardType='numeric'
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>

        <TouchableOpacity
          onPress={ buscar }
          style={[styles.botao, {backgroundColor: '#1d75cd'}]}
        >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={ limpar }
          style={[styles.botao, {backgroundColor: '#ff0000'}]}
        >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>

      </View>

      {cepUser && 
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text numberOfLines={1} style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 25,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoText:{
    fontSize: 18,
    color: '#fff'
  },
  resultado:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 22,
  },
});
