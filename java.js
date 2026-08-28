async function processWeeklyLeagues() {
  const groups = await db.query('SELECT * FROM leaderboard_groups WHERE is_closed = FALSE');

  for (const group of groups.rows) {
    // Rank players by XP in descending order
    const standings = await db.query(
      `SELECT user_id, current_tier, weekly_xp 
       FROM user_leagues 
       WHERE current_group_id = $1 
       ORDER BY weekly_xp DESC`,
      [group.id]
    );

    const total = standings.rows.length;
    const PROMOTION_CUTOFF = 5; // Top 5 promote
    const DEMOTION_CUTOFF = total - 5; // Bottom 5 demote

    for (let index = 0; index < total; index++) {
      const player = standings.rows[index];
      let newTier = player.current_tier;

      if (index < PROMOTION_CUTOFF && player.current_tier < 10) {
        newTier += 1; // Upgrade tier
      } else if (index >= DEMOTION_CUTOFF && player.current_tier > 1) {
        newTier -= 1; // Downgrade tier
      }

      // Reset weekly XP and prepare for next cycle
      await db.query(
        `UPDATE user_leagues 
         SET current_tier = $1, weekly_xp = 0, current_group_id = NULL 
         WHERE user_id = $2`,
        [newTier, player.user_id]
      );
    }

    await db.query('UPDATE leaderboard_groups SET is_closed = TRUE WHERE id = $1', [group.id]);
  }
}