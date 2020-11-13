#!/bin/bash
daml sandbox -w --ledgerid covid19-plasma-donation-app-sandbox &
sleep 5
daml json-api --ledger-host localhost --ledger-port 6865 --http-port 7575 --application-id covid19-plasma-donation-app-sandbox
