import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Smile, Image as ImageIcon } from 'lucide-react-native';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFC00', '#FFB800']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.username}>Your Story</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Camera color="#000" size={24} />
            <Text style={styles.actionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <ImageIcon color="#000" size={24} />
            <Text style={styles.actionText}>Create Story</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Smile color="#000" size={24} />
            <Text style={styles.actionText}>New Lens</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.friendSection}>
          <Text style={styles.sectionTitle}>Friends</Text>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <TouchableOpacity key={index} style={styles.friendItem}>
              <Image
                source={{ uri: `https://images.unsplash.com/photo-${1500000000000 + index}?w=100&h=100&fit=crop` }}
                style={styles.friendAvatar}
              />
              <View style={styles.friendInfo}>
                <Text style={styles.friendName}>Friend {index + 1}</Text>
                <Text style={styles.friendStatus}>📸 New Snap • 2m ago</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFC00',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  friendSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginBottom: 15,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendInfo: {
    marginLeft: 15,
  },
  friendName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  friendStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
});