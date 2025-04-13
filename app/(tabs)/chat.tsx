import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Search, Plus } from 'lucide-react-native';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#000" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search color="#666" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
      </View>

      <ScrollView style={styles.chatList}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <TouchableOpacity key={index} style={styles.chatItem}>
            <Image
              source={{ uri: `https://images.unsplash.com/photo-${1500000000000 + index}?w=100&h=100&fit=crop` }}
              style={styles.avatar}
            />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>Friend {index + 1}</Text>
              <Text style={styles.lastMessage}>
                {index % 2 === 0 ? '📸 New Snap • Now' : 'Received • 2h ago'}
              </Text>
            </View>
            <View style={[styles.status, index % 2 === 0 && styles.statusNew]} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 15,
  },
  chatName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
  status: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  statusNew: {
    backgroundColor: '#FFFC00',
  },
});