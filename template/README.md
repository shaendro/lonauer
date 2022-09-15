## Installation

```bash
echo 'Installing Node and RedisStack';
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg;
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list;
sudo apt-get update -y;
sudo apt-get install -y git redis-stack-server;
sudo systemctl disable redis-stack-server.service;
exec bash;
nvm install node;

echo 'Installing Project Dependencies';
npm install;
npm install pm2 -g;
npm run build;

echo 'Installing CertBot';
sudo apt install snapd -y;
sudo snap install core;
sudo snap refresh core;
sudo snap install --classic certbot;
sudo certbot certonly --standalone --domains lonauer.com;
sudo cp /etc/letsencrypt/live/lonauer.com/privkey.pem ./privkey.pem
sudo cp /etc/letsencrypt/live/lonauer.com/fullchain.pem ./fullchain.pem
sudo chmod 777 ./privkey.pem ./fullchain.pem

echo 'Setting up Port Forwarding';
sudo iptables -t nat -F;
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000;
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 4000;
sudo /sbin/iptables-save;

echo 'Setting up Application';
pm2 start ecosystem.config.cjs;
pm2 save;
pm2 startup;

```

## Developing

```bash
npm run dev;
```
