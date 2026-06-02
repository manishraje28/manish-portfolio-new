export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = "manishraje28";
  const LEETCODE_USERNAME = "manishraje28";

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: "GITHUB_TOKEN is missing" });
  }

  try {
    const [ghData, lcData] = await Promise.all([
      fetchGitHubData(GITHUB_TOKEN, GITHUB_USERNAME),
      fetchLeetCodeData(LEETCODE_USERNAME)
    ]);

    const activityMap = new Map();
    let totalContributions = 0;
    
    // Process GitHub data
    const weeks = ghData.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
    weeks.forEach(week => {
      week.contributionDays.forEach(day => {
        activityMap.set(day.date, {
          date: day.date,
          gh: day.contributionCount,
          lc: 0,
          total: day.contributionCount
        });
        totalContributions += day.contributionCount;
      });
    });

    // Process LeetCode data
    const submissionCalendarStr = lcData.data?.matchedUser?.userCalendar?.submissionCalendar;
    if (submissionCalendarStr) {
      const submissionCalendar = JSON.parse(submissionCalendarStr);
      // submissionCalendar keys are Unix timestamps in seconds
      for (const [timestampStr, count] of Object.entries(submissionCalendar)) {
        const timestamp = parseInt(timestampStr, 10);
        // Convert to YYYY-MM-DD local to UTC string
        const dateObj = new Date(timestamp * 1000);
        // Get the date strictly as YYYY-MM-DD
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        
        if (activityMap.has(dateStr)) {
          const existing = activityMap.get(dateStr);
          existing.lc += count;
          existing.total += count;
          totalContributions += count;
        } else {
          // If it's outside the GitHub calendar range, we can optionally add it
          // but usually we just want to match the 1-year calendar window.
          // Let's add it anyway.
          activityMap.set(dateStr, {
            date: dateStr,
            gh: 0,
            lc: count,
            total: count
          });
          totalContributions += count;
        }
      }
    }

    // Sort the map by date and calculate streaks
    const sortedDates = Array.from(activityMap.keys()).sort();
    const resultList = sortedDates.map(date => activityMap.get(date));

    // Calculate streaks
    let currentStreak = 0;
    let maxStreak = 0;
    let activeDaysThisYear = 0;

    const todayStr = new Date().toISOString().split('T')[0];
    const currentYearStr = new Date().getFullYear().toString();

    // Calculate current streak by walking backward from today
    // Or walking forward. Walking forward:
    for (const item of resultList) {
      if (item.date.startsWith(currentYearStr) && item.total > 0) {
        activeDaysThisYear++;
      }
    }

    // Reverse iterate to find current streak up to today or yesterday
    const pastDates = resultList.filter(item => item.date <= todayStr).reverse();
    let streakStarted = false;
    for (let i = 0; i < pastDates.length; i++) {
      if (pastDates[i].total > 0) {
        currentStreak++;
        streakStarted = true;
      } else if (streakStarted && i !== 0) {
        // If it's a zero and we already started, streak is broken. 
        // i !== 0 allows the streak to continue if today is 0 but yesterday was active.
        break;
      }
    }

    return res.status(200).json({
      contributions: resultList,
      stats: {
        totalContributions,
        currentStreak,
        activeDaysThisYear
      }
    });

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function fetchGitHubData(token, username) {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "User-Agent": "Portfolio-Activity-Graph",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });
  return response.json();
}

async function fetchLeetCodeData(username) {
  const query = `
    query getUserProfileCalendar($username: String!) {
      matchedUser(username: $username) {
        userCalendar {
          activeYears
          streak
          totalActiveDays
          submissionCalendar
        }
      }
    }
  `;

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "User-Agent": "Portfolio-Activity-Graph",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });
  return response.json();
}
