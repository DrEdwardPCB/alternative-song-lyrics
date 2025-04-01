# Alternative Song Lyrics

A web application for discovering and comparing original songs with their alternative versions. Users can explore song pairs, view lyrics, and watch music videos side by side.

## Features

### Core Functionality
- Search and browse song pairs
- View original and alternative versions side by side
- YouTube video integration
- Responsive design for all devices

### Authentication
- Secure authentication via Supabase
- Admin-only access to management features
- Role-based access control

### Admin Features
- CRUD operations for song management
- Bulk song import/export
- Content moderation tools

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- TanStack Query for data fetching
- Material-UI components
- Tailwind CSS for styling

### Backend & Database
- Supabase for backend services
- Supabase managed PostgreSQL database
- Real-time data synchronization

### Testing
- Cypress for E2E testing
- React Testing Library for component tests
- Jest for unit testing

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/alternative-song-lyrics.git
cd alternative-song-lyrics
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Add your Supabase credentials
```

4. Start development server
```bash
pnpm dev
```

## Deployment

The application is deployed to GitHub Pages automatically when changes are pushed to the main branch. Secrets are managed via GitHub Secrets.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
