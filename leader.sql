-- Track user progression and tier status
CREATE TABLE user_leagues (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    current_tier INT DEFAULT 1, -- 1: Bronze, 2: Silver ... 10: Diamond
    weekly_xp INT DEFAULT 0,
    current_group_id UUID,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Store weekly leaderboard groups of ~30 players
CREATE TABLE leaderboard_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tier INT NOT NULL,
    week_start_date DATE NOT NULL,
    is_closed BOOLEAN DEFAULT FALSE
);