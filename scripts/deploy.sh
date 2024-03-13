#!/bin/bash
# Go to root dir
cd $(dirname $0)/..

# Variables
export PROJECT_ID=genai-for-marketing-416910
export CLOUDRUN_SERVICE_NAME=frontend
export CLOUDRUN_SERVICE_IMAGE_NAME=gcr.io/$PROJECT_ID/$CLOUDRUN_SERVICE_NAME

# Setup
gcloud config set project $PROJECT_ID
gcloud auth application-default set-quota-project $PROJECT_ID

# Build image
gcloud builds submit --tag $CLOUDRUN_SERVICE_IMAGE_NAME .

# Deploy image
gcloud run deploy $CLOUDRUN_SERVICE_NAME \
    --image $CLOUDRUN_SERVICE_IMAGE_NAME \
    --region us-central1 \
    --port 3000 --allow-unauthenticated