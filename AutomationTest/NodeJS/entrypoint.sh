while ! (curl -sSL "http://selenium-hub:4444/status" | grep -i $WEB_BROWSER) >/dev/null 2>&1; do
    echo -n "."; sleep 0.2
done

npm test && cd server && npm i
npm start
ls