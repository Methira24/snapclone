import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Plus } from 'lucide-react-native';

export default function StoriesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stories</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.myStory}>
          <TouchableOpacity style={styles.addStoryButton}>
            <Plus color="#000" size={32} />
            <Text style={styles.addStoryText}>Add to Story</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Friends' Stories</Text>
        
        {[1, 2, 3, 4, 5].map((_, index) => (
          <TouchableOpacity key={index} style={styles.storyItem}>
            <Image
              source={{ uri: `https://images.unsplash.com/photo-${1500000000000 + index}?w=100&h=100&fit=crop` }}
              style={styles.storyAvatar}
            />
            <View style={styles.storyInfo}>
              <Text style={styles.storyName}>Friend {index + 1}</Text>
              <Text style={styles.storyTime}>{index + 1}h ago</Text>
            </View>
            <View style={[styles.storyStatus, !index && styles.storyStatusUnwatched]} />
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Discover</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.discoverScroll}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <TouchableOpacity key={index} style={styles.discoverItem}>
              <Image
                source={{ uri: `https://images.unsplash.com/photo-${1500000000000 + index}?w=300&h=400&fit=crop` }}
                style={styles.discoverImage}
              />
              <Text style={styles.discoverTitle}>Trending Story {index + 1}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
  },
  content: {
    flex: 1,
  },
  myStory: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  addStoryButton: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 15,
  },
  addStoryText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    margin: 20,
  },
  storyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  storyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  storyInfo: {
    flex: 1,
    marginLeft: 15,
  },
  storyName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  storyTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
  storyStatus: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  storyStatusUnwatched: {
    backgroundColor: '#FFFC00',
  },
  discoverScroll: {
    padding: 20,
  },
  discoverItem: {
    marginRight: 15,
    width: 200,
  },
  discoverImage: {
    width: 200,
    height: 300,
    borderRadius: 15,
  },
  discoverTitle: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});