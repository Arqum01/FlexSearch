import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import Data from './src/Components/Data';
import FlexSearch from 'flexsearch';

export default function App() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const index = new FlexSearch.Index({
      tokenize: 'full',
      threshold: 3,
    });

    Data.forEach((item, i) => {
      index.add(i, `${item.Name} ${item.language}`); 
    });

    const result = index.search(query);
    setSearchResults(result);
  }, [query]);

  const handleSearch = (text) => {
    setQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search..."
        clearButtonMode="always"
        style={styles.search}
        value={query}
        onChangeText={handleSearch}
      />
      <View style={styles.dataContainer}>
        {query === '' ? (
          Data.map((item, index) => (
            <View key={index} style={styles.smallContainer}>
              <Text style={styles.TextHeadData}>{item.Name}</Text>
              <Text style={styles.TextData}>{item.language}</Text>
            </View>
          ))
        ) : (
          searchResults.map((index) => (
            <View key={index} style={styles.smallContainer}>
              <Text style={styles.TextHeadData}>{Data[index].Name}</Text>
              <Text style={styles.TextData}>{Data[index].language}</Text>
            </View>
          ))
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30,
  },
  search: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  dataContainer: {
    paddingVertical: 10,
  },
  smallContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  TextHeadData: {
    fontSize: 24,
  },
  TextData: {
    fontSize: 18,
  },
});
