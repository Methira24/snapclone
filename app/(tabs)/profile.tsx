import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  useSharedValue,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import { Settings, MapPin, Camera, Bell, Lock, CircleHelp as HelpCircle, LogOut, ChevronRight, TrendingUp } from 'lucide-react-native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const screenWidth = Dimensions.get('window').width;

interface AnalyticsData {
  snaps: {
    total: number;
    daily: Array<{ date: string; count: number }>;
    growth: number;
  };
  views: {
    total: number;
    daily: Array<{ date: string; count: number }>;
    growth: number;
  };
  replies: {
    total: number;
    daily: Array<{ date: string; count: number }>;
    growth: number;
  };
}

interface EngagementGraphProps {
  data: Array<{ date: string; count: number }>;
  color: string;
  delay: number;
  isLoading?: boolean;
}

const EngagementGraph = ({ 
  data, 
  color, 
  delay,
  isLoading = false
}: EngagementGraphProps) => {
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (!isLoading) {
      height.value = withDelay(delay, withSpring(1));
      opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    }
  }, [delay, isLoading]);

  const maxValue = Math.max(...data.map(d => d.count));

  return (
    <View style={styles.graphContainer}>
      <View style={styles.graphBars}>
        {data.map((value, index) => {
          const percentage = (value.count / maxValue) * 100;
          const animatedStyle = useAnimatedStyle(() => ({
            height: `${percentage * height.value}%`,
            opacity: opacity.value,
          }));

          return (
            <Animated.View
              key={index}
              style={[
                styles.bar,
                { backgroundColor: color },
                animatedStyle,
                isLoading && styles.barLoading
              ]}
            />
          );
        })}
      </View>
      <View style={styles.graphLabels}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <Text 
            key={index} 
            style={[
              styles.graphLabel,
              isLoading && styles.textLoading
            ]}
          >
            {day}
          </Text>
        ))}
      </View>
    </View>
  );
};

const MenuItem = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  delay 
}: { 
  icon: any, 
  title: string, 
  subtitle?: string,
  delay: number 
}) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }]
  }));

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    translateX.value = withDelay(delay, withSpring(0));
  }, [delay]);

  return (
    <AnimatedTouchable style={[styles.menuItem, animatedStyle]}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Icon size={24} color="#000" />
        </View>
        <View>
          <Text style={styles.menuItemTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      <ChevronRight size={20} color="#999" />
    </AnimatedTouchable>
  );
};

const LoadingPlaceholder = () => (
  <View style={styles.loadingPlaceholder} />
);

export default function ProfileScreen() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const headerScale = useSharedValue(0.8);
  const headerOpacity = useSharedValue(0);
  const avatarScale = useSharedValue(1);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      // Update the fetch URL to use the correct path for API routes in Expo Router
      const response = await fetch('/api/analytics+api');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to fetch analytics data');
      }
      
      const data = await response.json();
      setAnalyticsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    headerScale.value = withSequence(
      withTiming(1.1, { duration: 300 }),
      withTiming(1, { duration: 200 })
    );
    headerOpacity.value = withTiming(1, { duration: 500 });

    fetchAnalytics();
  }, []);
  
  const onAvatarPress = () => {
    avatarScale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  };

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
    opacity: headerOpacity.value
  }));

  const avatarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarScale.value }]
  }));

  const placeholderData = Array(7).fill({ date: '', count: 0 });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View style={[styles.header, headerStyle]}>
        <AnimatedTouchable onPress={onAvatarPress} style={avatarStyle}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop' }}
            style={styles.avatar}
          />
        </AnimatedTouchable>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.username}>@johndoe</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>324</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, loading && styles.textLoading]}>
              {loading ? '---' : analyticsData?.snaps.total.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Snaps</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, loading && styles.textLoading]}>
              {loading ? '---' : analyticsData?.views.total.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>
        </View>
      </Animated.View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchAnalytics}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.engagementSection}>
          <View style={styles.engagementHeader}>
            <TrendingUp size={24} color="#000" />
            <Text style={styles.engagementTitle}>Weekly Engagement</Text>
          </View>
          
          <View style={styles.graphWrapper}>
            <View style={styles.graphHeader}>
              <Text style={styles.graphTitle}>Snaps Sent</Text>
              <Text style={[styles.graphValue, loading && styles.textLoading]}>
                {loading ? '---' : `+${analyticsData?.snaps.growth}%`}
              </Text>
            </View>
            <EngagementGraph 
              data={loading ? placeholderData : (analyticsData?.snaps.daily || [])}
              color="#FFFC00" 
              delay={200}
              isLoading={loading}
            />
          </View>

          <View style={styles.graphWrapper}>
            <View style={styles.graphHeader}>
              <Text style={styles.graphTitle}>Story Views</Text>
              <Text style={[styles.graphValue, loading && styles.textLoading]}>
                {loading ? '---' : `+${analyticsData?.views.growth}%`}
              </Text>
            </View>
            <EngagementGraph 
              data={loading ? placeholderData : (analyticsData?.views.daily || [])}
              color="#00C3FF" 
              delay={400}
              isLoading={loading}
            />
          </View>

          <View style={styles.graphWrapper}>
            <View style={styles.graphHeader}>
              <Text style={styles.graphTitle}>Chat Replies</Text>
              <Text style={[styles.graphValue, loading && styles.textLoading]}>
                {loading ? '---' : `+${analyticsData?.replies.growth}%`}
              </Text>
            </View>
            <EngagementGraph 
              data={loading ? placeholderData : (analyticsData?.replies.daily || [])}
              color="#FF4081" 
              delay={600}
              isLoading={loading}
            />
          </View>
        </View>
      )}

      <View style={styles.menuSection}>
        <MenuItem 
          icon={Settings} 
          title="Settings" 
          subtitle="Privacy, Security, Language"
          delay={100}
        />
        <MenuItem 
          icon={MapPin} 
          title="Location Services" 
          subtitle="Ghost Mode, Find Friends"
          delay={200}
        />
        <MenuItem 
          icon={Camera} 
          title="Snapchat+" 
          subtitle="Get exclusive features"
          delay={300}
        />
        <MenuItem 
          icon={Bell} 
          title="Notifications" 
          subtitle="Customize your alerts"
          delay={400}
        />
        <MenuItem 
          icon={Lock} 
          title="Privacy" 
          subtitle="Control your experience"
          delay={500}
        />
        <MenuItem 
          icon={HelpCircle} 
          title="Support" 
          subtitle="Help Center, Contact Us"
          delay={600}
        />
        <MenuItem 
          icon={LogOut} 
          title="Log Out" 
          delay={700}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 40,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#666',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 20,
    backgroundColor: '#fff4f4',
    borderRadius: 15,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#ff4444',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#FFFC00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#000',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#FFFC00',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter_400Regular',
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter_400Regular',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  menuSection: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  engagementSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 20,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  engagementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  engagementTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginLeft: 10,
  },
  graphWrapper: {
    marginBottom: 25,
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  graphTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  graphValue: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#4CAF50',
  },
  graphContainer: {
    height: 150,
  },
  graphBars: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 5,
  },
  bar: {
    width: (screenWidth - 80) / 7 - 8,
    borderRadius: 6,
  },
  barLoading: {
    opacity: 0.3,
  },
  graphLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  graphLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter_400Regular',
  },
  textLoading: {
    opacity: 0.3,
  },
  loadingPlaceholder: {
    height: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
});