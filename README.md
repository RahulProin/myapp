# N8N AI Agent Project

This project sets up n8n workflow automation platform configured for creating AI agents.

## Prerequisites

- Docker
- Docker Compose
- Git

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-repo-url>
cd n8n-ai-agent
```

2. Create and configure environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your desired configuration.

3. Start the services:
```bash
docker-compose up -d
```

4. Access n8n:
- Open your browser and navigate to `http://localhost:5678`
- The default login credentials will be created on first startup

## Creating AI Agents

1. Log in to the n8n interface
2. Create a new workflow
3. Use HTTP Request nodes to interact with AI APIs
4. Configure webhook nodes for real-time interactions
5. Set up database nodes for storing conversation history

## Project Structure

```
n8n-ai-agent/
├── docker-compose.yml    # Docker services configuration
├── .env                  # Environment variables
└── README.md            # Project documentation
```

## Important Notes

- The default port for n8n is 5678
- PostgreSQL is used as the database
- All data is persisted using Docker volumes
- The system automatically restarts unless stopped manually

## Troubleshooting

If you encounter any issues:

1. Check the logs:
```bash
docker-compose logs -f
```

2. Restart the services:
```bash
docker-compose restart
```

3. Reset the environment:
```bash
docker-compose down -v
docker-compose up -d
```

## Security Considerations

- Change default passwords in production
- Use HTTPS in production
- Regularly backup your workflows and data
- Keep n8n and PostgreSQL updated

## License

MIT 