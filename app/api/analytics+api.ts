import { createClient } from '@supabase/supabase-js';

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

// Mock data generator for demo purposes
function generateMockData(): AnalyticsData {
  const now = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const generateDailyData = (min: number, max: number) => 
    days.map(date => ({
      date,
      count: Math.floor(Math.random() * (max - min)) + min
    }));

  return {
    snaps: {
      total: 2347,
      daily: generateDailyData(30, 70),
      growth: 23
    },
    views: {
      total: 15280,
      daily: generateDailyData(60, 90),
      growth: 45
    },
    replies: {
      total: 892,
      daily: generateDailyData(30, 75),
      growth: 15
    }
  };
}

export async function GET(request: Request) {
  try {
    // In a real app, we would use Supabase client to fetch data
    const supabase = createClient(
      process.env.EXPO_PUBLIC_SUPABASE_URL!,
      process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
    );

    // For now, using mock data
    const analyticsData = generateMockData();
    
    return new Response(JSON.stringify(analyticsData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Analytics API Error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch analytics data',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}