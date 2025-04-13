import { View, Text, StyleSheet, Image } from 'react-native';
import { Search, Settings } from 'lucide-react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Search color="#000" size={24} />
        <Text style={styles.title}>Snap Map</Text>
        <Settings color="#000" size={24} />
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map View</Text>
        <Text style={styles.mapSubtext}>(Web version doesn't support maps)</Text>
      </View>

      <View style={styles.friendsContainer}>
        <Text style={styles.friendsTitle}>Friends Nearby</Text>
        {[1, 2, 3].map((_, index) => (
          <View key={index} style={styles.friendItem}>
            <Image
              source={{ uri: `https://images.unsplash.com/photo-${1500000000000 + index}?w=100&h=100&fit=crop` }}
              style={styles.friendAvatar}
            />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>Friend {index + 1}</Text>
              <Text style={styles.friendLocation}>2.{index} miles away</Text>
            </View>
            <Text style={styles.friendTime}>{index + 1}h ago</Text>
          </View>
        ))}
      </View>
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
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#666',
  },
  mapSubtext: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#999',
    marginTop: 10,
  },
  friendsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  friendsTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 15,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  friendInfo: {
    flex: 1,
    marginLeft: 15,
  },
  friendName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  friendLocation: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter_400Regular',
  },
  friendTime: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Inter_400Regular',
  },
});