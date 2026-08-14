# Todo API — Dockerized & Deployed on AWS EC2

A REST API for managing todos, built with Node.js and MongoDB, fully 
containerized with Docker and deployed to a live AWS EC2 instance.

## Overview

This project demonstrates a complete deployment pipeline: from local 
containerization to cloud hosting, including networking and security 
configuration on AWS.

**Live demo:** Instance typically stopped to avoid AWS charges — spin up via the setup steps above, or the automated pipeline redeploys it in under a minute.

## Tech Stack

- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose
- **Cloud:** AWS EC2 (Ubuntu)
- **Version Control:** Git/GitHub

## Architecture

## Automated CI/CD Pipeline

This project also includes a fully automated deploy pipeline using GitHub Actions and Docker Hub — every push to `main` automatically builds, pushes, and redeploys the app to EC2, with zero manual steps.

git push
│
▼
GitHub Actions triggered
│
├── Build Docker image
├── Push image to Docker Hub
└── SSH into EC2
├── Pull latest image
├── Ensure MongoDB container is running
└── Restart app container, connected via a shared Docker network

**Key design decisions:**
- Docker Hub credentials and the EC2 SSH key are stored as GitHub Secrets, never committed to the repo
- A dedicated Docker network lets the app and MongoDB containers reach each other by name, mirroring Docker Compose's internal networking
- EC2 only ever pulls pre-built images from Docker Hub — it never needs the source code

**Debugging note:** the first version of the deploy script only started the app container and omitted MongoDB, causing it to crash on startup. Diagnosed via `docker logs`, which showed a database connection error — fixed by explicitly starting both containers on a shared network.

### Setting Up the Pipeline

1. Create a Docker Hub account and repository
2. Generate a Docker Hub access token
3. Add these as GitHub repository secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `EC2_HOST`, `EC2_SSH_KEY`
4. Push to `main` — `.github/workflows/deploy.yml` handles the rest

