#!/bin/bash

# Mitsubishi ASX 2011 App - Start Script
# This script safely starts the app on port 3050 without affecting other services

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# App configuration
APP_NAME="Mitsubishi ASX 2011 App"
PORT=3050
PID_FILE="/tmp/asx-app-3050.pid"

echo -e "${BLUE}🚗 Starting $APP_NAME...${NC}"

# Function to check if port is in use
check_port() {
    # Try multiple methods to check if port is in use
    if command -v lsof >/dev/null 2>&1; then
        if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
            return 0
        fi
    elif command -v netstat >/dev/null 2>&1; then
        if netstat -tuln 2>/dev/null | grep -q ":$PORT "; then
            return 0
        fi
    elif command -v ss >/dev/null 2>&1; then
        if ss -tuln 2>/dev/null | grep -q ":$PORT "; then
            return 0
        fi
    else
        # Fallback: try to connect to the port
        if timeout 1 bash -c "</dev/tcp/localhost/$PORT" 2>/dev/null; then
            return 0
        fi
    fi
    return 1
}

# Function to find and stop only our specific service
stop_service() {
    echo -e "${YELLOW}🛑 Stopping existing $APP_NAME service...${NC}"
    
    # Find processes running our specific command on port 3050
    PIDS=$(ps aux | grep "python.*3050" | grep -v grep | awk '{print $2}')
    
    if [ ! -z "$PIDS" ]; then
        echo -e "${YELLOW}Found running processes: $PIDS${NC}"
        for PID in $PIDS; do
            echo -e "${YELLOW}Stopping process $PID...${NC}"
            kill -TERM $PID 2>/dev/null || true
        done
        
        # Wait a moment for graceful shutdown
        sleep 2
        
        # Force kill if still running
        for PID in $PIDS; do
            if kill -0 $PID 2>/dev/null; then
                echo -e "${YELLOW}Force stopping process $PID...${NC}"
                kill -KILL $PID 2>/dev/null || true
            fi
        done
        
        echo -e "${GREEN}✅ Service stopped successfully${NC}"
    else
        echo -e "${GREEN}✅ No existing service found${NC}"
    fi
}

# Function to check dependencies
check_dependencies() {
    echo -e "${BLUE}🔍 Checking dependencies...${NC}"
    
    # Check if Python is available
    if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
        echo -e "${RED}❌ Python is not installed. Please install Python first.${NC}"
        exit 1
    fi
    
    # Determine Python command
    if command -v python3 &> /dev/null; then
        PYTHON_CMD="python3"
    else
        PYTHON_CMD="python"
    fi
    
    echo -e "${GREEN}✅ Python found: $PYTHON_CMD${NC}"
    
    # Check if required files exist
    if [ ! -f "index.html" ]; then
        echo -e "${RED}❌ index.html not found. Please run this script from the app directory.${NC}"
        exit 1
    fi
    
    if [ ! -f "styles.css" ]; then
        echo -e "${RED}❌ styles.css not found. Please run this script from the app directory.${NC}"
        exit 1
    fi
    
    if [ ! -f "script.js" ]; then
        echo -e "${RED}❌ script.js not found. Please run this script from the app directory.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ All required files found${NC}"
}

# Function to start the service
start_service() {
    echo -e "${BLUE}🚀 Starting $APP_NAME on port $PORT...${NC}"
    
    # Start the service in background
    nohup $PYTHON_CMD -m http.server $PORT > /tmp/asx-app-3050.log 2>&1 &
    SERVER_PID=$!
    
    # Save PID for later reference
    echo $SERVER_PID > $PID_FILE
    
    # Wait a moment for the service to start
    sleep 2
    
    # Check if service started successfully
    if kill -0 $SERVER_PID 2>/dev/null; then
        echo -e "${GREEN}✅ $APP_NAME started successfully!${NC}"
        echo -e "${GREEN}📱 App URL: http://localhost:$PORT${NC}"
        echo -e "${GREEN}🆔 Process ID: $SERVER_PID${NC}"
        echo -e "${GREEN}📝 Logs: /tmp/asx-app-3050.log${NC}"
        echo -e "${GREEN}🛑 To stop: npm run stop${NC}"
        echo -e "${GREEN}🔄 To restart: npm run restart${NC}"
    else
        echo -e "${RED}❌ Failed to start $APP_NAME${NC}"
        echo -e "${RED}📝 Check logs: /tmp/asx-app-3050.log${NC}"
        exit 1
    fi
}

# Function to show status
show_status() {
    echo -e "${BLUE}📊 Service Status:${NC}"
    
    if check_port; then
        echo -e "${GREEN}✅ Service is running on port $PORT${NC}"
        
        # Show process info
        PIDS=$(ps aux | grep "python.*3050" | grep -v grep | awk '{print $2}')
        if [ ! -z "$PIDS" ]; then
            echo -e "${GREEN}🆔 Process IDs: $PIDS${NC}"
        fi
        
        echo -e "${GREEN}🌐 Access: http://localhost:$PORT${NC}"
    else
        echo -e "${RED}❌ Service is not running${NC}"
    fi
}

# Main execution
main() {
    case "${1:-start}" in
        "start")
            check_dependencies
            stop_service
            start_service
            ;;
        "stop")
            stop_service
            ;;
        "restart")
            check_dependencies
            stop_service
            start_service
            ;;
        "status")
            show_status
            ;;
        "help"|"-h"|"--help")
            echo -e "${BLUE}Usage: $0 [command]${NC}"
            echo -e "${GREEN}Commands:${NC}"
            echo -e "  start   - Start the service (default)"
            echo -e "  stop    - Stop the service"
            echo -e "  restart - Restart the service"
            echo -e "  status  - Show service status"
            echo -e "  help    - Show this help"
            ;;
        *)
            echo -e "${RED}❌ Unknown command: $1${NC}"
            echo -e "${YELLOW}Use '$0 help' for available commands${NC}"
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"