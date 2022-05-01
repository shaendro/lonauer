# Lonauer Project Server

An Express server to host my portfolio and several of my projects.

## Installation

```bash
echo 'Installing Node and RedisStack'
curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash -
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update -y
sudo apt-get install -y git nodejs build-essential redis-stack-server

echo 'Installing Project Dependencies'
npm install

echo 'Installing CertBot'
apt install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo certbot certonly --standalone
```

## Execution

```bash
npm start
```
