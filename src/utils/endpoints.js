// API-Football v3 endpoint definitions
// Each entry: { id, label, endpoint, params: [{ key, label, required, placeholder }] }

export const ENDPOINT_GROUPS = [
  {
    group: 'CORE',
    endpoints: [
      {
        id: 'status',
        label: 'API Status',
        endpoint: 'status',
        params: [],
      },
      {
        id: 'seasons',
        label: 'Seasons',
        endpoint: 'leagues/seasons',
        params: [],
      },
      {
        id: 'countries',
        label: 'Countries',
        endpoint: 'countries',
        params: [
          { key: 'name', label: 'Name', required: false, placeholder: 'England' },
          { key: 'code', label: 'Code (ISO)', required: false, placeholder: 'GB' },
          { key: 'search', label: 'Search', required: false, placeholder: 'fra' },
        ],
      },
    ],
  },
  {
    group: 'LEAGUES',
    endpoints: [
      {
        id: 'leagues',
        label: 'Leagues / Cups',
        endpoint: 'leagues',
        params: [
          { key: 'id', label: 'League ID', required: false, placeholder: '39' },
          { key: 'name', label: 'Name', required: false, placeholder: 'Premier League' },
          { key: 'country', label: 'Country', required: false, placeholder: 'England' },
          { key: 'code', label: 'Country Code', required: false, placeholder: 'GB' },
          { key: 'season', label: 'Season', required: false, placeholder: '2023' },
          { key: 'type', label: 'Type', required: false, placeholder: 'league' },
          { key: 'current', label: 'Current', required: false, placeholder: 'true' },
          { key: 'search', label: 'Search (3+ chars)', required: false, placeholder: 'prem' },
        ],
      },
      {
        id: 'standings',
        label: 'Standings',
        endpoint: 'standings',
        params: [
          { key: 'season', label: 'Season', required: true, placeholder: '2023' },
          { key: 'league', label: 'League ID', required: false, placeholder: '39' },
          { key: 'team', label: 'Team ID', required: false, placeholder: '33' },
        ],
      },
    ],
  },
  {
    group: 'TEAMS',
    endpoints: [
      {
        id: 'teams',
        label: 'Teams',
        endpoint: 'teams',
        params: [
          { key: 'id', label: 'Team ID', required: false, placeholder: '33' },
          { key: 'name', label: 'Name', required: false, placeholder: 'Manchester United' },
          { key: 'league', label: 'League ID', required: false, placeholder: '39' },
          { key: 'season', label: 'Season', required: false, placeholder: '2023' },
          { key: 'country', label: 'Country', required: false, placeholder: 'England' },
          { key: 'search', label: 'Search (3+ chars)', required: false, placeholder: 'man' },
        ],
      },
      {
        id: 'teams-statistics',
        label: 'Team Statistics',
        endpoint: 'teams/statistics',
        params: [
          { key: 'team', label: 'Team ID', required: true, placeholder: '33' },
          { key: 'season', label: 'Season', required: true, placeholder: '2023' },
          { key: 'league', label: 'League ID', required: true, placeholder: '39' },
          { key: 'date', label: 'Date (YYYY-MM-DD)', required: false, placeholder: '2024-01-01' },
        ],
      },
      {
        id: 'teams-seasons',
        label: 'Team Seasons',
        endpoint: 'teams/seasons',
        params: [
          { key: 'team', label: 'Team ID', required: true, placeholder: '33' },
        ],
      },
      {
        id: 'venues',
        label: 'Venues',
        endpoint: 'venues',
        params: [
          { key: 'id', label: 'Venue ID', required: false, placeholder: '556' },
          { key: 'name', label: 'Name', required: false, placeholder: 'Old Trafford' },
          { key: 'city', label: 'City', required: false, placeholder: 'Manchester' },
          { key: 'country', label: 'Country', required: false, placeholder: 'England' },
          { key: 'search', label: 'Search (3+ chars)', required: false, placeholder: 'old' },
        ],
      },
    ],
  },
  {
    group: 'PLAYERS',
    endpoints: [
      {
        id: 'players',
        label: 'Players',
        endpoint: 'players',
        params: [
          { key: 'id', label: 'Player ID', required: false, placeholder: '276' },
          { key: 'team', label: 'Team ID', required: false, placeholder: '33' },
          { key: 'league', label: 'League ID', required: false, placeholder: '39' },
          { key: 'season', label: 'Season', required: false, placeholder: '2023' },
          { key: 'search', label: 'Search (4+ chars)', required: false, placeholder: 'messi' },
          { key: 'page', label: 'Page', required: false, placeholder: '1' },
        ],
      },
      {
        id: 'players-seasons',
        label: 'Player Seasons',
        endpoint: 'players/seasons',
        params: [
          { key: 'player', label: 'Player ID', required: false, placeholder: '276' },
        ],
      },
      {
        id: 'players-squads',
        label: 'Squads',
        endpoint: 'players/squads',
        params: [
          { key: 'team', label: 'Team ID', required: false, placeholder: '33' },
          { key: 'player', label: 'Player ID', required: false, placeholder: '276' },
        ],
      },
      {
        id: 'players-topscorers',
        label: 'Top Scorers',
        endpoint: 'players/topscorers',
        params: [
          { key: 'league', label: 'League ID', required: true, placeholder: '39' },
          { key: 'season', label: 'Season', required: true, placeholder: '2023' },
        ],
      },
      {
        id: 'players-topassists',
        label: 'Top Assists',
        endpoint: 'players/topassists',
        params: [
          { key: 'league', label: 'League ID', required: true, placeholder: '39' },
          { key: 'season', label: 'Season', required: true, placeholder: '2023' },
        ],
      },
      {
        id: 'players-topyellowcards',
        label: 'Top Yellow Cards',
        endpoint: 'players/topyellowcards',
        params: [
          { key: 'league', label: 'League ID', required: true, placeholder: '39' },
          { key: 'season', label: 'Season', required: true, placeholder: '2023' },
        ],
      },
      {
        id: 'players-topredcards',
        label: 'Top Red Cards',
        endpoint: 'players/topredcards',
        params: [
          { key: 'league', label: 'League ID', required: true, placeholder: '39' },
          { key: 'season', label: 'Season', required: true, placeholder: '2023' },
        ],
      },
      {
        id: 'transfers',
        label: 'Transfers',
        endpoint: 'transfers',
        params: [
          { key: 'player', label: 'Player ID', required: false, placeholder: '276' },
          { key: 'team', label: 'Team ID', required: false, placeholder: '33' },
        ],
      },
      {
        id: 'trophies',
        label: 'Trophies',
        endpoint: 'trophies',
        params: [
          { key: 'player', label: 'Player ID', required: false, placeholder: '276' },
          { key: 'coach', label: 'Coach ID', required: false, placeholder: '10' },
        ],
      },
      {
        id: 'sidelined',
        label: 'Sidelined / Injuries (Player)',
        endpoint: 'sidelined',
        params: [
          { key: 'player', label: 'Player ID', required: false, placeholder: '276' },
          { key: 'coach', label: 'Coach ID', required: false, placeholder: '10' },
        ],
      },
    ],
  },
  {
    group: 'FIXTURES',
    endpoints: [
      {
        id: 'fixtures',
        label: 'Fixtures',
        endpoint: 'fixtures',
        params: [
          { key: 'id', label: 'Fixture ID', required: false, placeholder: '592872' },
          { key: 'ids', label: 'Multiple IDs', required: false, placeholder: '592872-592873' },
          { key: 'live', label: 'Live (all)', required: false, placeholder: 'all' },
          { key: 'date', label: 'Date (YYYY-MM-DD)', required: false, placeholder: '2023-10-28' },
          { key: 'league', label: 'League ID', required: false, placeholder: '39' },
          { key: 'season', label: 'Season', required: false, placeholder: '2023' },
          { key: 'team', label: 'Team ID', required: false, placeholder: '33' },
          { key: 'last', label: 'Last N fixtures', required: false, placeholder: '5' },
          { key: 'next', label: 'Next N fixtures', required: false, placeholder: '5' },
          { key: 'from', label: 'From (YYYY-MM-DD)', required: false, placeholder: '2023-10-01' },
          { key: 'to', label: 'To (YYYY-MM-DD)', required: false, placeholder: '2023-10-31' },
          { key: 'round', label: 'Round', required: false, placeholder: 'Regular Season - 10' },
          { key: 'status', label: 'Status', required: false, placeholder: 'FT' },
          { key: 'timezone', label: 'Timezone', required: false, placeholder: 'Europe/Istanbul' },
        ],
      },
      {
        id: 'fixtures-rounds',
        label: 'Fixture Rounds',
        endpoint: 'fixtures/rounds',
        params: [
          { key: 'league', label: 'League ID', required: true, placeholder: '39' },
          { key: 'season', label: 'Season', required: true, placeholder: '2023' },
          { key: 'current', label: 'Current Only', required: false, placeholder: 'true' },
        ],
      },
      {
        id: 'fixtures-headtohead',
        label: 'Head-to-Head',
        endpoint: 'fixtures/headtohead',
        params: [
          { key: 'h2h', label: 'Team IDs (e.g. 33-34)', required: true, placeholder: '33-34' },
          { key: 'date', label: 'Date (YYYY-MM-DD)', required: false, placeholder: '2023-10-28' },
          { key: 'league', label: 'League ID', required: false, placeholder: '39' },
          { key: 'season', label: 'Season', required: false, placeholder: '2023' },
          { key: 'last', label: 'Last N', required: false, placeholder: '5' },
          { key: 'next', label: 'Next N', required: false, placeholder: '5' },
          { key: 'from', label: 'From (YYYY-MM-DD)', required: false, placeholder: '2023-01-01' },
          { key: 'to', label: 'To (YYYY-MM-DD)', required: false, placeholder: '2023-12-31' },
          { key: 'status', label: 'Status', required: false, placeholder: 'FT' },
        ],
      },
      {
        id: 'fixtures-statistics',
        label: 'Fixture Statistics',
        endpoint: 'fixtures/statistics',
        params: [
          { key: 'fixture', label: 'Fixture ID', required: true, placeholder: '592872' },
          { key: 'team', label: 'Team ID', required: false, placeholder: '33' },
          { key: 'type', label: 'Type', required: false, placeholder: 'Shots on Goal' },
        ],
      },
      {
        id: 'fixtures-events',
        label: 'Fixture Events',
        endpoint: 'fixtures/events',
        params: [
          { key: 'fixture', label: 'Fixture ID', required: true, placeholder: '592872' },
          { key: 'team', label: 'Team ID', required: false, placeholder: '33' },
          { key: 'player', label: 'Player ID', required: false, placeholder: '276' },
          { key: 'type', label: 'Type', required: false, placeholder: 'Goal' },
        ],
      },
      {
        id: 'fixtures-lineups',
        label: 'Fixture Lineups',
        endpoint: 'fixtures/lineups',
        params: [
          { key: 'fixture', label: 'Fixture ID', required: true, placeholder: '592872' },
          { key: 'team', label: 'Team ID', required: false, placeholder: '33' },
          { key: 'player', label: 'Player ID', required: false, placeholder: '276' },
          { key: 'type', label: 'Type', required: false, placeholder: 'XI' },
        ],
      },
      {
        id: 'fixtures-players',
        label: 'Fixture Player Stats',
        endpoint: 'fixtures/players',
        params: [
          { key: 'fixture', label: 'Fixture ID', required: true, placeholder: '592872' },
          { key: 'team', label: 'Team ID', required: false, placeholder: '33' },
        ],
      },
    ],
  },
  {
    group: 'INJURIES & ODDS',
    endpoints: [
      {
        id: 'injuries',
        label: 'Injuries',
        endpoint: 'injuries',
        params: [
          { key: 'league', label: 'League ID', required: false, placeholder: '39' },
          { key: 'season', label: 'Season', required: false, placeholder: '2023' },
          { key: 'fixture', label: 'Fixture ID', required: false, placeholder: '592872' },
          { key: 'team', label: 'Team ID', required: false, placeholder: '33' },
          { key: 'player', label: 'Player ID', required: false, placeholder: '276' },
          { key: 'date', label: 'Date (YYYY-MM-DD)', required: false, placeholder: '2023-10-28' },
          { key: 'timezone', label: 'Timezone', required: false, placeholder: 'Europe/Istanbul' },
        ],
      },
      {
        id: 'predictions',
        label: 'Predictions',
        endpoint: 'predictions',
        params: [
          { key: 'fixture', label: 'Fixture ID', required: true, placeholder: '592872' },
        ],
      },
      {
        id: 'odds',
        label: 'Odds (Pre-match)',
        endpoint: 'odds',
        params: [
          { key: 'fixture', label: 'Fixture ID', required: false, placeholder: '592872' },
          { key: 'league', label: 'League ID', required: false, placeholder: '39' },
          { key: 'season', label: 'Season', required: false, placeholder: '2023' },
          { key: 'date', label: 'Date (YYYY-MM-DD)', required: false, placeholder: '2023-10-28' },
          { key: 'bookmaker', label: 'Bookmaker ID', required: false, placeholder: '6' },
          { key: 'bet', label: 'Bet ID', required: false, placeholder: '1' },
          { key: 'page', label: 'Page', required: false, placeholder: '1' },
          { key: 'timezone', label: 'Timezone', required: false, placeholder: 'Europe/Istanbul' },
        ],
      },
      {
        id: 'odds-live',
        label: 'Odds (Live)',
        endpoint: 'odds/live',
        params: [
          { key: 'fixture', label: 'Fixture ID', required: false, placeholder: '592872' },
          { key: 'league', label: 'League ID', required: false, placeholder: '39' },
          { key: 'bet', label: 'Bet ID', required: false, placeholder: '1' },
        ],
      },
      {
        id: 'odds-bookmakers',
        label: 'Bookmakers',
        endpoint: 'odds/bookmakers',
        params: [
          { key: 'id', label: 'Bookmaker ID', required: false, placeholder: '6' },
          { key: 'search', label: 'Search (3+ chars)', required: false, placeholder: 'bet' },
        ],
      },
      {
        id: 'odds-bets',
        label: 'Bets / Markets',
        endpoint: 'odds/bets',
        params: [
          { key: 'id', label: 'Bet ID', required: false, placeholder: '1' },
          { key: 'search', label: 'Search (3+ chars)', required: false, placeholder: 'winner' },
        ],
      },
    ],
  },
  {
    group: 'COACHES',
    endpoints: [
      {
        id: 'coachs',
        label: 'Coaches',
        endpoint: 'coachs',
        params: [
          { key: 'id', label: 'Coach ID', required: false, placeholder: '10' },
          { key: 'team', label: 'Team ID', required: false, placeholder: '33' },
          { key: 'search', label: 'Search (3+ chars)', required: false, placeholder: 'ten hag' },
        ],
      },
    ],
  },
]

// Flat list for easy lookup
export const ALL_ENDPOINTS = ENDPOINT_GROUPS.flatMap(g => g.endpoints)

export function findEndpoint(id) {
  return ALL_ENDPOINTS.find(e => e.id === id)
}
